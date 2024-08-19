import React, { PureComponent } from 'react';
import axios from 'axios';

export default class RemoteCustomerProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phoneNo: '',
        username: '',
        password: '',
        dp: '',
      },
      dpPreview: '',  // To preview the profile picture
    };
  }

  componentDidMount() {
    const username = sessionStorage.getItem('username');  // Retrieve username from session storage
    if (username) {
      axios.get(`http://localhost:8080/remoteCustomersGetById/${username}`)  // Fetch customer details by username
        .then(response => {
          this.setState({ customer: response.data });
        })
        .catch(error => {
          console.error('There was an error fetching the customer data!', error);
        });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      customer: {
        ...prevState.customer,
        [name]: value
      }
    }));
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState(prevState => ({
      customer: {
        ...prevState.customer,
        dp: file
      },
      dpPreview: URL.createObjectURL(file)
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username } = this.state.customer;  // Get the username from state
    const formData = new FormData();
    Object.keys(this.state.customer).forEach(key => {
      formData.append(key, this.state.customer[key]);
    });

    axios.put(`http://localhost:8080/updateRemoteCustomers/${username}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        window.alert('Customer details updated successfully');
        // Clear the form fields
        this.setState({
          customer: {
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            phoneNo: '',
            username: '',  // This will be reset to empty, consider if this should be preserved
            // password: '',
            dp: '',
          },
          dpPreview: '',
        });
      })
      .catch(error => {
        console.error('There was an error updating the customer details!', error);
        alert('There was an error updating the customer details');
      });
  }

  render() {
    const { customer, dpPreview } = this.state;

    return (
      <section className='section'>
        <div className='profile-page'>
          <h1 className='RC'>Update Profile</h1>
          <form onSubmit={this.handleSubmit} className="profile-form">
            <div className="form-groupRC">
              <label>First Name:</label>
              <input
                type="text"
                name="firstname"
                value={customer.firstname}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-groupRC">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={customer.lastname}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-groupRC">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-groupRC">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={customer.address}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-groupRC">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNo"
                value={customer.phoneNo}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-groupRC">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={customer.username}
                onChange={this.handleChange}
                className="form-control"
                readOnly
              />
            </div>
            {/* <div className="form-groupRC">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={customer.password}
                onChange={this.handleChange}
                className="form-control"
              />
            </div> */}
            <div className="form-groupRC">
              <label>Profile Picture:</label>
              <input
                type="file"
                name="dp"
                onChange={this.handleFileChange}
                className="form-control-file"
              />
              {dpPreview && <img src={dpPreview} alt="Profile Preview" className="profile-preview" />}
            </div>
            <button type="submit" className="btn">Save Changes</button>
          </form>
        </div>
      </section>
    );
  }
}
