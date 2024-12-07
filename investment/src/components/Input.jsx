import { useState } from 'react'
import './Input.css'
import Table from './Table';

export default function Input(){
    const [numInvest,setInvest] = useState(0);
    const [addInvest,setaddInvest] = useState(0);
    const [rate,setRate] = useState(0);
    const [years,setYears] = useState(0);
    const [arrayNum,setArrayNum] =useState([])


    function startInvestment(e){
            setInvest(parseFloat(e.target.value));
    }

    function AddInvestment(e){
        setaddInvest(parseFloat(e.target.value));

    }
    
    function returnRate(e){
        setRate(parseFloat(e.target.value));
    }

    function yearsNum(e){
        setYears(parseFloat(e.target.value));
    }

function tableArray(years,addInvest,rate,numInvest){
    
    let numYear = years;
    let todayDate =2024;
    let investAmount = numInvest
    let addAmount = addInvest
    let totaladdAmount = addInvest
    let rateAmount= (rate/100) * (investAmount+totaladdAmount)
    let totalrateAmount = rateAmount;
    let totalBalance = investAmount + totaladdAmount + rateAmount

    for (let i = 0; i < numYear; i++) {
       
        setArrayNum((prevArray) => [...prevArray,{
        numYear :  todayDate,
        investAmount : investAmount,
        addAmount : addAmount,
        totaladdAmount : totaladdAmount,
        rateAmount : rateAmount,
        totalrateAmount : totalrateAmount,
        totalBalance : totalBalance
        }])
       todayDate++
        totaladdAmount +=addAmount;
        totalrateAmount +=rateAmount   
    }

    console.log(arrayNum);


}





return(

        <>

        <div className="InputContainer" >
            <div className="InputBox">
                <label htmlFor="inputname">Starting Amount</label>
            <input type="number" placeholder="Enter Amount" value={numInvest} onChange={startInvestment} />
            </div>

            <div className="InputBox">
                <label htmlFor="inputname" className=''>Additional Contribution</label>
            <input type="number" placeholder="$100"  value={addInvest} onChange={AddInvestment} />
            </div>

            <div className="InputBox">
            <label htmlFor="inputname">Return Rate</label>
            <input type="number" placeholder="5%" value={rate} onChange={returnRate} />
            </div>

            <div className="InputBox">
            <label htmlFor="inputname">Years to Grow:</label>
            <input type="number" placeholder="10" value={years} onChange={yearsNum} />
            </div>
            <button onClick={() => tableArray(years, addInvest, rate, numInvest)}>calculate</button>
        </div>

        <div className="result">
            <h3>This investment will be worth: ${numInvest}</h3>
        </div>
        
        <div id="tableContainer">
    <table>
    <tr>
    <th>Year</th>
    <th>Starting Amount</th>
    <th>Annual Contribution</th>
    <th>Total Contributions</th>
    <th> Interest Earned</th>
    <th>Total Interest
    Earned</th>
    <th>End
    Balance</th>
    </tr>

    {arrayNum.map((item)=>(<tr>
    <td>{item.numYear}</td>
    <td>${item.investAmount}</td>
    <td>${item.addAmount}</td>
    <td>${item.totaladdAmount}</td>
    <td>${item.rateAmount}</td>
    <td>${item.totalrateAmount}</td>
    <td>${item.totalBalance}</td>
    </tr>))}
    </table>
    </div>

        
        </>

    )

}