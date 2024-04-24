import logo from './logo.svg';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// components
import Header from './components/header';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VolcanoList from './pages/VolcanoList';
import Volcano from './pages/Volcano';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/volcano_list" element={<VolcanoList />} />
          <Route path='/volcano' element={<Volcano />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
