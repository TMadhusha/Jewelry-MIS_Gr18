import React from 'react';
//import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom'

import Navigation from '../components/Navigation';
import Content from '../components/Content';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navigation />
      <Content />
      <Footer />
    </div>
  );
}
