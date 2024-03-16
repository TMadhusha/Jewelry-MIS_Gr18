import React, { PureComponent } from 'react';
import Navigation from '../components/Navigation';
import ContentCx from '../components/ContentCx';
import Footer from '../components/Footer';

export default class Customer extends PureComponent {
  render() {
    return (
      <div>
        <Navigation />
        <ContentCx />
        <Footer />
      </div>
    );
  }
}

