import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export default mongoose.model("Mentor", mentorSchema);
