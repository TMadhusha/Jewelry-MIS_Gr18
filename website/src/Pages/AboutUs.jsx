import React from 'react';
import shop from "../Images/shop1.jpg"
import shop2 from "../Images/shop2.jpg"  // Assuming you have these images in your Images folder
import shop3 from "../Images/shop 3.jpg"
import owner from "../Images/owner.jpg"

export default function AboutUs() {
  return (
    <section>
      <div className='pageStyle'>
        <div className='company-overview'>
          <h1>About Us</h1>
          <span>Welcome to Italy Silver Choice, where elegance meets craftsmanship. Established in 2010, we are committed to offering the finest jewelry with exceptional customer service.</span>
        </div>
        <div className='history'>
          <h2>Our History</h2>
          <span>Founded in 2010 by M.F.M Sarsam, Italy Silver Choice started as a small boutique in Gampaha. Ismil's passion for creating unique and exquisite pieces quickly garnered a loyal following.</span>
          <span>Over the years, our shop has grown, but our dedication to quality and craftsmanship remains unchanged. In 2013, we expanded to a larger location, allowing us to offer an even wider selection of fine jewelry.</span>
          <span>In 2024, we launched our online store, bringing our beautiful collections to customers worldwide. Today, Italy Silver Choice is known for its bespoke designs, exceptional customer service, and commitment to ethical sourcing.</span>
        </div>
        <div className='team'>
          <h2>Founder of Italy Silver Choice</h2>
          <div className='team-member'>
            <img src={owner} alt='Team Member' style={{ height: "25%", width: "25%" }} />
            <h3>M.F.M Sarsam</h3>
          </div>
        </div>
        <div className='values'>
          <h2>Our Values</h2>
          <span>At Italy Silver Choice, we believe in:</span>
          <ul>
            <li><strong>Quality Craftsmanship:</strong> Each piece of jewelry is meticulously crafted with the highest attention to detail.</li>
            <li><strong>Customer Satisfaction:</strong> We strive to exceed our customers' expectations with exceptional service and support.</li>
            <li><strong>Ethical Sourcing:</strong> Our materials are sourced from responsible suppliers who share our commitment to ethical practices.</li>
            <li><strong>Innovation:</strong> We constantly innovate to offer unique and contemporary designs that stand out.</li>
            <li><strong>Community Engagement:</strong> We believe in giving back to the community and supporting local artisans and businesses.</li>
          </ul>
        </div>
        <div className='products-services'>
          <h2>Our Products and Services</h2>
          <span>We offer a wide range of jewelry including Bangles, Bracelets, Chains, Earrings, Necklaces, Pendants, and Rings. Our services include gift wrapping, cleaning and maintenance, and jewelry repair.</span>
        </div>
        <div className='gallery' >
          <h2>Gallery</h2>
          <div style={{ justifyContent:"space-between" ,gap:"10px" }}>
          <img src={shop} alt='Gallery Image' style={{ height: "25%", width: "25%" }}  />
          <img src={shop2} alt='Gallery Image' style={{ height: "25%", width: "25%" }} />
          </div>
        </div>
        <div className='cta'>
          <h2>Visit Us</h2>
          <span>We invite you to explore our collection and experience the elegance of our jewelry. Visit us in Nittabuwa or browse our products online.</span>
        </div>
      </div>
    </section>
  );
}
