from flask import Flask, request
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from config import DevConfig
from models import Recipe
from exts import db

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

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'message': 'hello world'}
    
@api.route('/recipes')
class RecipesResource(Resource):
    @api.marshal_list_with(recipe_model)
    def get(self):
        recipes = Recipe.query.all()
        return recipes
    
    @api.marshal_with(recipe_model)
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
    def delete(self, id):
        recipe_to_delete = Recipe.query.get_or_404(id)
        recipe_to_delete.delete()
        return None, 204

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Recipe': Recipe}

if __name__ == '__main__':
    app.run(debug=True)