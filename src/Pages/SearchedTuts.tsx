import React,{useState,useEffect} from 'react' ;
import {useParams} from "react-router-dom";
import axios from 'axios';
import { TutorialModel } from '../models/Video.model';
import { Container,Image } from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago'
import {useNavigate} from "react-router-dom";

// English.
import en from 'javascript-time-ago/locale/en.json'
import Header from '../layout/Header';

const SearchedTuts = () => {
    const { search_query } = useParams();
    const [Tutorials, setTutorials] = useState<TutorialModel[] >([])
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API}/tutorials/search/${search_query}`)
            .then((response) => {setTutorials(response.data.result);console.log(response.data);});

    }, [])


    const timeAgo:any = new TimeAgo('en-US');
    const navigate = useNavigate();


  return (
    <>
    <Header/>
    <Container>
        {!Tutorials && <p>LOADING....</p>}
        {Tutorials && Tutorials.map((tut) => {
              return (
                <div>
                  {<div className="row my-5">

                        <div className="col-2" style={{backgroundImage: `url(${tut.thumbnail})`,backgroundSize: "cover",backgroundRepeat: "no-repeat"}}>
                            {/*<Image src={tut.thumbnail} style={} />*/}
                        </div>
                        <div className="col-8" style={{border: '1px solid'}} onClick={() => navigate(`/view/${tut._id}`)}>
                            <h4>{tut.title}</h4>
                            <div className="row">
                                <div className="col-1 mx-1" style={{minHeight:"50px",backgroundImage: `url(${tut.creator.pic})`,borderRadius:"25px",backgroundRepeat: "no-repeat",backgroundSize: "100% 100%"}}></div>
                                <div className="col-10">{tut.creator.userName}</div>
                            </div>
                            <small>{tut.UploadedAt}</small>
                            <h6>{tut.description.slice(0,150)}...</h6>
                        </div>
                    </div>}
                </div>

              );
            })}

    </Container>
    </>
  )
}

export default SearchedTuts