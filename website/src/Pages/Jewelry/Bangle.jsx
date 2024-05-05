import React, { PureComponent } from 'react';

export default class Bangle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minPrice: '',
      maxPrice: ''
    };
  }

  handleMinPriceChange = (event) => {
    this.setState({ minPrice: event.target.value });
  }

  handleMaxPriceChange = (event) => {
    this.setState({ maxPrice: event.target.value });
  }

  render() {
    const { minPrice, maxPrice } = this.state;
    const jewelryItems = [
      { id: 1, name: 'Gold Bangle 1', material: 'Gold', weight: 10, price: 50000 },
      { id: 2, name: 'Gold Bangle 2', material: 'Gold', weight: 10, price: 200000 },
      { id: 3, name: 'Gold Bangle 3', material: 'Gold', weight: 10, price: 150000 }
    ];
    const filteredItems = jewelryItems.filter(item => {
      const price = item.price;
      return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    });

    return (
      <div className='pageStyle'>
        <div className='bangleContainer'>
          <div className='bangleImage'></div>
          <div className='bangleText'>Bangle</div>
        </div>
        <div className='filterContainer'>
          <label htmlFor='minPrice'>Min Price:</label>
          <input type='number' id='minPrice' value={minPrice} onChange={this.handleMinPriceChange} />
          <label htmlFor='maxPrice'>Max Price:</label>
          <input type='number' id='maxPrice' value={maxPrice} onChange={this.handleMaxPriceChange} />
        </div>
        <div className='cardContainer'>
          {filteredItems.map(item => (
            <div className='jewelryCard' key={item.id}>
              <div className={'jewelryImage' + item.id}></div>
              <div className='jewelryDetails'>
                <p className='content'>Name: {item.name}</p>
                <p className='content'>Material: {item.material}</p>
                <p className='content'>Weight: {item.weight} grams</p>
                <p className='content'>Price: ${item.price}</p>
              </div>
              <div className='addToCartButton'>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
