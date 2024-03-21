import React from 'react';

const CustomerForm = ({ onCancel }) => {
    return (
        <form>
            <label>
                ID:
                <input type="text" name="id" />
            </label>
            <label>
                First Name:
                <input type="text" name="firstName" />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" />
            </label>
            <label>
                Date of Birth:
                <input type="date" name="dob" />
            </label>
            <label>
                Email:
                <input type="email" name="email" />
            </label>
            <label>
                Phone Number:
                <input type="tel" name="phoneNumber" />
            </label>
            <label>
                Address:
                <input type="text" name="address" />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default CustomerForm;
