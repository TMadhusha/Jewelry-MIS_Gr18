import React, { PureComponent } from 'react'

import Navigation from '../components/Navigation';
import ContentEm from '../components/Content';
import Footer from '../components/Footer';
import EmployeeCx from '../components/EmployeeCx';

export default class Employee extends PureComponent {
  render() {
    return (
      <div>
        <Navigation />
        <EmployeeCx />
        <Footer />
      </div>
    )
  }
}
