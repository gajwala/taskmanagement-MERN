import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/user";
import FullPageLoader from "./FullPageLoader";
export default function LoginForm(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const loading = useSelector((state) => state.user.loading);
  useEffect(() => {
    if (userId) {
      props.history.push("/dashboard");
    }
  }, [userId, props.history]);

  // eslint-disable-next-line
  const handleValidSubmit = (event, values) => {
    const payload = values;
    dispatch(getUsers(payload));
  };

  const handleInvalidSubmit = (event, errors, values) => {
    console.log(`Login failed`);
  };
  if (loading) {
    return <FullPageLoader loading={loading} />;
  }
  return (
    <AvForm
      onValidSubmit={handleValidSubmit}
      onInvalidSubmit={handleInvalidSubmit}
    >
      <AvField
        name="email"
        label="Email"
        type="text"
        validate={{
          required: true,
          email: true,
        }}
      />
      <AvField
        name="password"
        label="Password"
        type="password"
        validate={{
          required: {
            value: true,
            errorMessage: "Please enter your password",
          },
          pattern: {
            value: "^[A-Za-z0-9]+$",
            errorMessage:
              "Your password must be composed only with letter and numbers",
          },
          minLength: {
            value: 4,
            errorMessage: "Your password must be between 4 and 16 characters",
          },
          maxLength: {
            value: 16,
            errorMessage: "Your password must be between 6 and 16 characters",
          },
        }}
      />
      <Button id="submit">Submit</Button>
    </AvForm>
  );
}
