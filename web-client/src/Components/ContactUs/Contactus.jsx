import React from 'react'
import './contactus.css'
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';

const Contactus = () => { 

  function sendEmail(e) {
  e.preventDefault();

  emailjs.sendForm('service_afey40e', 'template_5y969sm', e.target, 'DPRX4yiRwdsMObgqc')
    .then((result) => {
      console.log("Email sent successfully:", result.text);
    })
    .catch((error) => {
      console.error("Failed to send email:", error.text);
    });
  }

  return (
    <section>
      <div className="container">
      <h1 align ="center" >Contact US</h1>
      <form onSubmit={sendEmail}>
        <table>
        <tr>
        <td>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select id="title" name="title">
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
        </div>
        </td>
        <td>
          
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
          />
        </div>
        </td></tr>

        <tr>
        <td>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
          />
        </div>
        </td>

        <td>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
          />
        </div>
        </td>
        </tr>

        <tr>
        <td>
        <div className="form-group">
          <label htmlFor="phone">Phone No</label>
          <input
            type="tel"
            id="phone"
            name="phone"
          />
        </div>
        </td>

        <td>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select id="country" name="country">
            <option value="Sri Lanka">Sri Lanka</option>
          </select>
        </div>
        </td>
        </tr>

        <tr>
        <td colSpan={2}> 
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
          />
        </div>
        </td>
        </tr>

        <tr>
        <td colSpan={2}>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" name="comment"/>
        </div>
        </td>
        </tr>

        <tr>
        <td>
        <div className="form-group">
          <label htmlFor="captcha">I'm not a robot</label>
        <ReCAPTCHA sitekey='6Le35JUpAAAAAFFt9Ngrj0RBJSUfYfKN8wAmj0c1' name="g-recaptcha-response"/>
        
        </div>
        </td>
        </tr>

        <tr>
        <td colSpan={2} align='center'>
        <button type="submit">Submit</button>
        </td>
        </tr>

        </table>
      </form>
    </div>
    </section>
    
  )
}

export default Contactus