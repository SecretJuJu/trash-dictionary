import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import env from '../config/env'
import '../styles/login.css'
import { useState } from 'react';

export const Login = () => {
    const [values, setValues] = useState({ email: "", password: "" });
    const [redirect, setRedirect] = useState("")
    const [loading, toggleLoading] = useState(false);
    const history = useHistory()
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (event:any) => {

        event.preventDefault();
        console.log(values)
        let user,token, response, err, errorType, errorMsg;
        
        try {
            toggleLoading(true)
            response = await axios.post(env.BACKEND_BASEURL+'/api/admin/auth',{
                email: values.email,
                password: values.password
            })
            user = response.data?.admin
            token = response.data?.token
            
        } catch (error) {
            err = error
            if(error?.response?.data?.errorType === 'loginFailed') {
                errorType = error?.response?.data?.errorType
                errorMsg = error?.response?.data?.msg
            }
        } finally {
            toggleLoading(false)
        }
        
        if ( errorType ) {
            alert(errorType+"\n\nmsg : "+errorMsg)
            window.location.reload();
        } else if(!err && token && user) {
            localStorage.setItem("user",JSON.stringify(user))
            localStorage.setItem("token",token)
            alert("login success!")
            setRedirect("/")
        } else {
            window.location.reload();
            return
        }
    }

    if (redirect !== "") {
        history.push(redirect)
    }
    return (
        <>
        
        <div className="login-wrapper">
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="email">
                            <label htmlFor="#emailInput">email</label>
                            <input type="email" placeholder="helloworld@example.com" id="emailInput"
                                name="email"
                                required={true}
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="password"> 
                            <label htmlFor="#passwordInput">password</label>
                            <input type="password" placeholder="***********" id="passwordInput"
                                name="password"
                                required={true}
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="button">
                            {
                                loading ?
                                  <button type="submit" className="loading-btn" disabled>Login</button>
                                : <button type="submit">Login</button>
                            }
                                
                        </div>
                        <div className="to-register">
                            관리자가 아니신가요? 함께하기 &nbsp;&nbsp; <Link to="/register">register</Link>
                        </div>
                        <div className="to-home">
                            관리자가 아니신가요? 뒤로가기 &nbsp;&nbsp;<Link to="/">Home</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}