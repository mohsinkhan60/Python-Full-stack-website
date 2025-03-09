from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from config import DevConfig
from models import Recipe,User
from exts import db
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)
migrate = Migrate(app, db)

api = Api(app, doc='/docs')

recipe_model=api.model(
    "Recipe",
    {
        "id": fields.Integer,
        "title": fields.String,
        "description": fields.String,
    }
)

signup_model=api.model(
    "SignUp",
    {
        # "id": fields.Integer,
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    }
)

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'message': 'hello world'}

@api.route('/signup')
class SignUp(Resource):
    # @api.marshal_with(signup_model)
    @api.expect(signup_model)
    def post(self):
        data = request.get_json()

        username=data.get('username')

        db_user = User.query.filter_by(username=username).first()
        
        if db_user is not None:
            return {"message": f"{username} already exists"}, 400

        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()
        return jsonify({"message": "User created successfully"})    

@api.route('/login')
class Login(Resource):
    def post(self):
        pass
    
@api.route('/recipes')
class RecipesResource(Resource):
    @api.marshal_list_with(recipe_model)
    def get(self):
        recipes = Recipe.query.all()
        return recipes
    
    @api.marshal_with(recipe_model)
    @api.expect(recipe_model)
    def post(self):
        data = request.get_json()
        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description')
        )
        new_recipe.save()
        return new_recipe, 201

@api.route('/recipe/<int:id>')
class RecipeResource(Resource):

    @api.marshal_with(recipe_model)
    def get(self, id):
        recipe = Recipe.query.get_or_404(id)
        return recipe
    
    @api.marshal_with(recipe_model)
    def put(self, id):
        recipe_to_Update = Recipe.query.get_or_404(id)
        data = request.get_json()
        recipe_to_Update.update(data.get('title'), data.get('description'))
        return recipe_to_Update
    
    @api.marshal_with(recipe_model)
    def delete(self, id):
        recipe_to_delete = Recipe.query.get_or_404(id)
        recipe_to_delete.delete()
        return recipe_to_delete

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Recipe': Recipe}

if __name__ == '__main__':
    app.run(debug=True)