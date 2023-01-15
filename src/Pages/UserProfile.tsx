import axios from 'axios';
import React,{useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Header from '../layout/Header';
import  { TutorialModel } from "../models/Video.model";
import Videos from './Videos/Videos';
import {Container,Image} from 'react-bootstrap';
import {getCurrentUser} from '../services/getCurrentUser';
import {useNavigate} from "react-router-dom";



const UserProfile = () => {
    const { userId } = useParams();
    const [userVideos, setuserVideos] = useState<TutorialModel[] >([]);
    const [UserId, setUserId] = useState(userId);
    const [ProfileUser, setProfileUser] = useState<any>(null);
    const [CurrentUser, setCurrentUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
      console.log(userId);
    }, [userId])

    useEffect(() => {
      const res =
        axios.get(`${process.env.REACT_APP_API}/tutorials/${userId}`)
        .then((response) => {setuserVideos(response.data.tutorials);})
        .catch((error) => {console.log(error.response);});

      const getProfileUser = axios.get(`${process.env.REACT_APP_API}/users/${userId}`)
      .then((response) => {
        setProfileUser(response.data.users[0]);
      })
      .catch((error) => {console.log(error.response);});

      setCurrentUser(getCurrentUser());


    }, [userId])

    async function followUser()
    {
      //console.log(ProfileUser.followers.push(CurrentUser.id))
      await axios.put(`${process.env.REACT_APP_API}/users/follow/${CurrentUser.id}/${UserId}`)
                .then((response) => {
                  console.log(response.data);
                  const newFollowers = ProfileUser.followers.concat(CurrentUser.id);
                  console.log("new",newFollowers);
                  setProfileUser({...ProfileUser,followers:newFollowers});
                })
    }
    async function unfollowUser()
    {
      await axios.put(`${process.env.REACT_APP_API}/users/unfollow/${CurrentUser.id}/${UserId}`)
                .then((response) => {
                  console.log(response.data);

                  const newFollowers = ProfileUser.followers.filter((id:string) => id !== CurrentUser.id);
                  console.log("new",newFollowers);
                  setProfileUser({...ProfileUser,followers:newFollowers});
                })
    }

  return (
      <div>
        <Header/>
        <div className="album py-5 bg-light">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">{ProfileUser?.userName}</h1>
            <p className="lead">Followers: {ProfileUser?.followers.length}</p>
            <hr className="my-4"/>

            {CurrentUser && userId !== CurrentUser?.id &&
            <p className="lead">
              {
              !ProfileUser?.followers?.includes(CurrentUser.id) ?
              <p className="btn btn-primary btn-lg"  role="button" onClick={followUser}>
                Follow
              </p>
              :
              <p className="btn btn-primary btn-lg"  role="button" onClick={unfollowUser}>
                Unfollow
              </p>
              }
            </p>}
            {CurrentUser && userId === CurrentUser?.id &&
            <p className="lead">
              <p className="btn btn-primary btn-lg"  role="button" onClick={() => navigate(`/editProfile/${userId}`)}>
                Edit Profile
              </p>
            </p>}
          </div>
          <div className="row">

            {userVideos.map((v) => {
              return (
                <div className="col-md-6 col-lg-3" key={v._id} >
                  <Videos video={v}  />
                </div>

              );
            })}

          </div>
        </div>
      </div>

      </div>

  )
}

export default UserProfile