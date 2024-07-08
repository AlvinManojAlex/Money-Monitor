import { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

import Navbar from './components/Navbar'
import Input from './components/Input'

import './App.css';

function App() {

  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = async () => {

    try{
      const docRef = await addDoc(collection(db, 'expenses'), {
        expense_type: expenseType,
        amount: parseFloat(amount),
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
        <Input placeholder='Type of expense' value={expenseType} onChange={(e) => setExpenseType(e.target.value)} />
        <Input placeholder='Amount spent' value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className='submit-button' onClick={handleAddExpense}>Add Expense</button>
    </div>
    
  );
}

export default App;