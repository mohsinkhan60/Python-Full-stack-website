import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const onSubmit = (data) => {
    // console.log("Form submitted:", data);

    if (data.password === data.confirmPassword) {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      fetch("/auth/signup", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setServerResponse(data.message);
          setShow(true);
          navigate("/");
        })
        .catch((err) => console.log(err));

      reset();
    } else {
      alert("Password and Confirm Password should be same");
    }
  };
  return (
    <div className="container">
      <div className="form">
        {show ? (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <p>{serverResponse}</p>
          </Alert>
        ) : (
          <h1>Sign up page</h1>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("username", { required: true, maxLength: 20 })}
            />
            <div className="mt-2">
              {errors.username && (
                <small style={{ color: "red" }}>Username is required</small>
              )}
              {errors.username?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 20 </small>
                </p>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
                maxLength: 80,
              })}
            />
            <div className="mt-1">
              {errors.email && (
                <p style={{ color: "red" }}>
                  <small>Email is required</small>
                </p>
              )}
              {errors.email?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Max characters should be 80</small>
                </p>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <div className="mt-1">
              {errors.password && (
                <p style={{ color: "red" }}>
                  <small>Password is required</small>
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  <small>Min characters should be 6</small>
                </p>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword", { required: true, minLength: 6 })}
            />
            <div className="mt-1">
              {errors.confirmPassword && (
                <p style={{ color: "red" }}>
                  <small>Confirm Password is required</small>
                </p>
              )}
              {errors.confirmPassword?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  <small>Min characters should be 6</small>
                </p>
              )}
            </div>
          </Form.Group>
          <br />
          <Form.Group>
            <Button variant="primary" className="mt-2" type="submit">
              Submit
            </Button>
          </Form.Group>
          <br />
          <Form.Group>
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
