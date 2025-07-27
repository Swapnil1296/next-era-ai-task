import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['Pending', 'In Progress', 'Done'], default: 'Pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Task', TaskSchema);