import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  personalDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  income: Number,
  expenses: Number,
  assets: Number,
  liabilities: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
