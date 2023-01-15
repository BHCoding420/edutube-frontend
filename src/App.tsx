import "./App.css";
import React,{useState} from 'react'
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
import SearchedTuts from "./Pages/SearchedTuts";
import EditProfile from "./Pages/EditProfile/EditProfile";
import {getCurrentUser} from "./services/getCurrentUser";

//import Chatpage from "./Pages/Chatpage";

function App() {
  const [User, setUser] = useState<any>(getCurrentUser());
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/view/:fileId" element={<ViewVid />}></Route>
          <Route path="/profile/:userId" element={<UserProfile />}></Route>
          <Route path="/search/:search_query" element={<SearchedTuts />}></Route>
          <Route path="/editProfile/:userId" element={<EditProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
