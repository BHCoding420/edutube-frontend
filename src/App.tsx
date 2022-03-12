import "./App.css";
import Homepage from "./Pages/Homepage";
//import SignUp from "./Pages/SignUp";
//import Verification from "./Pages/Verification";
//import LogIn from "./Pages/LogIn";
//import ViewVid from "./Pages/View/ViewVid";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewVid from "./Pages/View/ViewVid";
import { isDataView } from "util/types";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";

//import Chatpage from "./Pages/Chatpage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/view/:fileId" element={<ViewVid />}></Route>
          <Route path="/profile/:userId" element={<UserProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
