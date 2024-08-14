import React, { useEffect, useState } from 'react'
import Financebar from '../components/Financebar'
import { Link, useNavigate } from 'react-router-dom'
import Supplier from '../pages/Supplier';
import Inventory from '../pages/Inventory';
import axios from 'axios';

export default function AddNewPurchase() {
    let navigate=useNavigate();

    //Get the current date
    const getCurrentDate = () =>{
        const date = new Date();
        const year = date.getFullYear();
        const month= String(date.getMonth() + 1).padStart(2, '0');
        const day= String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const [purchase,setPurchase]=useState({
        date:getCurrentDate(),
        sup_id:"",
        item_id:"",
        description:"",
        unitPrice:"",
        quantity:"",
        tax:"",
        cost:"",
        receipt:null,
        receiptPreview:null
    });

    const [errors, setErrors] = useState({}); // State to hold validation errors
    const [supplier,setSupplier]= useState([]);
    const [inventory, setInventory]=useState([]);
    const {date,sup_id,item_id,description,unitPrice,quantity,tax,cost,receipt,receiptPreview}=purchase;

    const loadSupplier = async() =>{
        const result=await axios.get("http://localhost:8080/get-supplier");
        setSupplier(result.data);
    }

    const loadInventory = async() =>{
        const result=await axios.get("http://localhost:8080/inventory");
        setInventory(result.data);
    }

    useEffect(()=>{
        loadInventory();
        loadSupplier();
    },[]);

    const onChangeInput = (e) => {
        if (e.target.name === "receipt") {
            const file = e.target.files[0];
            setPurchase({
                ...purchase,
                receipt: file,
                receiptPreview: URL.createObjectURL(file), // Create a URL for the image preview
            });
        } else {
            setPurchase({ ...purchase, [e.target.name]: e.target.value });
        }
      };

      const validateForm = () => {
        let errors = {};
        let isValid = true;
    
        // Validation for date
        if (!purchase.date.trim()) {
          window.alert("Date is required");
          return false;
        } else if (!/^\d{4}\-\d{2}\-\d{2}$/.test(purchase.date)) {
          window.alert("Date should be in the format 'yyyy/mm/dd'");
          return false;
        }
    
        if(!sup_id.trim()){
            window.alert("Supplier ID is required")
            isValid=false;
        }

        if(!item_id.trim()){
            window.alert("Item ID is required")
            isValid=false;
        }
    
        if(!description.trim()){
            window.alert("Description is required");
            isValid=false
        }
    
        if(!unitPrice.trim()){
            window.alert("Unit Price is required");
            isValid=false;
        }

        if(!quantity.trim()){
            window.alert("Quantity is required")
            isValid=false;
        }

        if(!tax.trim()){
            window.alert("Tax is required")
            isValid=false;
        }

        if(!cost.trim()){
            window.alert("Type is required")
            isValid=false;
        }
    
        setErrors(errors);
        return isValid;
    }

    useEffect(() => {
        // Calculate price before tax whenever unitPrice or quantity changes
        const priceBeforeTax = (parseFloat(unitPrice) || 0) * (parseInt(quantity) || 0);

        // Calculate cost after tax whenever priceBeforeTax or tax changes
        const costAfterTax = priceBeforeTax * (1 + (parseFloat(tax) || 0));
        setPurchase(prevState => ({
            ...prevState,
            cost: costAfterTax.toFixed(2)
        }));
    }, [unitPrice, quantity, tax]);

    const onSubmit= async(e) =>{
       e.preventDefault();
    
      if(validateForm()){
        try{
            const formData=new FormData();
            formData.append("date", date);
            formData.append("sup_id", sup_id);
            formData.append("item_id",item_id);
            formData.append("description", description);
            formData.append("unitPrice", unitPrice);
            formData.append("quantity",quantity);
            formData.append("tax",tax);
            formData.append("cost",cost);
            formData.append("receipt", receipt);
            // formData.append("receipt", new Blob([new Uint8Array(receipt)], { type: "receipt/jpeg" }));
               
            await axios.post("http://localhost:8080/addPurchase",formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            window.alert("Purchase added");
            navigate("/inventoryPurchase");
        }catch (error) {
            console.error("Error adding purchase:", error);
            window.alert("Failed to add purchase. Please try again.");
        }
    } 
}

  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <h2>New Purchase</h2>
                <br/>
                <div className='margin'>
                    <form className='form' onSubmit={(e) => onSubmit(e)}>
                        <table>
                            <tr>
                                <th>Date</th>
                                <td><input type='date' name='date' value={date} onChange={(e) => onChangeInput(e)}/></td>
                                {errors.date && <span className="error">{errors.date}</span>}
                            </tr>
                            <tr>
                                <th>Supplier Id</th>
                                <td>
                                    <select name='sup_id' value={sup_id} onChange={(e) => onChangeInput(e)}>
                                        <option value=''>Select Supplier</option>
                                        {supplier.map((supplier) => (
                                            <option key={supplier.sup_id} value={supplier.sup_id}>
                                                {supplier.name} ({supplier.sup_id})
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                {errors.sup_id && <span className="error">{errors.sup_id}</span>}
                            </tr>
                            <tr>
                                <th>Item Id</th>
                                <td>
                                <select name='item_id' value={item_id} onChange={(e) => onChangeInput(e)}>
                                    <option value=''>Select Item</option>
                                    {inventory.map((inventory) => (
                                        <option key={inventory.item_id} value={inventory.item_id}>
                                            {inventory.name} ({inventory.item_id})
                                        </option>
                                    ))}
                                </select>
                                </td>
                                {errors.item_id && <span className="error">{errors.item_id}</span>}
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td><input type='text' name='description' value={description} onChange={(e) => onChangeInput(e)} placeholder='Description'/></td>
                                {errors.description && <span className="error">{errors.description}</span>}
                            </tr>
                            <tr>
                                <th>Unit price</th>
                                <td><input type='text' name='unitPrice' value={unitPrice} onChange={(e) => onChangeInput(e)} placeholder='Unit price'/></td>
                            </tr>
                            <tr>
                                <th>Quantity</th>
                                <td><input type='number' name='quantity' value={quantity} onChange={(e) => onChangeInput(e)} placeholder='Quantity'/></td>
                            </tr>
                            <tr>
                                <th>Price Before Tax </th>
                                <td><input type='text' name='price' value={(unitPrice * quantity).toFixed(2)} readOnly placeholder='Price Before Tax'/></td>
                            </tr>
                            <tr>
                                <th>Tax value</th>
                                <td><input type='text' name='tax' value={tax} onChange={(e) => onChangeInput(e)} placeholder='Tax'/></td>
                            </tr>
                            <tr>
                                <th>Total Cost after Tax</th>
                                <td><input type='text' name='cost' value={cost} readOnly onChange={(e) => onChangeInput(e)} placeholder='Cost after Tax'/></td>
                            </tr>
                            <tr>
                                <td>
                                    {receiptPreview ? (
                                        <img src={receiptPreview} alt="Receipt Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    ) : (
                                            <span>No Receipt</span>
                                    )}
                                </td>
                                <td><input type='file' name='receipt' onChange={(e) => onChangeInput(e)}/></td>
                            </tr>
                            <tr className='button-container'>
                                <td><button className='btn' type='submit'>Add</button></td>
                                <td><Link className='btn' to={'/inventoryPurchase'} >Cancel</Link></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </Financebar>
    </div>
  )
}
