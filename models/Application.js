import mongoose from 'mongoose';
const { Schema } = mongoose;

// Application schema definition
const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  income: Number,
  expenses: Number,
  assets: Number,
  liabilities: Number,
});

export default mongoose.model('Application', ApplicationSchema);
