import React, { PureComponent } from 'react';

export default class Bangle extends PureComponent {
  render() {
    return (
      <div className='pageStyle'>
       <div className='bangleContainer'>
          <div className='bangleImage'></div>
          <div className='bangleText'>Bangle</div>
        </div>
      </div>
    );
  }
}
