import taskSchema from "../models/task.js";
import mentorSchema from "../models/mentor.js";
export const createTask = async (req, res) => {
  try {
    const { name, description, mentorId } = req.body;
    const task = {
      name,
      description,
    };

    const newTask = await taskSchema.create(task);
    await mentorSchema.findByIdAndUpdate(
      mentorId,
      { $push: { task: newTask._id } },
      { new: true, useFindAndModify: false }
    );
    const mentarWithTask = await mentorSchema
      .findById(mentorId)
      .populate("task");
    res.json(mentarWithTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, mentorId } = req.body;
    const updateTask = {
      name,
      description,
      _id: id,
    };
    await taskSchema.findByIdAndUpdate(id, updateTask, {
      new: true,
    });
    const mentarWithTask = await mentorSchema
      .findById(mentorId)
      .populate("task");
    res.json(mentarWithTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { mentorId } = req.body;
    await taskSchema.findByIdAndRemove(id);
    await mentorSchema.findByIdAndUpdate(mentorId, {
      $pull: { task: id },
    });
    const mentarWithTask = await mentorSchema
      .findById(mentorId)
      .populate("task");
    console.log(mentarWithTask);
    res.json(mentarWithTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
