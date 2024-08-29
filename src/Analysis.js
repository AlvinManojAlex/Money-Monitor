import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './App.css';
import Navbar from './components/Navbar';

function Analysis() {

    const [expenses, setExpenses] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [housingData, sethousingData] = useState([]);
    const [groceryData, setGroceryData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [utilityData, setUtilityData] = useState([]);
    const [travelData, setTravelData] = useState([]);
    const [overallMonthlyData, setOverallMonthlyData] = useState([]);

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

            setPieChartData(chartData);

            // Data aggregation for rent
            const rentExpenses = expenses.filter(expense => expense.expense_type === 'Housing-related');
            
            const rentByMonth = rentExpenses.reduce((acc, expense) => {
                const { day, month, year } = expense;
                const date = new Date(year, month - 1, day);
                const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

                if (!acc[monthYear]){
                    acc[monthYear] = 0;
                }

                acc[monthYear] += expense.amount;
                return acc;
            }, {});

            const rentChartData = Object.keys(rentByMonth).map((key) => ({
                month: key,
                amount: rentByMonth[key],
            })).sort((a, b) => new Date(`01/${a.month}`) - new Date(`01/${b.month}`));

            sethousingData(rentChartData);

            // Data aggregation for grocery
            const groceryExpenses = expenses.filter(expense => expense.expense_type === 'Grocery');

            const groceryByMonth = groceryExpenses.reduce((acc, expense) => {
                const {day, month, year} = expense;
                const date = new Date(year, month - 1, day);
                const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

                if (!acc[monthYear]){
                    acc[monthYear] = 0;
                }

                acc[monthYear] += expense.amount;
                return acc;
            }, {});

            const groceryChartData = Object.keys(groceryByMonth).map((key) => ({
                month: key,
                amount: groceryByMonth[key],
            })).sort((a, b) => new Date(`01/${a.month}`) - new Date(`01/${b.month}`));

            setGroceryData(groceryChartData);

            // Data aggregation for food
            const foodExpenses = expenses.filter(expense => expense.expense_type === 'Food');
            
            const foodByMonth = foodExpenses.reduce((acc, expense) => {
                const {day, month, year} = expense;
                const date = new Date(year, month - 1, day);
                const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

                if (!acc[monthYear]){
                    acc[monthYear] = 0;
                }

                acc[monthYear] += expense.amount;
                return acc;
            }, {});

            const foodChartData = Object.keys(foodByMonth).map((key) => ({
                month: key,
                amount: foodByMonth[key],
            })).sort((a, b) => new Date(`01/${a.month}`) - new Date(`01/${b.month}`));

            setFoodData(foodChartData);

            // Data aggregation for utility
            const utilityExpenses = expenses.filter(expense => expense.expense_type === 'Utilities');

            const utilityByMonth = utilityExpenses.reduce((acc, expense) => {
                const {day, month, year} = expense;
                const date = new Date(year, month - 1, day);
                const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

                if (!acc[monthYear]){
                    acc[monthYear] = 0;
                }

                acc[monthYear] += expense.amount;
                return acc;
            }, {});

            const utilityChartData = Object.keys(utilityByMonth).map((key) => ({
                month: key,
                amount: utilityByMonth[key],
            })).sort((a, b) => new Date(`01/${a.month}`) - new Date(`01/${b.month}`));

            setUtilityData(utilityChartData);

            // Data aggregation for travel
            const travelExpenses = expenses.filter(expense => expense.expense_type === 'Travel');
            const travelByMonth = travelExpenses.reduce((acc, expense) => {
                const {day, month, year} = expense;
                const date = new Date(year, month - 1, day);
                const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

                if (!acc[monthYear]){
                    acc[monthYear] = 0;
                }

                acc[monthYear] += expense.amount;
                return acc;
            }, {});

            const travelChartData = Object.keys(travelByMonth).map((key) => ({
                month: key,
                amount: travelByMonth[key],
            })).sort((a, b) => new Date(`01/${a.month}`) - new Date(`01/${b.month}`));

            setTravelData(travelChartData);

            // Data aggregation for monthly spending
            const monthlyExpenses = expenses.reduce((acc, expense) => {
                const {day, month, year} = expense;
                const date = new Date(year, month - 1, day);
                const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

                if (!acc[monthYear]){
                    acc[monthYear] = 0;
                }

                acc[monthYear] += expense.amount;
                return acc;
            }, {});

            const monthlyChartData = Object.keys(monthlyExpenses).map((key) => ({
                month: key,
                amount: monthlyExpenses[key]
            })).sort((a, b) => new Date(`01/${a.month}`) - new Date(`01/${b.month}`));

            setOverallMonthlyData(monthlyChartData);

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

                {pieChartData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={400}>
                        <PieChart width={350} height={350}>
                            <Pie data={pieChartData} cx='50%' cy='50%' innerRadius={60} outerRadius={120} fill="#8884d8" paddingAngle={5} datakey='value'>
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                 ) : (
                    <p className='text-no-data'>No Data Available to Display.</p>
                )}
            
            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Utilities</h2>

                {utilityData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart width={500} height={300} data={utilityData} margin={{left: 10, top: 20, bottom: 10, right: 10}} >
                            <CartesianGrid strokeDasharray="3" />
                            <XAxis dataKey='month' padding={{left: 20, right: 10}} stroke='#ffffff' />
                            <YAxis stroke='#ffffff' />
                            <Tooltip />
                            <Line type='monotone' dataKey='amount' stroke='#FF5722' activeDot={{r: 5}} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className='text-no-data'>No Data Available to Display</p>
                )}

            
            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Grocery</h2>
                
                {groceryData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart width={500} height={300} data={groceryData} margin={{left: 10, top: 20, bottom: 10, right: 10}} >
                            <CartesianGrid strokeDasharray="3" />
                            <XAxis dataKey='month' padding={{left: 20, right: 10}} stroke='#ffffff' />
                            <YAxis stroke='#ffffff' />
                            <Tooltip />
                            <Line type='monotone' dataKey='amount' stroke='#FF5722' activeDot={{r: 5}} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className='text-no-data'>No Data Available to Display</p>
                )}

            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Housing-related</h2>

                {housingData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart width={500} height={300} data={housingData} margin={{left: 10, top: 20, bottom: 10, right: 10}} >
                            <CartesianGrid strokeDasharray="3" />
                            <XAxis dataKey='month' padding={{left: 20, right: 10}} stroke='#ffffff' />
                            <YAxis stroke='#ffffff' />
                            <Tooltip />
                            <Line type='monotone' dataKey='amount' stroke='#FF5722' activeDot={{r: 5}} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className='text-no-data'>No Data Available to Display</p>
                )}

            </div>
        
            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Food</h2>

                {foodData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart width={500} height={300} data={foodData} margin={{left: 10, top: 20, bottom: 10, right: 10}} >
                            <CartesianGrid strokeDasharray="3" />
                            <XAxis dataKey='month' padding={{left: 20, right: 10}} stroke='#ffffff' />
                            <YAxis stroke='#ffffff' />
                            <Tooltip />
                            <Line type='monotone' dataKey='amount' stroke='#FF5722' activeDot={{r: 5}} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className='text-no-data'>No Data Available to Display</p>
                )}

            </div>
            
            
            <div className='center-div'>
                <h2 className='center-subheading'>Monthly Expenses: Travel</h2>

                {travelData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart width={500} height={300} data={travelData} margin={{left: 10, top: 20, bottom: 10, right: 10}} >
                            <CartesianGrid strokeDasharray="3" />
                            <XAxis dataKey='month' padding={{left: 20, right: 10}} stroke='#ffffff' />
                            <YAxis stroke='#ffffff' />
                            <Tooltip />
                            <Line type='monotone' dataKey='amount' stroke='#FF5722' activeDot={{r: 5}} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className='text-no-data'>No Data Available to Display</p>
                )}

            </div>

            <div className='center-div'>
                <h2 className='center-subheading'>Overall Monthly Spending</h2>

                {overallMonthlyData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart width={500} height={300} data={overallMonthlyData} margin={{left: 10, top: 20, bottom: 10, right: 10}} >
                            <CartesianGrid strokeDasharray="3" />
                            <XAxis dataKey='month' padding={{left: 20, right: 10}} stroke='#ffffff' />
                            <YAxis stroke='#ffffff' />
                            <Tooltip />
                            <Line type='monotone' dataKey='amount' stroke='#FF5722' activeDot={{r: 5}} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className='text-no-data'>No Data Available to Display</p>
                )}
            </div>

        </div>
    )
}

export default Analysis;