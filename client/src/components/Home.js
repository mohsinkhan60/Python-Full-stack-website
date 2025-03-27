import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipe";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const LoggedInHome = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState(0);

  useEffect(() => {
    fetch("/recipe/recipes")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setRecipes(data);
      });
  }, []);


  const showModel = (id) => {
    setShow(true);
    setRecipeId(id);
    recipes.map((recipe) => {
      if (recipe.id === id) {
        setValue("title", recipe.title);
        setValue("description", recipe.description);
      }
    })
  };
  const updateRecipe = (data) => {
    // console.log(data);
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(data),
    }

    fetch(`recipe/recipe/${recipeId}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setShow(false);
        setRecipes(recipes.map(recipe => recipe.id === recipeId ? data : recipe));
      });
  }

  return (
    <div className="recipes container">
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                {...register("title", { required: true, maxLength: 25 })}
              />
            </Form.Group>
            {errors.title && (
              <p style={{ color: "red" }}>Recipe name is required</p>
            )}
            {errors.title?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                Recipe name is too long maxLength 25
              </p>
            )}
            <br />
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as={"textarea"}
                type="textarea"
                rows={"5"}
                {...register("description", { required: true, maxLength: 255 })}
              />
            </Form.Group>
            {errors.description && (
              <p style={{ color: "red" }}>Description is required</p>
            )}
            {errors.description?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                Description is too long maxLength 255
              </p>
            )}
            <br />
            <Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit(updateRecipe)}
              >
                Save
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <h1>List of Recipes</h1>
      {recipes.map((recipe, index) => (
        <Recipe
          key={index}
          title={recipe.title}
          description={recipe.description}
          onClick={() => showModel(recipe.id)}
        />
      ))}
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
