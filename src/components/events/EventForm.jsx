import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

/**
 * EventForm Component
 * Form for adding or editing events.
 * Uses formik for validation.
 * Used for adding new events as well as editing already created events.
 * Validates required fields (name and date)
 * Saves and updates data in userContext.
 */

export default function EventForm({ onAddEvent, editingEvent, onFinishEdit }) {
  const isEditing = Boolean(editingEvent);
  const { addEvent, updateEvent } = useContext(UserContext);

  //set initial form values
  const initialValues = isEditing
    ? editingEvent
    : {
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
      };

  //Basic validation for required fields
  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Event name is required";
    if (!values.date) errors.date = "Date is required";
    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitting values:", values);
    if (isEditing) {
      updateEvent(values);
      onFinishEdit();
    } else {
      const newEvent = { ...values, id: Date.now().toString() };
      addEvent(newEvent);
      if (onAddEvent) onAddEvent(newEvent);
    }
    resetForm();
  };

  return (
    <div className="mb-4">
      <h4 className="mb-3">{isEditing ? "Edit Event" : "Add New Event"}</h4>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form>
          <Field type="hidden" name="id" />

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
            {isEditing ? "Update Event" : "Add Event"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
