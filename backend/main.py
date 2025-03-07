from flask import Flask
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe
from exts import db

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

api = Api(app, doc='/docs')

recipe_model=api.model(
    "Recipe",
    {
        "id": fields.Integer,
        "name": fields.String,
        "description": fields.String,
    }
)

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'message': 'hello world'}
    
@api.route('/recipes')
class RecipesResource(Resource):
    def get(self):
        pass
    def post(self):
        pass

@api.route('/recipe/<int:id>')
class RecipeResource(Resource):
    def get(self, id):
        pass
    def put(self, id):
        pass
    def delete(self, id):
        pass

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Recipe': Recipe}

if __name__ == '__main__':
    app.run(debug=True)