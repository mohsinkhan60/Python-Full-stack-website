import { Link } from "react-router-dom";
import { useAuth } from "../auth";

const LoggedInHome = () => {
  return (
    <div className="recipes">
      <h1>List of Recipes</h1>
    </div>
  );
};
const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="heading">Welcome to Recipes</h1>
      <Link to="/signup" className="btn btn-primary">
        Get Started
      </Link>
    </div>
  );
};

const Home = () => {
  const [logged] = useAuth();
  return <div>'{logged ? <LoggedInHome /> : <LoggedOutHome />}</div>;
};
export default Home;
