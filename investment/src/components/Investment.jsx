import { useState } from "react";

export default function tableArray({numInvest,addInvest,rate,years}) {
        const [tableArray,setTableArray] = useState([])
    let investAmount = numInvest;
    let totaladdAmount = 0;
    let totalrateAmount = 0;
    let totalBalance = numInvest;
  
    setTableArray([]); // Clear the array before recalculating
  
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

    return(
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

          {tableArray.map((item) => (
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
    )
  }