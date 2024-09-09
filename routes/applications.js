import express from 'express';
import Application from '../models/Application.js'; // Import the Application model
import authMiddleware from '../middleware/auth.js'; // Protect routes with auth middleware

const router = express.Router();

/**
 * @route   POST /api/applications
 * @desc    Create a new application
 * @access  Private (Protected by JWT)
 */
router.post('/', authMiddleware, async (req, res) => {
  const { name, income, expenses, assets, liabilities } = req.body;

  try {
    // Create a new application linked to the logged-in user
    const application = new Application({
      user: req.userId,
      name,
      income,
      expenses,
      assets,
      liabilities
    });
    console.log(req.body);

    await application.save(); // Save to database
    res.status(201).json(application); // Return the newly created application
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   GET /api/applications
 * @desc    Get all applications for the logged-in user
 * @access  Private (Protected by JWT)
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Find all applications for the current user
    console.log("User ", req.userId);
    const applications = await Application.find({ user: req.userId });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   GET /api/applications/:id
 * @desc    Get a single application by ID for the logged-in user
 * @access  Private (Protected by JWT)
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    // Find the application by ID and ensure it belongs to the logged-in user
    const application = await Application.findOne({ _id: req.params.id, user: req.userId });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid application ID' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});


/**
 * @route   PUT /api/applications/:id
 * @desc    Update an existing application
 * @access  Private (Protected by JWT)
 */
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // Update the application if it belongs to the logged-in user
    const updatedApplication = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(updatedApplication); // Return the updated application
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   DELETE /api/applications/:id
 * @desc    Delete an existing application
 * @access  Private (Protected by JWT)
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Delete the application if it belongs to the logged-in user
    const application = await Application.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!application) return res.status(404).json({ error: 'Application not found' });

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
