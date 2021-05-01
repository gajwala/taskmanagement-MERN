import React, { useState } from "react";
import EditTask from "./EditTask";
import { colors } from "../constants/color";
const Card = ({ taskObj, index, deleteTask, updateListArray, taskId }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(false);
  };

  const updateTask = (obj) => {
    updateListArray(obj, taskId);
    setModal(false);
  };

  const handleDelete = () => {
    deleteTask(taskId);
  };

  return (
    <div className="card-wrapper">
      <div
        className="card-top"
        style={{ backgroundColor: colors[index % 5].primaryColor }}
      ></div>
      <div className="task-holder">
        <span
          className="card-header"
          style={{
            backgroundColor: colors[index % 5].secondaryColor,
            borderRadius: "10px",
          }}
        >
          {taskObj.name}
        </span>
        <p className="mt-3">{taskObj.description}</p>

        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <i
            className="far fa-edit mr-3"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={() => setModal(true)}
          ></i>
          <i
            className="fas fa-trash-alt"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
