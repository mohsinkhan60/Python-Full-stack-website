import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CreateRecipe from './components/CreateRecipe';

const App = () => {
   return (
      <Router>
         <div>
            <NavBar />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/create_recipe" element={<CreateRecipe />} />
            </Routes>
         </div>
      </Router>
   )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);