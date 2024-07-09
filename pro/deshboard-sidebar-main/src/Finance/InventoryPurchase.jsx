import React, { useEffect, useState } from 'react'
import Financebar from '../components/Financebar'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function InventoryPurchase() {
    const [purchase, setPurchase]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const loadPurchase = async() =>{
        try{
            const result=await axios.get("http://localhost:8080/getPurchase");
            setPurchase(result.data);
        }catch(error){
            window.alert("Error loading purchases");
            console.log("Error loading purchases",error);
        }
    }

    useEffect(()=>{
        loadPurchase();
    },[]);

    const handleSearchInputChange=(e)=>{
        setSearchQuery(e.target.value);
    }

    const filteredPurchase = purchase.filter(purchase => {
        return (
          purchase &&
          (purchase.date?.toLowerCase().includes(searchQuery.toLowerCase())||
           purchase.sup_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           purchase.item_id?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        );
      });

      if (searchQuery.trim() !== '' && filteredPurchase.length === 0) {
        alert("No search results found");
      }

      const deletePurchase = async(purchaseId) =>{
        const confirmDelete = window.confirm("Do you want to delete this purchase?");
        if(confirmDelete){
          try{
            await axios.delete(`http://localhost:8080/deletePurchase/${purchaseId}`)
            loadPurchase();
          }catch(error){
            window.alert("The purchase cannot be deleted...!")
          }
        }
      }

  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <div className='main-title'>
                    <h2>Purchases</h2>
                </div>
                <div className='container'>
                    <div style={{marginRight:"450px",marginTop:"10px"}}>
                        <Link className='btn' to={"/addNewPurchase"}>Add New Purchase</Link>
                    </div>
                    <div className='searchAdd-container section'>
                        <div className='search-bar-container'>
                            <FaSearch className='search-icon' />
                            <input type='text' placeholder='Search here...' className='search-input' value={searchQuery} onChange={handleSearchInputChange}/>
                        </div>
                    </div>
                </div>
                <div className='table-container'>
                    <table class='table'>
                        <thead className='tb-head'>
                            <tr>
                                <th scope="col">Purchase ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Supplier ID</th>
                                <th scope="col">Item Id</th>
                                <th scope='col'>Description</th>
                                <th scope='col'>Unit Price</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Tax</th>
                                <th scope='col'>Cost</th>
                                <th scope="col">Receipt</th>
                                <th scope='col' colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody className='tb-body'>
                        { 
                                filteredPurchase.map((purchase,index)=>(
                                    <tr key={index} className='tb-tr'>
                                        <td>{purchase.purchaseId}</td>
                                        <td>{purchase.date}</td>
                                        <td>{purchase.supplier.sup_id}</td>
                                        <td>{purchase.inventory.item_id}</td>
                                        <td>{purchase.description}</td>
                                        <td>{purchase.unitPrice}</td>
                                        <td>{purchase.quantity}</td>
                                        <td>{purchase.tax}</td>
                                        <td>{purchase.cost}</td>
                                        <td><img src={`data:image/jpeg;base64,${purchase.receipt}`} alt="No Receipt" style={{height:"75px", width:"75px"}} /></td>
                                        <td><Link className='small-button'to={`/editPurchase/${purchase.purchaseId}`}>Edit</Link></td>
                                        <td><button className='small-button' onClick={()=>deletePurchase(purchase.purchaseId)}>Delete</button></td>  
                                    </tr>
                                ))
                             }
                        </tbody>
                    </table>
                </div>
            </div>
        </Financebar>
    </div>
  )
}
