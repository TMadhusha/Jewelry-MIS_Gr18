import React from 'react'
import '../Login/loginReg.css'

export default function Login() {
  return (
    <section>
        <div className='login'>
            <div>
            <h1>Login</h1>
            </div>
            <div>
                <form>
                    <table>
                        <tr>
                            <td>Username</td>
                        </tr>
                        <tr>
                            <input type='text' name='uname'/>
                        </tr>
                        <tr>
                            <td>Password:</td>
                        </tr>
                        <tr>
                            <input type='password' name='pwd'/>
                        </tr>
                    </table>
                </form>
            </div>
            <div>
                <button style={{width:"100px",marginLeft:"10px",height:"50px"}}>Login</button>
                <button style={{width:"100px",marginLeft:"10px",height:"50px"}}>Cancel</button>
            </div>
            
        </div>
    </section>
  )
}
