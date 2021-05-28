import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../config/env'
import './login.css'
import { Redirect } from "react-router-dom";

export class Login extends React.Component<{},{
    email: string,
    password: string,
    loading: boolean,
    redirect: string 
}> {
    constructor(props: any) {
        super(props)
        this.state = {email:'', password: '', loading: false, redirect: ""}
    
        this.doLogin = this.doLogin.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleEmailChange = (event: any) => {
        this.setState({email:event.target.value});
    }
    handlePasswordChange = (event: any) => {
        this.setState({password:event.target.value});
    }
    doLogin = async (e: any) => {
        e.preventDefault();
        this.setState({loading: true})
        let user,token, response, errorType, errorMsg;
        try {
            response = await axios.post(env.BACKEND_BASEURL+'/api/admin/auth',{
                email: this.state.email,
                password: this.state.password
            })
            user = response.data?.admin
            token = response.data?.token
            errorType = response.data?.errorType
            errorMsg = response.data?.msg
        } catch (err) {
            alert("unecpected error"+err)
            console.log(err)
        } finally {
            this.setState({loading: false})
        }
        
        if ( errorType ) {
            alert(errorType+"\n"+errorMsg)
            this.setState({redirect: "/login"})
        } else {
            localStorage.setItem("user",JSON.stringify(user))
            localStorage.setItem("token",token)
            alert("login success!")
            this.setState({redirect: "/"})
        }

        
    }

    render() {
        if (this.state.redirect !== "") {
            return <Redirect to={this.state.redirect} />
        }
        return <div className="login-wrapper">
            <div className="login">
                <form onSubmit={this.doLogin}>
                    <div>
                        <div className="email">
                            <label htmlFor="#emailInput">email</label>
                            <input type="text" placeholder="helloworld@example.com" id="emailInput" 
                                value={this.state.email} 
                                onChange={this.handleEmailChange}
                                required={true}
                            />
                        </div>
                        <div className="password"> 
                            <label htmlFor="#passwordInput">password</label>
                            <input type="password" placeholder="***********" id="passwordInput" 
                                value={this.state.password} 
                                onChange={this.handlePasswordChange}
                                required={true}
                            />
                        </div>
                        <div className="button">
                            {
                                this.state.loading ?
                                  <button type="submit" className="loading-btn" disabled>Login</button>
                                : <button type="submit">Login</button>
                            }
                                
                        </div>
                        <div className="to-register">
                            관리자가 아니신가요? 함께하기 -&gt; <Link to="/register">register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}