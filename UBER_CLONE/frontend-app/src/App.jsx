import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainRiding from "./pages/CaptainRiding";
import UserLogout from "./pages/UserLogout";
import Home from "./pages/Home";
import Start from "./pages/Start";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import { Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />

        <Route path="/login" element={<UserLogin />} />
        <Route path="/logout" element={<UserLogout />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
         <Route path="/captain-logout" element={<CaptainLogout />} />
      </Routes>
    </>
  );
}

export default App;
