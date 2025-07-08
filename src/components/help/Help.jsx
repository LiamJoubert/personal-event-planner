import NavBar from "../../routes/NavBar";
import { Card } from "react-bootstrap";

/**
 * Help Component
 *
 * Provides assistance to the user for using the event planner
 * Explains how to register, log in, and navigate the site
 * as well as how to add, edit and delete events.
 * Also includes tips for organizing events effectively.
 */

export default function Help() {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h2 className="mb-4">Help</h2>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Registering & Logging In</Card.Title>
            <Card.Text>
              To get started, register with your name, email, username, and
              password. Once registered, log in to access your personal
              dashboard. You cannot access events until logged in.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Adding New Events</Card.Title>
            <Card.Text>
              Click the <strong>"Add New Event"</strong> button to open the
              event form. Fill in the event name, date, time, location, and
              description. Click <strong>"Add Event"</strong> to save it.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Editing Events</Card.Title>
            <Card.Text>
              Click the <strong>"Edit"</strong> button on any event card. The
              form will open with the event details pre-filled. Make your
              changes and click <strong>"Update Event"</strong>.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Deleting Events</Card.Title>
            <Card.Text>
              Click the <strong>"Delete"</strong> button on an event card to
              remove it permanently. This action cannot be undone.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Navigating the App</Card.Title>
            <Card.Text>
              Use the navigation bar at the top to access your Dashboard,
              Events, and Help page.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Tips for Organizing Events</Card.Title>
            <Card.Text>
              - Use clear and descriptive names for events
              <br />
              - Add times and locations to avoid confusion
              <br />- Keep your list updated by editing or deleting past events
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
