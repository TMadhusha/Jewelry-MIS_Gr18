import React, { PureComponent } from 'react'

import Navigation from '../components/Navigation';
import Content from '../components/Content';
import Footer from '../components/Footer';
import InventoryCx from '../components/InventoryCx';


export default class Inventory extends PureComponent {
  render() {
    return (
      <div>
       <Navigation />
       <InventoryCx />
       <Footer />
      </div>
    )
  }
}
