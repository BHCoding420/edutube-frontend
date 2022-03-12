import React, { useState,useEffect } from 'react'
import {Image,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TutorialModel} from '../../models/Video.model';
import {useNavigate} from "react-router-dom";
import {getCurrentUser} from "../../services/getCurrentUser";

import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en.json'

interface props {
  video:TutorialModel;
}

const noThumbnail:string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEW7u7vz8/O4uLjb29vk5OTs7Ozh4eHZ2dny8vLu7u7q6ur29va9vb22trbn5+fGxsbQ0NDJycnU1NSwsLCMcr6HAAAESklEQVR4nO2bgXKiMBCGSTSaJQkIff93vf2X1lqF3tydTlfv/6YdFZTJ191sFopdRwghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYSQvyM+jp9WW6jz7lHM9aflDCnhURT5aTklzo8TVMX55xM1HmCYH2CHY5aDA8OdDWfY35vBjrvzYjg+oI6Ofgxz2cf7F70a9yU7MQzh8BDDg5sYwvDPPxdrrfG7v8yTG8ap11op83dv8W34m6xd1hgs6dtvdG7Yaf5tDw6CeVnztrsW54bxWOTUtoY3fvZBZdPBuSEcSj+uj09DeG6CSt48smvDOLw3XXVthFEuerMybh3Zs2Gc3tOwhHnlJC9edp9l2jqya0P5zEKZ2s1nLhv1p4yhlplLhUGn45dFwcZ+DuLmkR0b1usTod3VdHz2WvqxnF+EMZ/W35Gx5Nf1BsGx4bhy1l/S5coRzz1Nql3r0KCuHNmtYexvBfPHyrEEq6IvDaWgL22jnlxO8TaMbg3jaePCTQnHi0ZOo2bnFnqKoY5v403B9WvYbV+zuZ6O6tjFsY2tra0YHg0xnd6v22w5putgwTDW40rv49FQMy7W31xcvGnk6tjqUNL1guLSENOq7c9N9We25i89TJltOmqCWumJ43gIfQphvlg0KvLXnaFVfKwU+YvWWS/rM3tR8mT/k6it4iHWJPiz5DSd/1OBR2+GKI0txr5IQkCk71NS14yXomJiW2wfUnVEFW3VrtUcRFRP9+YDAttZaLHdlaEOuKnhSdVS35ckKQ1QhJSIxkg3ABEoZpFZ/RroTrJPQcxe0rE2ZK9ur82ZIcYVuz7LIBozjFYHHSyCiKa+EmzRF5qQsE5z94Z+LeY0SIA7yP3JlsrRnWF909xqOx3jgBxNJgpTPdlVLY2l/sJQfyyHs55z6EdinItGO/S9FLXX55KmN9RkZ1naVYuHpIyUUyd90NwMOuCsrxDQfnkUMxx6i+RBUzUFMxxgl4ruCXK0mmq9qxtDJGlrey0WGCImYxo0EwNmIYrNF0PdMCQtPth3PEp4jyG89bkail3EijvNXi//e0Klad2kQ7NhauuSMANNBnmbUEk/DBf0U2kJ7rVhQSYPunLMwz77Mexa7VDvMeFQLNMiYxVEpxbmYD5XGxW0RdKe5tDDUn+1KKklNuiOozvD2k4i5ras8CiMSEX1yrbeYeIJ1sWCRF2aAJuU2Few3x7xXltNYrfTxdOR4XLp4va8Il9v/Wzhcrht8M693S66qzQ3ly7+CTMMrgzXLl28lGHc0ZCGNKQhDWlIQxrS8CkM73mPaXZoeCr35eTNsHbT8Z5Mru5NxP2leHbPo+LX0/2lr36PMErfK9/n/fr36r/89y1e/zsz/8P3nl7/u2uEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCyBPyC1stQARopdgqAAAAAElFTkSuQmCC";

TimeAgo.addDefaultLocale(en);

const timeAgo:any = new TimeAgo('en-US');

const Videos = ({video}:props) => {

  let vid_link:string = `/view/${video._id}`;
  let user_link:string = `/profile/${video.creator._id}`;

  const navigate = useNavigate();

  const upload_date:Date = new Date(video.UploadedAt.toString().slice(0,10));
  const time_ago_uplaod:string = timeAgo.format(upload_date);
  console.log(time_ago_uplaod);



  return (
                <div className="card mb-4 shadow-sm">

                <Image src={video.thumbnail || noThumbnail} className="img-fluid mx-auto " onClick={() => navigate(vid_link)} style={{minHeight:"250px",minWidth:"100%",maxHeight:"250px"}} thumbnail/>


                <div className="card-body" style={{minHeight:"150px"}}>
                  <small>{video.file_type.startsWith("vid") ? video.file_type.split("/")[0] : video.file_type.split("/")[1] }</small>
                  <p className="card-text">{video.title}</p>

                  <div className="d-flex justify-content-between align-items-center">


                      <div className="btn-group" onClick={() => navigate(user_link)}>
                        <Image className="mx-2" src={video.creator.pic} style={{verticalAlign: "middle",width: "50px",height: "50px"}} roundedCircle/>
                        <p>{video.creator.userName}</p>
                      </div>


                    <small className="text-muted">{time_ago_uplaod}</small>
                  </div>

                </div>


              </div>




  )
}

export default Videos;