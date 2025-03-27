import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const createRecipe = (data) => {
    console.log("Form submitted:", data);
    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    console.log(token)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(data),
    };
    fetch("recipe/recipes", requestOptions)
    .then((res) => res.json())
    .then(data => {
      // console.log(data);
      reset();
      navigate("/");
      reset();
    });
    // reset();
  };

  return (
    <div className="create-recipe container">
      <h2>Add a New Recipe</h2>
      <Form>
        <Form.Group>
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe name"
            {...register("title", { required: true, maxLength: 25 })}
          />
        </Form.Group>
        {errors.title && (
          <p style={{ color: "red" }}>Recipe name is required</p>
        )}
        {errors.title?.type === "maxLength" && (
          <p style={{ color: "red" }}>Recipe name is too long maxLength 25</p>
        )}
        <br />
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as={"textarea"}
            type="textarea"
            rows={"5"}
            placeholder="Enter description"
            {...register("description", { required: true, maxLength: 255 })}
          />
        </Form.Group>
        {errors.description && (
          <p style={{ color: "red" }}>Description is required</p>
        )}
        {errors.description?.type === "maxLength" && (
          <p style={{ color: "red" }}>Description is too long maxLength 255</p>
        )}
        <br />
        <Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(createRecipe)}
          >
            Save
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
export default CreateRecipe;
