import mentorSchema from "../models/mentor.js";
import taskSchema from "../models/task.js";
export const createMentor = async (req, res) => {
  try {
    const mentor = req.body;
    await mentorSchema.create(mentor);
    const mentars = await mentorSchema.find();
    res.json(mentars);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getMentor = async (req, res) => {
  try {
    const mentars = await mentorSchema.find();
    res.json(mentars);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const updateMentor = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    const updateMentor = {
      name,
      email,
    };
    await mentorSchema.findByIdAndUpdate(id, updateMentor, {
      new: true,
    });
    const mentars = await mentorSchema.find();
    res.json(mentars);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const deleteMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await mentorSchema.findById(id);
    const { task } = singleUser;
    for (let i = 0; i < task.length; i++) {
      await taskSchema.findByIdAndRemove(task[i]);
    }
    await mentorSchema.findByIdAndRemove(id);
    const mentars = await mentorSchema.find();
    res.json(mentars);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getMentorWithTask = async (req, res) => {
  try {
    const { id } = req.params;
    const mentarWithTask = await mentorSchema.findById(id).populate("task");
    res.json(mentarWithTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
