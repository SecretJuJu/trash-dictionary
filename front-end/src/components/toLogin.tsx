import React, { useEffect, useState } from 'react'
import {Link, useHistory} from "react-router-dom";
import '../styles/toLogin.css'

export const ToLogin = () => {
    const history = useHistory();
    const [isLogined, setIsLogined] = useState(false);
    useEffect(() => {
        checkLogined()
        setTimeout(() => {
            // no display
            hideLogin()
        },10000)
    }, []);
    const hideLogin = () => {
        const toLoginWarpperEl: any= document.querySelector('.to-login-wrapper');
        if ( toLoginWarpperEl ) {
            toLoginWarpperEl.style.display = 'none';
        }
    }
    const checkLogined = async () => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token && user) {
            setIsLogined(true);
        } else {
            setIsLogined(false);
        }
    }

    const getAdminName = () => {
        const userString = localStorage.getItem('user')
        if ( userString ) {
            try {
                const user = JSON.parse(userString)
                return user.username
            } catch (e) {
                return history.push('/logout')
            }
        } else {
            history.push('/logout')
        }
    }
    
    return( 
        <>
        <div className="to-login-wrapper">
            {
                isLogined?
                <div className="to-login-welcome">
                    <p>
                        <span>안녕하세요</span>&nbsp;<strong>{getAdminName()}</strong>님
                    </p>
                    <Link to="/logout" id="to-logout-link">logout</Link>
                </div>
                :<div className="to-login">
                    <label htmlFor="to-login-link">관리자이신가요? 로그인하러 가기 -&gt;</label>
                    <Link to="/login" id="to-login-link" className="btn">Login</Link>
                </div>
            }
        </div>
        </>
    )
}