import { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

import Navbar from './components/Navbar';
import Input from './components/Input';
import Dropdown from './components/Dropdown';

import './App.css';

function App() {

  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');

  const expenseOptions = ['Grocery', 'Recharge', 'Rent', 'Travel', 'Utilities', 'Food'];

  const handleAddExpense = async () => {

    if (expenseType === '' || amount === ''){
      alert('A field cannot be left blank.')
      return;
    }

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    try{
      const docRef = await addDoc(collection(db, 'expenses'), {
        expense_type: expenseType,
        amount: parseFloat(amount),
        day,
        month,
        year,
      });

      // Clear both the input fields
      setExpenseType('');
      setAmount('');

      console.log('Document written with ID: ', docRef.id);
    }

    catch (e){
      console.error('Error adding document: ', e);
    }

  };

  return (

    <div className="App">
      <Navbar rightText='Analysis' rightLink='/analysis' />
      <div className='center-div'>
        <p className='center-content'>Monitor and Analyze your expenses efficiently</p>
      </div>
        <Dropdown options={expenseOptions} value={expenseType} onChange={(e) => setExpenseType(e.target.value)} />
        <Input placeholder='Amount spent' value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className='submit-button' onClick={handleAddExpense}>Add Expense</button>
    </div>

  );
}

export default App;