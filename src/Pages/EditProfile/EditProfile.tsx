import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Container } from 'react-bootstrap';
import {useParams,useNavigate} from 'react-router-dom';




const EditProfile = () => {

    const { userId } = useParams();
    const [User, setUser] = useState(null);
    const history = useNavigate();

    const [preview, setpreview] = useState<any>(null);
    const [file, setfile] = useState<any>(null);

    const [Original_UserName,setOriginal_UserName] = useState<string>("");
    const [Original_Pic,setOriginal_Pic] = useState<string>(""); //

    const [UserData, setUserData] = useState<any>({userName:"",pic:""});
    const [error, seterror] = useState<string>("");

    function removeImage () {
      setfile(null);
      setpreview("");
      setUserData({ ...UserData,"pic":""});
      //setregisterData({ ...registerData,pic:""});

  }
    var reader = new FileReader();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/users/${userId}`)
            .then((res) => {
              setUser(res.data.users[0]);
              setpreview(res.data.users[0].pic);
              setUserData({...UserData,userName:res.data.users[0].userName,pic:res.data.users[0].pic})
              setOriginal_Pic(res.data.users[0].pic);
              setOriginal_UserName(res.data.users[0].userName);
              console.log(Original_UserName,Original_Pic);
            })
            .catch((err) => console.log(err))
      }, [])

      const handlePic = (e:any) => {
        const pic = e.target.files[0];
        console.log(pic);
        setfile(pic);

        reader.onload = function () {
          setpreview(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);

        //setUserData({ ...UserData, pic: pic });
      };

      const handleChange = (e:any) => {
        console.log(e.target.value)
        setUserData({ ...UserData,[e.target.name]:e.target.value});
      }

      const handleSubmit = async (e:any) => {
        e.preventDefault();
        seterror("");
        const submitData = UserData;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "bucvnm5ghbjhbj");
          await fetch("https://api.cloudinary.com/v1_1/dtgghkfz3/upload", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res.secure_url);
              submitData.pic = res.secure_url;
            });
        }
        console.log(submitData);
        await axios.patch(`${process.env.REACT_APP_API}/users/edit/${UserData.userName}/${userId}`, submitData)
             .then((res) => {console.log(res);
              if(res.data.error){
                console.log("error")
                seterror(res.data.error);
              }
              else{
                history(`/profile/${userId}`);
              }
            })
             .catch((err) => {console.log(err);})
        //!error && history(`/profile/${userId}`);

      }


  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>{error}</p>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">UserName</label>
          <input type="text" name="userName" className="form-control" id="exampleInputEmail1" value={UserData.userName} onChange={(e) => handleChange(e)}/>

        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Profile pic</label>
          <input type="file" name="pic"  onChange={(e) => handlePic(e)}/>

          <div>

                                {preview &&
                                <div className="d-flex flex-column mt-3">
                                     <button type="button" className="btn btn-light btn-sm mx-2" style={{width:"8%",marginBottom:"-2.5rem",zIndex:"9",borderRadius:"50px"}} onClick={removeImage}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                    <img src={typeof preview === "string" && User ? preview : "" } alt="..." className="img-thumbnail" style={{width: "200px", height: "200px"}}/>
                                </div>}
                            </div>


        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Container>
  )
}

export default EditProfile