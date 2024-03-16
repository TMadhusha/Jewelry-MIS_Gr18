import React, { PureComponent } from 'react'

import Navigation from '../components/Navigation';
import Content from '../components/Content';
import Footer from '../components/Footer';
import MoreCx from '../components/MoreCx';

export default class More extends PureComponent {
  render() {
    return (
      <div>
       <Navigation />
       <MoreCx />
       <Footer />
      </div>
    )
  }
}
