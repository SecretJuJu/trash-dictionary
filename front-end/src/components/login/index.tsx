import React from 'react'

import './login.css'

export class Login extends React.Component<{},{keyword: string}> {
  
  render() {
    return <div className="login-wrapper">
        <div className="login">
            <form>
                <div>
                    <div className="email">
                        <label htmlFor="#emailInput" >email</label>
                        <input type="text" placeholder="helloworld@example.com" id="emailInput" />
                    </div>
                    <div className="password"> 
                        <label htmlFor="#passwordInput">password</label>
                        <input type="password" placeholder="***********" id="passwordInput" />
                    </div>
                    <div className="buttons">
                        <button type="submit">Login</button>
                        <button>Register</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    ;
  }
}