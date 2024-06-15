import React from 'react'
import '../Login/loginReg.css'


export default function Login() {
  return (
    <section>
        <div className='login'>
            <div>
                <form>
                    <table>
                    <h1>Login</h1>
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
                        <div>
                            <tr>
                                <button>Login</button>
                                <button>Cancel</button>
                            </tr>
                            
                        </div>
                    </table>
                </form>
            </div>            
        </div>
    </section>
  )
}
