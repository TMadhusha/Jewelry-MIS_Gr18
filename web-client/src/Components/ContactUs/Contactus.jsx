import React from 'react'
import './contactus.css'

const Contactus = () => {

  return (
    <section>
       <div className="container">
      <h1 align ="center" >Contact US</h1>
      <form>
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
            {/* Add more options for other countries */}
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
          <input type="checkbox" id="captcha" name="captcha" required />
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