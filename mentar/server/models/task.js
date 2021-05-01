import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("Task", taskSchema);
