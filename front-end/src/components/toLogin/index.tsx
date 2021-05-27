import React from 'react'
import axios from 'axios';
import env from '../../config/env'
import {Link} from "react-router-dom";
import './toLogin.css'

export class ToLogin extends React.Component<{},{isLogined: boolean,loading:boolean}> {
    
    constructor(props: any) {
        super(props)
        this.state = {isLogined: false, loading:true}
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
        this.setState({loading: false})
        return
    }

    getAdminName = () => {
        const userString = localStorage.getItem('user')
        if ( userString ) {
            const user = JSON.parse(userString)
            return user.username
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload(false);
            return ""
        }
    }
    
    render() {
        return <div className="to-login-wrapper">
            {
                this.state.loading?
                    <span className="to-login-loading">로딩중...</span>
                :
                    this.state.isLogined?
                    <div className="to-login-welcome">
                        <span>안녕하세요</span>&nbsp;<strong>{this.getAdminName()}</strong>님
                    </div>
                    :<div className="to-login">
                        <label htmlFor="to-login-link">관리자이신가요? 로그인하러 가기 -&gt;</label>
                        <Link to="/login" id="to-login-link" className="btn">Login</Link>
                    </div>
            }
        </div>;
    }
}