import React from 'react';

const Delete = () => {
    return (
        <div>
            <div>
            <h1>Delete details</h1>
            </div>
            <div>
            <table>
                <form>
                    <tr>
                    <th><label>Employee ID: </label></th>
                    <td><input type='text' name='empid' value='empid'/></td>
                    </tr>
                    <tr>
                   <th><label>First Name: </label></th> 
                    <td><input type='text' name='fname' value='fname'/></td>
                    </tr>
                    <tr>
                    <th><label>Last Name: </label></th>
                    <td><input type='text' name='lname' value='lname'/></td>
                    </tr>
                    <tr>
                    <th><label>DOB: </label></th>
                    <td><input type='text' name='dob' value='dob'/></td>
                    </tr> 
                    <tr>
                    <th><label>Address: </label></th>
                    <td><input type='text' name='address' value='address'/></td>
                    </tr>  
                    <tr>
                    <label>NIC: </label>
                    <input type='text' name='nic' value='nic'/>
                    </tr>  
                    <tr>
                    <label>Email: </label>
                    <input type='text' name='email' value='email'/>
                    </tr> 
                    <tr>
                    <label>Phone No: </label>
                    <input type='text' name='phoneNo' value='phoneNo'/>
                    </tr> 
                    <tr>
                    <label>Role: </label>
                    <input type='text' name='role' value='role'/>
                    </tr>
                    <tr>
                    <label>Image: </label>
                    <input type='text' name='image' value='image'/>
                    </tr>                   
                </form>
                <tr>
                <td><button> Delete</button></td>
                <td><button>Cancel</button></td>
                </tr>
                </table>
            </div>
            
        </div>
    );
};

export default Delete;