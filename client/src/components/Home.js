import { Link } from "react-router-dom"


const Home = () => {
  return (
    <div className="home container">
      <h1 className="heading">Welcome to Recipes</h1>
      <Link to="/signup" className="btn btn-primary">Get Started</Link>
    </div>
  )
}
export default Home