import unittest
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()


    def test_hello_world(self):
        hello_response = self.client.get('/recipe/hello')
        json = hello_response.json
      #   print(json)
        self.assertEqual(hello_response.status_code, 200)
        self.assertEqual(json['message'], 'hello world')

    def test_signup(self):
        signup_response = self.client.post('/auth/signup',
            json={
                'username': 'testuser',
                'email': 'testuser@gmail.com',
                'password': 'password'
            }
        )
        status_code = signup_response.status_code
        self.assertEqual(status_code, 200)

    def test_login(self):
        signup_response = self.client.post('/auth/signup',
            json={
                'username': 'testuser',
                'email': 'testuser@gmail.com',
                'password': 'password'
            }
        )
        login_response = self.client.post('/auth/login',
            json={
                'username': 'testuser',
                'password': 'password'
            }
        )
        status_code = login_response.status_code
        json = login_response.json
      #   print(json)
        self.assertEqual(status_code, 200)

    def test_get_all_recipes(self):
        """Test get all recipes"""
        response = self.client.get('/recipe/recipes')
        # print(response.json)
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_get_one_recipes(self):
        id = 1
        response = self.client.get(f'/recipe/recipe/{id}')
        status_code = response.status_code
        # print(status_code)
        self.assertEqual(status_code, 404)

    def test_create_recipes(self):
        signup_response = self.client.post('/auth/signup',
            json={
                'username': 'testuser',
                'email': 'testuser@gmail.com',
                'password': 'password'
            }
        )
        login_response = self.client.post('/auth/login',
            json={
                'username': 'testuser',
                'password': 'password'
            }
        )
        access_token = login_response.json["access_token"]
        # print(access_token)

        create_recipe_response = self.client.post('/recipe/recipes',
            json={
                'title': 'test recipe',
                'description': 'test description',
            },
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = create_recipe_response.status_code
        # print(create_recipe_response.json)
        self.assertEqual(status_code, 201)

    def test_update_recipes(self):
        signup_response = self.client.post('/auth/signup',
            json={
                'username': 'testuser',
                'email': 'testuser@gmail.com',
                'password': 'password'
            }
        )
        login_response = self.client.post('/auth/login',
            json={
                'username': 'testuser',
                'password': 'password'
            }
        )
        access_token = login_response.json["access_token"]
        # print(access_token)

        create_recipe_response = self.client.post('/recipe/recipes',
            json={
                'title': 'test recipe',
                'description': 'test description',
            },
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = create_recipe_response.status_code

        id = 1
        update_response = self.client.put(f'/recipe/recipe/{id}',
            json={
                'title': 'updated recipe',
                'description': 'updated description',
            },
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = update_response.status_code
        self.assertEqual(status_code, 200)


    def test_delete_recipes(self):
        signup_response = self.client.post('/auth/signup',
            json={
                'username': 'testuser',
                'email': 'testuser@gmail.com',
                'password': 'password'
            }
        )
        login_response = self.client.post('/auth/login',
            json={
                'username': 'testuser',
                'password': 'password'
            }
        )
        access_token = login_response.json["access_token"]
        # print(access_token)

        create_recipe_response = self.client.post('/recipe/recipes',
            json={
                'title': 'test recipe',
                'description': 'test description',
            },
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )

        id = 1
        delete_response = self.client.delete(f'/recipe/recipe/{id}',
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )
        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)
        # print(delete_response.json)


    
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == '__main__':
    unittest.main()