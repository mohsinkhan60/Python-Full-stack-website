import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';

const App = () => {
   return (
      <Router>
         <div className='app'>
            <NavBar />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
            </Routes>
         </div>
      </Router>
   )
}

const Home = () => <div>Home Page</div>;
const Login = () => <div>Login Page</div>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);