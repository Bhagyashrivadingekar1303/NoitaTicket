import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Registration from './Component/Registration';
import { ToastContainer } from 'react-toastify';
import Navbar from './Component/Navbar';
import TicketList from './Component/TicketList';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <ToastContainer
        theme='colored'
        position="top-center"
        autoClose={1000}
        closeButton={false}
      />
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/ticket" element={<TicketList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
