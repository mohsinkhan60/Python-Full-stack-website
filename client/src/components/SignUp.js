import { useState } from "react";
import { Button, Form } from "react-bootstrap";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form-submit");
    console.log(formData.username);
    console.log(formData.email);
    console.log(formData.password);
  }
  return (
    <div className="container">
      <div className="form">
        <h1>Sign up page</h1>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              name="username"
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Button variant="primary" className="mt-3" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  ); 
};
export default SignUp;
