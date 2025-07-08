import NavBar from "../../routes/NavBar";
import { useEffect, useState } from "react";
import EventForm from "./EventForm";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const { user, deleteEvent } = useContext(UserContext);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const sortByDate = (eventsArray) =>
    [...eventsArray].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleDelete = (eventId) => {
    deleteEvent(eventId);
    setEvents(events.filter((e) => e.id !== eventId));
  };

  const handleFinishEdit = () => {
    setEditingEvent(null);
    setShowForm(false);
    const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (updatedUser?.events) {
      setEvents(sortByDate(updatedUser.events));
    }
  };

  // Load events from localStorage on mount
  useEffect(() => {
    if (user?.events) {
      const sorted = [...user.events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sorted);
    }
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents(sortByDate([...events, newEvent]));
  };

  return (
    <>
      <NavBar />

      <div className="container mt-4">
        {user && (
          <p className="lead">
            Welcome back, <strong>{user.name}</strong>!
          </p>
        )}

        <h2 className="mb-4">Your Events</h2>

        <div className="mb-4">
          <Button
            variant={showForm ? "outline-secondary" : "primary"}
            onClick={() => setShowForm(!showForm)}
            className="mb-3"
          >
            {showForm
              ? "Hide Form"
              : editingEvent
              ? "Edit Event"
              : "Add New Event"}
          </Button>

          {showForm && (
            <EventForm
              onAddEvent={handleAddEvent}
              editingEvent={editingEvent}
              onFinishEdit={handleFinishEdit}
            />
          )}
        </div>

        {events.length === 0 ? (
          <p className="text-muted">No events yet. Add one above!</p>
        ) : (
          events.map((event) => {
            const isPastEvent = new Date(event.date) < new Date();

            return (
              <Card key={event.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {event.date} {event.time && `at ${event.time}`}
                  </Card.Subtitle>

                  {event.location && (
                    <Card.Text>
                      <strong>Location:</strong> {event.location}
                    </Card.Text>
                  )}

                  {event.description && (
                    <Card.Text>{event.description}</Card.Text>
                  )}

                  {isPastEvent && (
                    <Card.Text className="text-danger">
                      ⚠️ This event is in the past. You can edit or delete it.
                    </Card.Text>
                  )}

                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        setEditingEvent(event);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}
