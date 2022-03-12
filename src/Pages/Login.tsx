import axios from 'axios';
import React,{useState} from 'react'

const Login = () => {

    interface Login_Data_Model {
        email: string;
        password:string;
    }
    const [loginData, setloginData] = useState<Login_Data_Model>({email:"",password:""});
    const [error, seterror] = useState<string>("");

    function handleChange(e:any):void {
        setloginData({...loginData,[e.target.name] : e.target.value});
    }
    async function handleSubmit(e:any) {
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_API}/users/login`,loginData)
        .then((response) => {
            console.log(response);
            window.localStorage.setItem("token", JSON.stringify(response.data));
            const loc:any = "/";
            console.log(loc);
            window.location = loc;
        })
        .catch((err) => {
            console.log(err.response.data);seterror(err.response.data.error)});


    }


  return (
    <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center" onSubmit={(e) =>handleSubmit(e)}>
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">


                            <h3 className="text-center text-info">Login</h3>
                            <h6 className="text-danger">{error}</h6>
                            <div className="form-group">
                                <label htmlFor="email" className="text-info">E-mail</label><br/>
                                <input type="text" name="email" id="email" className="form-control" onChange={(e) =>handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" name="password" id="password" className="form-control" onChange={(e) =>handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <br/>
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="submit"/>
                            </div>
                            <div id="register-link" className="text-right">
                                <a href={`${process.env.REACT_APP_HOME}/register`} className="text-info">Register here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;