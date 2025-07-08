import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

/**
 * Register Form Component
 *
 * User registration form.
 * Uses Formik for validation
 * Checks for valid email format
 * On submit, calls the register function from UserContext
 * Resets after successful registration.
 */

export default function RegisterForm() {
  const { register } = useContext(UserContext);

  const initialValues = {
    name: "",
    email: "",
    username: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.username) errors.username = "Username is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    register(values);
    resetForm();
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form style={{ width: "100%", maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Register</h3>

          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              className="form-control"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" className="form-control" />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              className="form-control"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="d-grid">
            <Button type="submit" variant="success">
              Register
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
