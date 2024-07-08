import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

function Analysis() {
    return(
        <div className='App'>
            <Navbar rightText={'Add Expense'} rightLink='/' />
            <div className='center-div'>
                <p className='center-content'>Analysis page</p>
            </div>
        </div>
    )
}

export default Analysis;