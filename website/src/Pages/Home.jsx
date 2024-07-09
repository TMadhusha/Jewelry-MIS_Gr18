import React from 'react';
import "../Pages/Home.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import logo1 from '../Images/home1.png';
import logo2 from '../Images/home2.jpg';
import logo3 from '../Images/home3.jpg';

export default function Home() {
  const images = [logo1, logo2, logo3];

  return (
    <section className='HomeSection'>
     
      <Slide>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    
                </div>
            </div>
        </Slide>
     
    </section>
  );
}
