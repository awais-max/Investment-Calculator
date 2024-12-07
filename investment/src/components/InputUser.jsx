import { useState } from 'react';
import ApexChart from './ApexChart'


export default function InputUser() {
    const [arrayNum, setArrayNum] = useState([{
      numYear: 5,
      investAmount: 1000,
      addAmount: 10,
      totaladdAmount: 10,
      rateAmount: 5,
      totalrateAmount: 5,
      totalBalance: 115
    }
    ]);
  
    function changeHandler(inputIdentifier, newValue) {
      setArrayNum(prevNum => {
        return prevNum.map(item => {
          if (item[inputIdentifier] !== undefined) {
            item[inputIdentifier] = newValue;
          }
          return item;
        })
      })
      tableArray();
    }
  
    function tableArray() {
      let years = arrayNum[0].numYear;
      let investAmount = arrayNum[0].investAmount;
      let addInvest = arrayNum[0].addAmount;
      let rate = arrayNum[0].rateAmount;
      let totaladdAmount = 0;
      let totalrateAmount = 0;
      let totalBalance = investAmount;
  
      setArrayNum([]); // Clear the array before recalculating
  
      for (let i = 0; i < years; i++) {
        const todayDate = 2024 + i;
        const addAmount = addInvest;
        const rateAmount = (rate / 100) * (totalBalance);
        const newInvestAmount = investAmount + addAmount;
        const newTotaladdAmount = totaladdAmount + addAmount;
        const newTotalrateAmount = totalrateAmount + rateAmount;
        const newTotalBalance = newInvestAmount + newTotaladdAmount + newTotalrateAmount;
  
        setArrayNum((prevArray) => [...prevArray, {
          numYear: todayDate,
          investAmount: newInvestAmount,
          addAmount: addAmount,
          totaladdAmount: newTotaladdAmount,
          rateAmount: rateAmount,
          totalrateAmount: newTotalrateAmount,
          totalBalance: newTotalBalance
        }]);
  
        investAmount = newInvestAmount;
        totaladdAmount = newTotaladdAmount;
        totalrateAmount = newTotalrateAmount;
        totalBalance = newTotalBalance;
      }
  
      console.log(arrayNum);
    }
  
  return (
    <div>
      <div className="InputContainer">
        <div className="InputBox">
          <label htmlFor="inputname">Starting Amount</label>
          <input type="number" placeholder="Enter Amount" value={arrayNum.investAmount} onChange={(e) => changeHandler("investAmount",e.target.value)} />
        </div>

        <div className="InputBox">
          <label htmlFor="inputname" className=''>Additional Contribution</label>
          <input type="number" placeholder="$100" value={arrayNum.addAmount} onChange={(e) => changeHandler("addAmount",e.target.value)} />
        </div>

        <div className="InputBox">
          <label htmlFor="inputname">Return Rate</label>
          <input type="number" placeholder="5%" value={arrayNum.rateAmount} onChange={(e) => changeHandler("rateAmount",e.target.value)} />
        </div>

        <div className="InputBox">
          <label htmlFor="inputname">Years to Grow:</label>
          <input type="number" placeholder="10" value={arrayNum.numYear} onChange={(e) => changeHandler("numYear",e.target.value)}   />
        </div>

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