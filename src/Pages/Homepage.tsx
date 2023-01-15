import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import '../App.css';
import Videos from "./Videos/Videos";
import Header from "../layout/Header";
import  { TutorialModel } from "../models/Video.model";


import {Image,Navbar,Container,Nav,Form,FormControl,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function App() {
    const [videos, setvideos] = useState<TutorialModel[]>([]);


    useEffect(() => {
      console.log(process.env);
      const data = axios
        .get(`https://edutubeserver-production.up.railway.app/tutorials`)
        .then((response) => {
          console.log(response);
          setvideos(response.data.tutorials);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  return (
    <div>
      <Header/>


    <main role="main">



      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">

            {videos.map((f) => {
              return (
                <div className="col-md-6 col-lg-3" key={f._id} >
                  {<Videos video={f}  />}
                </div>

              );
            })}

          </div>
        </div>
      </div>

    </main>


        </div>
  );
}

export default App;
