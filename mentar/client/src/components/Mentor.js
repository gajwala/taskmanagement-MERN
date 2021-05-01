import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMentors,
  createMentor,
  updateMentorData,
  deleteSingleMentor,
} from "../redux/actions/mentors";
import { logout } from "../redux/actions/user";
import mentorImage from "../assets/mentor.jpg";
import CreateMentor from "./CreateMentor";
import FullPageLoader from "./FullPageLoader";
import { colors } from "../constants/color";
const Mentor = () => {
  const [modal, setModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [singleMentor, setSingleMentor] = useState();
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.mentors.mentors);
  const email = useSelector((state) => state.user.user.email);
  const loading = useSelector((state) => state.mentors.loading);
  const getMentor = async () => {
    dispatch(getMentors());
  };
  useEffect(() => {
    getMentor(); // eslint-disable-next-line
  }, []);
  const saveMentor = async (taskObj) => {
    if (!isUpdate) {
      dispatch(createMentor(taskObj));
    } else {
      dispatch(updateMentorData(taskObj, singleMentor._id));
    }

    setModal(false);
  };
  const toggle = () => {
    setModal(!modal);
    setSingleMentor(null);
    setIsUpdate(false);
  };
  const logoutUser = () => {
    dispatch(logout());
  };
  const handleDelete = (id) => {
    dispatch(deleteSingleMentor(id));
  };
  const updateMentor = (data) => {
    setSingleMentor(data);
    setIsUpdate(true);
    setModal(true);
  };
  const createMentorBypopup = () => {
    setSingleMentor(null);
    setIsUpdate(false);
    setModal(true);
  };

  return (
    <>
      <FullPageLoader loading={loading} />
      <div className="main-div">
        <img className="dashboard-image" src={mentorImage} alt="mentor" />

        <div className="header text-center">
          <h2 className="welcome">Welcome to {email}</h2>
          <div>
            <button
              className="btn btn-primary mt-2"
              onClick={() => createMentorBypopup()}
            >
              Create Mentor
            </button>
          </div>

          <div className="logout-button">
            <button className="btn btn-primary mt-2" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="table_div">
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Mentor Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mentors &&
              mentors.map((data, index) => (
                <tr key={data._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <div style={{}}>
                      <i
                        className="far fa-edit mr-3"
                        style={{
                          color: colors[index % 5].primaryColor,
                          cursor: "pointer",
                        }}
                        onClick={() => updateMentor(data)}
                      ></i>
                      <i
                        className="fas fa-trash-alt"
                        style={{
                          color: colors[index % 5].primaryColor,
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(data._id)}
                      ></i>

                      <Link to={`/task/${data._id}`} className="gotoTask">
                        <i
                          class="fas fa-plus-circle mr-3"
                          style={{
                            color: colors[index % 5].primaryColor,
                            cursor: "pointer",
                          }}
                        ></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <CreateMentor
        toggle={toggle}
        singleMentor={singleMentor}
        modal={modal}
        isUpdate={isUpdate}
        save={saveMentor}
      />
    </>
  );
};

export default Mentor;
