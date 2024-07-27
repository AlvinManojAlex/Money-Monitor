import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './App.css';
import Navbar from './components/Navbar';

function Analysis() {

    const [expenses, setExpenses] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const querySnapshot = await getDocs(collection(db, 'expenses'));
            const expensesData = querySnapshot.docs.map((doc) => doc.data());
            setExpenses(expensesData);
        }

        fetchExpenses();
    }, [])

    useEffect(() => {
        if (expenses.length > 0){
            const expenseCategories = expenses.reduce((acc, expense) => {
                if (!acc[expense.expense_type]){
                    acc[expense.expense_type] = 0;
                }

                acc[expense.expense_type] += expense.amount;
                return acc;
            }, {});

            const chartData = Object.keys(expenseCategories).map((key) => ({
                name: key,
                value: expenseCategories[key],
            }));

            setData(chartData);
        }
    }, [expenses]);

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    return(
        <div className='App'>
            <Navbar rightText={'Add Expense'} rightLink='/' />

            <div className='center-div'>
                <p className='center-content'>Analysis page</p>
            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Overall Categorical Expenses</h2>
                <PieChart width={350} height={350}>
                    <Pie data={data} cx={175} cy={175} innerRadius={60} outerRadius={120} fill="#8884d8" paddingAngle={5} datakey='value' >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>


            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Rent</h2>
            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Grocery</h2>
            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Food</h2>
            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Utilities</h2>
            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Travel</h2>
            </div>


        </div>
    )
}

export default Analysis;