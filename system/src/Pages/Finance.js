import React, { PureComponent } from 'react'

import Navigation from '../components/Navigation';
import Content from '../components/Content';
import Footer from '../components/Footer';
import FinanceCx from '../components/FinanceCx';

export default class Finance extends PureComponent {
  render() {
    return (
      <div> 
       <Navigation />
       <FinanceCx />
       <Footer />
      </div>
    )
  }
}
