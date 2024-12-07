import { useState } from 'react';
import ApexChart from './ApexChart'
import Pie from './Pie'


export default function Input() {
  const [numInvest, setInvest] = useState(1000);
  const [addInvest, setaddInvest] = useState(10);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [arrayNum, setArrayNum] = useState([]);

  function startInvestment(e) {
    setInvest(parseInt(e.target.value));
  }

  function AddInvestment(e) {
    setaddInvest(parseInt(e.target.value));
  }

  function returnRate(e) {
    setRate(parseInt(e.target.value));
  }

  function yearsNum(e) {
    setYears(parseInt(e.target.value));
  }

  function getUpdatedState() {
    return {
      years: years,
      addInvest: addInvest,
      rate: rate,
      numInvest: numInvest,
    };
  }

  function tableArray() {
    const { years, addInvest, rate, numInvest } = getUpdatedState();
    let investAmount = numInvest;
    let totaladdAmount = 0;
    let totalrateAmount = 0;
    let totalBalance = numInvest;
  
    setArrayNum([]); // Clear the array before recalculating
  
    for (let i = 0; i < years; i++) {
    
      const todayDate = 2024 + i;
      const addAmount = addInvest;
      const rateAmount = (rate / 100) * (totalBalance);
      const newInvestAmount = investAmount + addAmount;
      const newTotaladdAmount = totaladdAmount + addAmount;
      const newTotalrateAmount = totalrateAmount + rateAmount;
      const newTotalBalance = numInvest + newTotaladdAmount + newTotalrateAmount;
  
      Math.floor(setArrayNum((prevArray) => [...prevArray, {
        numYear: todayDate,
        investAmount: numInvest,
        addAmount: addAmount,
        totaladdAmount: newTotaladdAmount,
        rateAmount: rateAmount,
        totalrateAmount: newTotalrateAmount,
        totalBalance: newTotalBalance
      }]));
  
      investAmount = newInvestAmount;
      totaladdAmount = newTotaladdAmount;
      totalrateAmount = newTotalrateAmount;
      totalBalance = newTotalBalance;
    }
  
    console.log(arrayNum);
  }
  return (
    <div>
       <h1> Investment Return & Growth Calculator</h1>
       <p>It can show you how your initial investment, frequency of contributions and risk tolerance can all affect the way your money grows.</p>
      <div className="InputContainer">
        <div className="InputBox">
          <label htmlFor="inputname">Starting Amount</label>
          <input type="number" placeholder="Enter Amount" value={numInvest} onChange={startInvestment} />
        </div>

        <div className="InputBox">
          <label htmlFor="inputname" className=''>Additional Amount Annual</label>
          <input type="number" placeholder="$100" value={addInvest} onChange={AddInvestment} />
        </div>

        <div className="InputBox">
          <label htmlFor="inputname">Return Rate</label>
          <input type="number" placeholder="5%" value={rate} onChange={returnRate} />
        </div>

        <div className="InputBox">
          <label htmlFor="inputname">Years to Grow:</label>
          <input type="number" placeholder="10" value={years} onChange={yearsNum}  />
        </div>
        <button onClick={tableArray}>Calculate</button>
      </div>

      <div className="result">
        <h3>This investment will be worth: ${Math.floor(arrayNum[arrayNum.length - 1] ? arrayNum[arrayNum.length - 1].totalBalance : 0)}</h3>
      </div>
        <div className=' charts'>
            <ApexChart numArray={arrayNum}/>
  
        </div>
      <div id="tableContainer">
        <table>
          <tr>
            <th>Year</th>
            <th>Starting Amount</th>
            <th>Annual Contribution</th>
            <th>Total Contributions</th>
            <th>Interest Earned</th>
            <th>Total Interest Earned</th>
            <th>End Balance</th>
          </tr>

          {arrayNum.map((item) => (
            <tr>
              <td>{item.numYear}</td>
              <td>${item.investAmount}</td>
              <td>${item.addAmount}</td>
              <td>${item.totaladdAmount}</td>
              <td>${Math.floor(item.rateAmount)}</td>
              <td>${Math.floor(item.totalrateAmount)}</td>
              <td>${Math.floor(item.totalBalance)}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}