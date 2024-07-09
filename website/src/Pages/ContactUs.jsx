import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from 'emailjs-com';
import "../Pages/contactus.css";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import logo from '../Component/logo.png';


export default function ContactUs() {

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: '0',
      message: 'Welcome to Italy Silver Choice!',
      trigger: '1',
    }, {
      id: '1',
      message: 'Please enter your name to continue:',
      trigger: '2',
    }, {
      id: '2',
      user: true,
      trigger: '3',
    }, {
      id: '3',
      message: "Hello {previousValue}, how can I assist you today?",
      trigger: '4',
    }, {
      id: '4',
      options: [
        { value: 'view_products', label: 'View Products' },
        { value: '/', label: 'Contact Us' },
      ],
  }
];

const theme = {
  background: '#f7f7f7',
    headerBgColor: '#002144',
    headerFontColor: 'white',
    botBubbleColor: '#0F3789',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
    width: '400px',
    height: '500px',
    borderRadius: '10px',
    headerBorderRadius: '10px',
    floating: true,
};

const config = {
  botAvatar: logo,
  floating: true,
};


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      alert('Please verify that you are not a robot.');
      return;
    }

     emailjs.sendForm('service_afey40e', 'template_5y969sm', e.target, 'DPRX4yiRwdsMObgqc')
      .then((result) => {
        alert('Your message sent successfully!');
        window.location.reload();
        
      }, (error) => {
        alert('Failed to send message. Please try again later.');
      });

    e.target.reset();

  };

  return (
    <section>
       <div className="container">
      <h2 align ="center" className='back'>Contact US</h2>
      <form onSubmit={handleSubmit}>
        <table align='center'>
        <tr>
        <td>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select id="title" name="title" >
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
            required
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
            required
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
            required
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
            maxLength={10}
            required
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
            required
          />
        </div>
        </td>
        </tr>

        <tr>
        <td colSpan={2}>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" name="comment" required/>
        </div>
        </td>
        </tr>

        <tr>
        <td>
        <div className="form-group">
          <label htmlFor="captcha">I'm not a robot</label> 
           <ReCAPTCHA sitekey='6Le35JUpAAAAAFFt9Ngrj0RBJSUfYfKN8wAmj0c1'onChange={handleCaptchaChange}/> 
        
        </div>
        </td>
        </tr>

        <tr>
        <td>
        <button type="submit" className='form-btn'>Submit</button>
        </td>
        <td>
        <button type="reset" className='form-btn'>Clear</button>
        </td>
        </tr>

        </table>
      </form>

      
    <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Italy Silver Choice"
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </div> 
    
    </section>
  )
}
