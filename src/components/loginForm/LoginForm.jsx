import React from "react";
import { Form, Button } from "react-bootstrap";

export default function LoginForm() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Form style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </div>
      </Form>
    </div>
  );
}
