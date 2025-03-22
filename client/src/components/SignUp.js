import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Sign up page</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("username", { required: true, maxLength: 20 })}
            />
            {errors.username && <span>This field is required</span>}
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i, maxLength: 80 })}
            />
            {errors.email && <span>This field is required</span>}
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && <span>This field is required</span>}
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword", { required: true, minLength: 6 })}
            />
            {errors.confirmPassword && <span>This field is required</span>}
          </Form.Group>
          <br />
          <Form.Group>
            <Button variant="primary" className="mt-3" type="submit">
              Submit
            </Button>
          </Form.Group>
          <br />
          <Form.Group>
            <small>Already have an account? <Link to="/login">Login</Link></small>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;