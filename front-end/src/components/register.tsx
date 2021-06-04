import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import env from '../config/env'
import '../styles/register.css'

export const Register = () => {
    const passwordConfirmInputEl = useRef(null)
    const [values, setValues] = useState({ 
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        secretCode: ""
     });
    const [redirect,setRedirect] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        let isPassword = false
        let flag = false
        if (name === "passwordConfirm") {
            flag = values.password === value? true: false
            isPassword = true
        } else if (name === "password") {
            flag = values.passwordConfirm === value? true: false
            isPassword = true
        }
        if (isPassword) {
            const passwordConfirmEl: any = event.target.parentElement.parentElement.querySelector(".password-confirm>input")
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            if (!flag) {
                passwordConfirmEl.setCustomValidity("패스워드가 일치하지 않습니다.")
                setPasswordConfirm(false)
            } else {
                console.log("password matched")
                passwordConfirmEl.setCustomValidity("");
                setPasswordConfirm(true)
            }
        }
    };
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        if ( !passwordConfirm ) {
            alert("패스워드가 일치하지 않습니다.")
            return
        }
        setLoading(true)
        let flag = false
        let err

        try {
            const response = await axios.post(env.BACKEND_BASEURL+"/api/admin/register",{
                username: values.username,
                email: values.email,
                password: values.password,
                secretCode: values.secretCode
            })

            flag = response?.data?.result? true: false
        } catch (error) {
            err = error
            alert(error)
            if (!error.response) {
                alert("서버 응답없음...")
                return
            } else if ( error?.response?.status !== 400) {
                alert("알 수 없는 에러 발생...")
                return
            }
        } finally {
            setLoading(false)
        }
        
        if(flag) {
            alert("회원가입 성공")
            setRedirect("/login")
        } else {
            const { errorType, msg } = err?.response?.data
            console.log(err.response.data)
            if (errorType === "UsernameAlreadyExist") {
                alert("중복된 유저네임이 존재합니다.\n"+msg)
                const usernameInput: any = document.querySelector(".username> input")
                usernameInput.focus()
            } else if (errorType === "EmailAlreadyExist") {
                alert("중복된 이메일이 존재합니다.\n"+msg)
                const emailInput: any = document.querySelector(".email> input")
                emailInput.focus()
            } else if(errorType === "validationError") {
                let checkFor = ""
                const tmp = err
                err.response.data.details.forEach((e:any,index:number)=>{
                    checkFor += e.param+(index === tmp.response.data.details.length-1)?"":","
                })
                alert(`입력폼을 다시한번 확인 해 주세요\n${checkFor}를 확인 해 주세요`)
            } else {
                alert(`알 수 없는 에러`)
            }
        }
    }

    if (redirect !== "") {
        return <Redirect to={redirect} />
    }
    return (
    <>
    <div className="register-wrapper">
        <div className="register">
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="username">
                        <label htmlFor="#usernameInput" >username</label>
                        <input type="text" placeholder="username" id="usernameInput" 
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="email">
                        <label htmlFor="#emailInput" >email</label>
                        <input type="text" placeholder="helloworld@example.com" id="emailInput" 
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="password"> 
                        <label htmlFor="#passwordInput">password</label>
                        <span className="hints">(영문) 최소8자, 소문자, 대문자 ,숫자 를 1개이상 포함 해 주세요</span>
                        <input type="password" placeholder="***********" id="passwordInput"
                            name="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            value={values.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="password-confirm"> 
                        <label htmlFor="#passwordConfirmInput">password confirm</label>
                        <input type="password" placeholder="***********" id="passwordConfirmInput"
                            name="passwordConfirm"
                            value={values.passwordConfirm}
                            onChange={handleChange}
                            ref={passwordConfirmInputEl}
                            required
                        />
                    </div>
                    <div className="secret-code"> 
                        <label htmlFor="#secretCodeInput">secretCode</label>
                        <input type="text" placeholder="***********" id="secretCodeInput" 
                            name="secretCode"
                            value={values.secretCode}
                            onChange={handleChange}
                            required
                        />
                        <p>
                            허가된 사용자만 관리자가 될 수 있습니다. <br />
                            email : dev.tmdqh@gmail.com 혹은 <br />
                            kakaotalk id : dev.secretjuju 로 연락주시길 바랍니다.
                        </p>
                    </div>
                    
                    <div className="button">
                        <button type="submit" className={loading? "loading-btn" : ""}>Register</button>
                    </div>

                    <div className="at-regiter-to-login">
                        <Link to="/login">login으로</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
    )
}