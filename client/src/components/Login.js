import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const loginUser = (data) => {
    console.log("Form submitted:", data);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }

    fetch('/auth/login',requestOptions)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.access_token)
        
        if (data){
         login(data.access_token)
         navigate('/')
        }
        else{
            alert('Invalid username or password')
        }
      })
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
              {...register("username", { required: true, maxLength: 25 })}
            />
          </Form.Group>
          {errors.username && <p style={{color: "red"}}>Username is required</p>}
          {errors.username?.type === "maxLength" && <p style={{color: "red"}}>Username is too long maxLength 25</p>}
          <br />
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true, maxLength: 20 })}
            />
          </Form.Group>
          {errors.password && <p style={{color: "red"}}>Password is required</p>}
          {errors.password?.type === "maxLength" && <p style={{color: "red"}}>Password is too long maxLength 20</p>}
          <br />
          <Button
            variant="primary"
            className="mt-3"
            type="submit"
            onClick={handleSubmit(loginUser)}
          >
            Login
          </Button>
          <br />
          <Form.Group>
            <small>
              Do not have an account ? <Link to={"/signup"}>Sign up</Link>
            </small>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
export default Login;
