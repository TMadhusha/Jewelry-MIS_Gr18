import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Financebar from '../components/Financebar';

export default function EditPurchase() {
    let navigate=useNavigate();

    const {purchaseId}=useParams();
    console.log('Purchase ID:',purchaseId)
    
    const [purchase,setPurchase]=useState({
        date:"",
        sup_id:"",
        item_id:"",
        description:"",
        unitPrice:"",
        quantity:"",
        tax:"",
        cost:"",
        receipt:null,
        receiptPreview:null,
        existingReceipt: null 
    });

    const [errors, setErrors] = useState({}); // State to hold validation errors
    const [supplier,setSupplier]= useState([]);
    const [inventory, setInventory]=useState([]);
    const {date,sup_id,item_id,description,unitPrice,quantity,tax,cost,receiptPreview,existingReceipt}=purchase;

    const loadSupplier = async() =>{
        const result=await axios.get("http://localhost:8080/get-supplier");
        setSupplier(result.data);
    }

    const loadInventory = async() =>{
        const result=await axios.get("http://localhost:8080/inventory");
        setInventory(result.data);
    }

    const loadPurchase = async() =>{
        try {
            const result = await axios.get(`http://localhost:8080/getPurchaseById/${purchaseId}`);

        // Destructure necessary fields from result.data
        const { date, supplier, inventory, description, unitPrice, quantity, tax, cost, receipt } = result.data;

        // Extract sup_id and item_id from nested objects
        const sup_idFromData = supplier ? supplier.sup_id : "";
        const item_idFromData = inventory ? inventory.item_id : "";// Adjust according to your API response structure

        setPurchase({
            date,
            sup_id: sup_idFromData,
            item_id: item_idFromData,
            description,
            unitPrice,
            quantity,
            tax,
            cost,
            receipt,
            existingReceipt: receipt // Store the existing receipt image
        });
        } catch (error) {
            window.alert("Error loading purchase");
            console.log("Error loading purchase", error);
        }
    }

    useEffect(()=>{
        loadInventory();
        loadSupplier();
        loadPurchase();
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
        if (!date.trim()) {
          window.alert("Date is required");
          return false;
        } else if (!/^\d{4}\-\d{2}\-\d{2}$/.test(date)) {
          window.alert("Date should be in the format 'yyyy/mm/dd'");
          return false;
        }
    
        if(!String(sup_id).trim()){
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
    
        if(!String(unitPrice).trim()){
            window.alert("Unit Price is required");
            isValid=false;
        }

        if(!String(quantity).trim()){
            window.alert("Quantity is required")
            isValid=false;
        }

        if(!String(tax).trim()){
            window.alert("Tax is required")
            isValid=false;
        }

        if(!String(cost).trim()){
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
            formData.append("date", purchase.date);
            formData.append("sup_id", purchase.sup_id);
            formData.append("item_id",purchase.item_id);
            formData.append("description", purchase.description);
            formData.append("unitPrice", purchase.unitPrice);
            formData.append("quantity",purchase.quantity);
            formData.append("tax",purchase.tax);
            formData.append("cost",purchase.cost);
            if (purchase.receipt) {
                formData.append('receipt', purchase.receipt);
            }
            // formData.append("receipt", new Blob([new Uint8Array(receipt)], { type: "receipt/jpeg" }));
               
            await axios.put(`http://localhost:8080/updatePurchaseById/${purchaseId}`,formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            window.alert("Purchase updated");
            navigate("/inventoryPurchase");
        }catch (error) {
            console.error("Error updating purchase:", error);
            window.alert("Failed to update purchase. Please try again.");
        }
    } 
}

  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <h2>Edit Purchase</h2>
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
                                    ) : existingReceipt ? (
                                        <img src={`data:image/jpeg;base64,${existingReceipt}`} alt="Existing Receipt" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    ) : (
                                        <span>No Receipt</span>
                                    )}
                                </td>
                                <td><input type='file' name='receipt' onChange={(e) => onChangeInput(e)}/></td>
                            </tr>
                            <tr className='button-container'>
                                <td><button className='btn' type='submit'>Edit</button></td>
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
