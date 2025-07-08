import NavBar from "../../routes/NavBar";
import { useEffect, useState } from "react";
import EventForm from "./EventForm";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Events() {
  const [events, setEvents] = useState([]);
  const { user, deleteEvent } = useContext(UserContext);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDelete = (eventId) => {
    deleteEvent(eventId);
    setEvents(events.filter((e) => e.id !== eventId));
  };

  const handleFinishEdit = () => {
    setEditingEvent(null);
    const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (updatedUser?.events) {
      const sorted = [...updatedUser.events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sorted);
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
    const updated = [...events, newEvent].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setEvents(updated);
  };

  return (
    <>
      <NavBar />

      <div className="container mt-4">
        <h2 className="mb-4">Your Events</h2>

        <EventForm
          onAddEvent={handleAddEvent}
          editingEvent={editingEvent}
          onFinishEdit={handleFinishEdit}
        />

        {events.length === 0 ? (
          <p className="text-muted">No events yet. Add one above!</p>
        ) : (
          events.map((event) => (
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

                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setEditingEvent(event)}
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
          ))
        )}
      </div>
    </>
  );
}
