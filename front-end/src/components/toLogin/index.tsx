import React from 'react'
import axios from 'axios';
import env from '../../config/env'

import './toLogin.css'

export class ToLogin extends React.Component<{},{isLogined: boolean}> {
    
    constructor(props: any) {
        super(props)
        this.state = {isLogined: false}
        this.checkLogined = this.checkLogined.bind(this)
        this.checkLogined()
    }

    checkLogined = async () => {
        let token = localStorage.getItem('token')
        if (token) {
            console.log(env)
            const response = await axios.get(env.BACKEND_BASEURL+'/api/admin/tokenCheck',{
                headers: {
                    Authorization: 'bearer '+token
                }
            })
            console.log(response)
            if (response.data.result) {
                this.setState({isLogined: true})
            } else {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        }
    }

    getAdminName = () => {
        const userString = localStorage.getItem('user')
        if ( userString ) {
            const user = JSON.parse(userString)
            return user.username
        } 
        return "who the fuck are you"
    }

    render() {
        return <div className="to-login-wrapper">
            {
                this.state.isLogined?
                <div className="to-login-welcome">
                    <span>안녕하세요</span>&nbsp;<strong>{this.getAdminName()}</strong>님
                </div>
                :<div className="to-login">
                    <label htmlFor="to-login-btn">관리자이신가요? 로그인하러 가기 -&gt;</label>
                    <button id="to-login-btn" className="btn">Login</button>
                </div>
            }
        </div>;
    }
}