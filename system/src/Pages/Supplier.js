import React, { PureComponent } from 'react'

import Navigation from '../components/Navigation';
import Content from '../components/Content';
import Footer from '../components/Footer';
import SupplierCx from '../components/SupplierCx';

export default class Supplier extends PureComponent {
  render() {
    return (
      <div>
       <Navigation />
       <SupplierCx />
       <Footer />
      </div>
    )
  }
}
