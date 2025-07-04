import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

export default function EventForm({ onAddEvent }) {
  const { addEvent } = useContext(UserContext);

  const initialValues = {
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Event name is required";
    if (!values.date) errors.date = "Date is required";
    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    const newEvent = {
      ...values,
      id: Date.now().toString(),
    };

    addEvent(newEvent); // Save to user context
    if (onAddEvent) onAddEvent(newEvent); // Notify parent
    resetForm();
  };

  return (
    <div className="mb-4">
      <h4 className="mb-3">Add New Event</h4>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="name">Event Name</label>
            <Field id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="date">Date</label>
            <Field id="date" name="date" type="date" className="form-control" />
            <ErrorMessage name="date" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="time">Time</label>
            <Field id="time" name="time" type="time" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="location">Location</label>
            <Field id="location" name="location" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <Field
              id="description"
              name="description"
              as="textarea"
              className="form-control"
              rows="3"
            />
          </div>

          <Button type="submit" variant="primary">
            Add Event
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
