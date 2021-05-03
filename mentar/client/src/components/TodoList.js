import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "./FullPageLoader";
import {
  createTask,
  updateTask,
  getTask,
  deleteSingleTask,
} from "../redux/actions/task";
import { useHistory } from "react-router-dom";
const TodoList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let taskList = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const [modal, setModal] = useState(false);
  const mentorId = props.match.params.id;

  const getTasks = async () => {
    dispatch(getTask(mentorId));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (index) => {
    dispatch(deleteSingleTask({ mentorId }, index));

    setModal(false);
  };

  const updateListArray = async (obj, index) => {
    obj["mentorId"] = mentorId;
    dispatch(updateTask(obj, index));
    setModal(false);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = async (taskObj) => {
    taskObj["mentorId"] = mentorId;
    dispatch(createTask(taskObj));
    setModal(false);
  };

  return (
    <>
      <FullPageLoader loading={loading} />
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button> <br></br>
        <button className="btn btn-primary mt-2" onClick={() => history.push('/')}>
          Go Back
        </button>
      </div>
      <div className="task-container">
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              taskObj={obj}
              index={index}
              key={obj._id}
              taskId={obj._id}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
