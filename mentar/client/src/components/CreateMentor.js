import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CreateMentor({ modal, toggle, save, singleMentor, isUpdate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isUpdate) {
      setName(singleMentor?.name);
      setEmail(singleMentor?.email);
    }
  }, [isUpdate]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else {
      setEmail(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let taskObj = { name, email };
    save(taskObj);
  };
  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        {modal}
        <ModalHeader toggle={toggle}>Create Mentor</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label>email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={handleChange}
              name="email"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            {isUpdate ? "Update" : "Create"}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateMentor;
