import React from 'react';

export default function AboutUs() {
  return (
    <section>
      <div className='page'>
        <div className='company-ovrview'>
          <h1>About Us</h1>
          <p>Welcome to Italy Silver Choice, where elegance meets craftsmanship. Established in 2010, we are committed to offering the finest jewelry with exceptional customer service.</p>
        </div>
        <div className='history'>
          <h2>Our History</h2>
          <p>Founded in 2010 by M.F.M Sarsam, Italy Silver Choice started as a small boutique in Gampaha. Ismil's passion for creating unique and exquisite pieces quickly garnered a loyal following.</p>
          <p>Over the years, our shop has grown, but our dedication to quality and craftsmanship remains unchanged. In 2013, we expanded to a larger location, allowing us to offer an even wider selection of fine jewelry.</p>
          <p>In 2024, we launched our online store, bringing our beautiful collections to customers worldwide. Today, Italy Silver Choice is known for its bespoke designs, exceptional customer service, and commitment to ethical sourcing.</p>
        </div>
        <div className='team'>
          <h2>Meet Our Team</h2>
          <div className='team-member'>
            <img src='path_to_image' alt='Team Member' />
            <h3>M.F.M Sarsam</h3>
            <p>Founder & Owner</p>
          </div>
        </div>
        <div className='values'>
          <h2>Our Values</h2>
          <p>At Italy Silver Choice, we believe in:</p>
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
          <p>We offer a wide range of jewelry including Bangle, Bracelet, Chain, Earrings, Necklace, Pendant, Ring. Our services include Gift Wrapping, Cleaning and Maintenance, Jewelry Repair.</p>
        </div>
      
       
        <div className='gallery'>
          <h2>Gallery</h2>
          <img src='src/Images/shop1' alt='Gallery Image' />
          <img src='src/Images/shop2' alt='Gallery Image' />
          <img src='src/Images/shop3' alt='Gallery Image' />
        </div>
        <div className='cta'>
          <h2>Visit Us</h2>
          <p>We invite you to explore our collection and experience the elegance of our jewelry. Visit us at Nittabuwa or browse our products online.</p>
        </div>
      </div>
    </section>
  );
}
