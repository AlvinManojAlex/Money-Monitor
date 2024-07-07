import Navbar from './components/Navbar'
import Input from './components/Input'

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar rightText='Analysis'/>
      <div className='center-div'>
        <p className='center-content'>Monitor and Analyze your expenses efficiently</p>
      </div>
        <Input placeholder='Type of expense' />
        <Input placeholder='Amount spent'/>
        <button className='submit-button'>Add Expense</button>
    </div>
  );
}

export default App;
