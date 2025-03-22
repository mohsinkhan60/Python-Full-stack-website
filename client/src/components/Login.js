import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {

    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
    const { username, password} = formData;
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("form-submit");
      formData.username = "";
      formData.password = "";
      setFormData({ ...formData });
    }

  return (
    <div className="container">
      <div className="form">
        <h1>Login page</h1>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <br />
            <Button
              variant="primary"
              className="mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <br />
            <Form.Group>
              <small>Do not have an account ? <Link to={"/signup"}>Sign up</Link></small>
            </Form.Group>
        </Form>
      </div>
    </div>
  );
};
export default Login;
