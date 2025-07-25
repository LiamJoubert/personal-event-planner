import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

/**
 * Login Form Component
 * User Login form. Includes formik for validation
 * Validates required fields (username and password)
 * On submit, calls the login function from userContext.
 * Redirects the user to Events once logged in.
 */

export default function LoginForm() {
  const { login } = useContext(UserContext);
  const initialValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    const success = login({
      username: values.username,
      password: values.password,
    });
    if (success) {
      resetForm();
      navigate("/events");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form style={{ width: "100%", maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Login</h3>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" className="form-control" />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
