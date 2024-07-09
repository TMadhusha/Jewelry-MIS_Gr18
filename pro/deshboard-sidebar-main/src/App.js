import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Customer from './pages/Customer.jsx';
import Employee from './pages/Employee.jsx';
import Inventory from './pages/Inventory.jsx';
import Supplier from './pages/Supplier.jsx';
import Finance from './pages/Finance.jsx';
import More from './pages/More.jsx';
import Logout from './pages/Logout.jsx';
import AddEmp from './employee/AddEmp.jsx';
import EditEmp from './employee/EditEmp.jsx';
import AddInv from './Inventory/AddInv.jsx';
import EditInv from './Inventory/EditInv.jsx';
import Attendance from './employee/Attendance.jsx';
import AddAttendance from './employee/AddAttendance.jsx';
import EditAttendance from './employee/EditAttendance.jsx';
import Salary from './employee/Salary.jsx';
import AddSupplier from './Supplier/AddSupplier.jsx';
import UpdateSupplier from'./Supplier/UpdateSupplier.jsx'
import AdminLog from'./Login and Registeration/AdminLog.jsx'
import AdminRegisteration from'./Login and Registeration/AdminRegisteration.jsx'
import ManageCx from './customer/ManageCx.jsx';
import ManageOrder from './customer/ManageOrder.jsx';
import ManageReturns from './customer/ManageReturns.jsx';
import HandlePayments from './customer/HandlePayments.jsx';
import AddCx from './customer/AddCx.jsx';
import UpdateCx from './customer/UpdateCx.jsx';
import ViewOrder from './customer/ViewOrder.jsx';
import OnlinePayments from './customer/OnlinePayments.jsx';
import ManualPayments from './customer/ManualPayments.jsx';
import AddOrder from './customer/AddOrder.jsx';
import Email from './customer/Email.jsx';
import ViewSalary from './employee/ViewSalary.jsx';
import NewTransaction from './Finance/NewTransaction.jsx';
import ViewAttendance from './employee/ViewAttendance.jsx';
import ViewExpense from './Finance/ViewExpense.jsx';
import AddNewExpense from './Finance/AddNewExpense.jsx';
import EditExpense from './Finance/EditExpense.jsx';
import InventoryPurchase from './Finance/InventoryPurchase.jsx';
import AddNewPurchase from './Finance/AddNewPurchase.jsx';
import EditPurchase from './Finance/EditPurchase.jsx';
import ExpenseSummary from './Finance/ExpenseSummary.jsx';
import ExpenseChart from './Finance/ExpenseChart.jsx';

function App ()  {

  return ( 
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<AdminLog />} />
    <Route path="/dashboard" element={<Dashboard/>}/> 
    <Route path="/employee" element={<Employee />} />
    <Route path="/customer" element={<Customer />} />
    <Route path="/inventory" element={<Inventory />} />
    <Route path="/supplier" element={<Supplier />} />
    <Route path="/finance" element={<Finance />} />
    <Route path="/more" element={<More />} />
    <Route path="/addemp" element={<AddEmp/>}/>
    <Route path="/editemp" element={<EditEmp/>}/>
    <Route path="/addinventory" element={<AddInv/>}/>
    <Route path='/editinv/:item_id' element={<EditInv/>}/>
    <Route path="/editemp/:emp_id" element={<EditEmp />} />
    <Route path="/attendance" element={<Attendance/>}/>
    <Route path='/addAttendance/:empId' element={<AddAttendance/>}/>
    <Route path='/editAttendance/:att_id' element={<EditAttendance/>}/>
    <Route path='/viewAttendance' element={<ViewAttendance/>}/>
    <Route path='/salary' element={<Salary/>}/>
    <Route path="/add-supplier" element={<AddSupplier/>}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/UpdateSupplier/:sup_id" element={<UpdateSupplier />} />
    <Route path="/login" element={<AdminLog/>} />
    <Route path="/login-regsiteration" element={<AdminRegisteration />} />
    <Route path="/manage-customers" element={<ManageCx/>}/>
    <Route path="/manage-order" element={<ManageOrder/>}/>
    <Route path="/manage-returns" element={<ManageReturns/>}/>
    <Route path="/handle-payments" element={<HandlePayments/>}/>
    <Route path="/addcx" element={<AddCx />} />
    <Route path='/updatecx/:cus_id' element={<UpdateCx/>}/>
    <Route path="/vieworder" element={<ViewOrder />} />
    <Route path='/online-payments' element={<OnlinePayments />}/>
    <Route path='/manual-payments' element={<ManualPayments />}/>
    <Route path="/addorder" element={<AddOrder />} />
    <Route path="/Email" element={<Email/>} />
    <Route path="/viewSalary" element={<ViewSalary/>}/>
    <Route path="/newTransaction" element={<NewTransaction/>}/>
    <Route path="/viewExpense" element={<ViewExpense/>}/>
    <Route path="/addNewExpense" element={<AddNewExpense/>}/>
    <Route path="/editExpense/:expenseId" element={<EditExpense/>}/>
    <Route path='/inventoryPurchase' element={<InventoryPurchase/>}/>
    <Route path='/addNewPurchase' element={<AddNewPurchase/>}/>
    <Route path='/editPurchase/:purchaseId' element={<EditPurchase/>}/>
    <Route path='/expenseSummary' element={<ExpenseSummary/>}/>
    <Route path='/expenseChart' element={<ExpenseChart/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;