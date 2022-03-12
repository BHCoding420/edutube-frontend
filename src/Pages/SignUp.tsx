import axios from 'axios';
import React,{useState} from 'react';
import {Toast,Button} from 'react-bootstrap';

const SignUp = () => {

    interface Register_Data_Model {
        userName: string;
        email: string;
        pic:string;
        password:string;
    }
    interface Registration_Errors {
        nameError: string,
        emailError: string,
        passwordError: string
    }
    const [registerData, setregisterData] = useState<Register_Data_Model>({userName:"",email:"",password:"",pic:""});
    const [errors, seterrors] = useState<Registration_Errors>({nameError:"",emailError:"",passwordError:""});

    const [preview, setpreview] = useState<string | ArrayBuffer | null>("");
    const [Toast_isOpen, setToast_isOpen] = useState(false);
    const [CanResend,setCanResend] = useState(false);

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

    const [file, setfile] = useState<any>(null);
    var reader = new FileReader();

    const [id, setid] = useState<string>("");
    const [email, setemail] = useState<string>("");

    function handleChange(e:any):void {
        setregisterData({...registerData,[e.target.name] : e.target.value});
    }

    async function handleSubmit(e:any) {
        e.preventDefault();
        let newUserData = registerData;
        //cloudinary stuff
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
              setregisterData({ ...registerData, pic: res.secure_url });
              newUserData.pic = res.secure_url;
            });
        }
        //cloudinary stuff
        console.log(newUserData);
        const dat = await axios
          .post(`${process.env.REACT_APP_API}/users`, newUserData)
          .then((res) => {
            console.log(res.data);
            console.log("account created");
            setToast_isOpen(true);
            setCanResend(true);
            setid(res.data._id);
            setemail(res.data.email);
          })
          .catch((err) => {seterrors(err.response.data);console.log(err.response)});
    };

    async function sendEmail (id:string, email:string) {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/users/${id}/${email}`
        );
        console.log(res.data);
        if (res.data.success) {
            setToast_isOpen(false);
            setToast_isOpen(true);
        }
    };

    function removeImage () {
        setfile(null);
        setpreview("");
        setregisterData({ ...registerData,pic:""});

    }

  return (
    <>
    <div id="register">
            <Toast className="mt-5 mx-auto" show={Toast_isOpen} onClose={()=>{setToast_isOpen(false)}}>
                <Toast.Header>

                    <strong className="me-auto">Email Sent!!</strong>

                </Toast.Header>
                <Toast.Body>
                    Email successfully sent to {email} , check your inbox and click the activision link(your email might have been redirected to Spam)
                </Toast.Body>
            </Toast>
        <h3 className="text-center text-white">register form</h3>
        <div className="container">
            <div id="register-row" className="row justify-content-center align-items-center" onSubmit={(e) =>handleSubmit(e)}>
                <div id="register-column" className="col-md-6">
                    <div id="register-box" className="col-md-12">
                        <form id="register-form" className="form" action="" method="post">


                            <h3 className="text-center text-info">Sign Up</h3>

                            <div className="form-group">
                                <label htmlFor="userName" className="text-info">Username</label><br/>
                                <input type="text" name="userName" id="userName" className="form-control" onChange={(e) =>handleChange(e)}/>
                                {errors.nameError &&<div className="alert alert-danger" role="alert">
                                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                    <span className="sr-only">Error:</span>
                                    {errors.nameError}
                                </div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="text-info">E-mail</label><br/>
                                <input type="text" name="email" id="email" className="form-control" onChange={(e) =>handleChange(e)}/>
                                {errors.emailError &&<div className="alert alert-danger" role="alert">
                                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                    <span className="sr-only">Error:</span>
                                    {errors.emailError}
                                </div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" name="password" id="password" className="form-control" onChange={(e) =>handleChange(e)}/>
                                {errors.passwordError && <div className="alert alert-danger" role="alert">
                                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                    <span className="sr-only">Error:</span>
                                    {errors.passwordError}
                                </div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1" className="text-info">Profile pic</label><br/>

                                <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handlePic}/>
                            </div>
                            <div>

                                {preview &&
                                <div className="d-flex flex-column mt-3">
                                     <button type="button" className="btn btn-light btn-sm mx-2" style={{width:"8%",marginBottom:"-2.5rem",zIndex:"9",borderRadius:"50px"}} onClick={removeImage}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                    <img src={typeof preview === "string" ? preview : ""} alt="..." className="img-thumbnail" style={{width: "200px", height: "200px"}}/>
                                </div>}
                            </div>
                            <div className="form-group my-2">
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="submit"/>
                            </div>
                            {CanResend &&
                            <Button id="resend-email" className="text-right my-2" onClick={()=>sendEmail(id,email)}>
                                Resend Email
                            </Button>}

                            <div id="register-link" className="text-right">
                                <a href={`${process.env.REACT_APP_HOME}/register`} className="text-info">Register here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )

  }

export default SignUp;