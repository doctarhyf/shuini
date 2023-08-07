import React, { useEffect, useState } from "react"
import moment from "moment";
import { LoadMonthlyStats } from '../db/sb.js'
import Loading from "../comps/Loading.jsx";
moment.locale('fr')

import * as classes from '../helpers/classes'

const monthsNames = moment.months();

export default function PageStats(props){

    const years = new Array(100).fill(0);
    const currentYear = new Date().getFullYear();
    const currentMont = 'January';
   
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState({y:currentYear, m:currentMont});
    const [monthlyStats, setMonthlyStats] = useState([]);


    useEffect(() => {

      loadStats (); 

    }, [])

    function loadStats(){
      setLoading(true);
      const y = selectedMonth.y;
      const m = monthsNames.indexOf(selectedMonth.m);
     
      LoadMonthlyStats(y, m);
      setLoading(false);
    }

    function onChange(e){
      const n = e.target.name;
      const v = e.target.value;
      

      setSelectedMonth(old => ({ ...old, [n]:v }) )

    }

    function onFilter(e){
      e.preventDefault();
      loadStats();

    }
 
    return (
      <>
  
        <div>
          
          Mois : <select value={selectedMonth.y}  onChange={onChange} name="y" className={classes.clFormTextInput}>
            {
              years.map((it, i) => <option key={i}>{ currentYear - i }</option>)
            }
          </select>
          Annee : <select value={selectedMonth.m} onChange={onChange} name="m" className={classes.clFormTextInput}>
            {
              monthsNames.map((m, i) => <option key={i}>{ m  }</option>)
            }
          </select>
          <div>
          <button onClick={onFilter} className={classes.clbtnsm}>FILTER</button>
        </div>
        </div>
  
        <table>
          <tr><td className={classes.clTableTr} colSpan={6} align="center" >水泥车间包装奖金 － {selectedMonth.y}年{monthsNames.indexOf(selectedMonth.m) + 1}月</td></tr>			
          <tr>
            <td className={classes.clTableTr}>EQ./班组</td> <td className={classes.clTableTr}>T／吨</td> <td className={classes.clTableTr}>SAC／袋子</td> <td className={classes.clTableTr}>BN.／奖金</td> <td className={classes.clTableTr}>CDF／钢狼</td> <td className={classes.clTableTr}>USD</td>   
          </tr>
          <tr>
            <td className={classes.clTableTr}>A</td> <td className={classes.clTableTr}>87480</td> <td className={classes.clTableTr}>4374</td> <td className={classes.clTableTr}>695.5</td> <td className={classes.clTableTr}>695500</td> <td className={classes.clTableTr}>302.39</td>   
          </tr>		
          <tr>
            <td className={classes.clTableTr}>B</td> <td className={classes.clTableTr}>110030</td> <td className={classes.clTableTr}>5501.5</td> <td className={classes.clTableTr}>1035.6</td> <td className={classes.clTableTr}>1035600</td> <td className={classes.clTableTr}>450.26</td>   
          </tr>		
          <tr>
            <td className={classes.clTableTr}>C</td> <td className={classes.clTableTr}>92046</td> <td className={classes.clTableTr}>4602.3</td> <td className={classes.clTableTr}>666.75</td> <td className={classes.clTableTr}>666750</td> <td className={classes.clTableTr}>289.89</td>   
          </tr>		
          <tr>
            <td className={classes.clTableTr}>D</td> <td className={classes.clTableTr}>92531</td> <td className={classes.clTableTr}>4626.55</td> <td className={classes.clTableTr}>49.34</td> <td className={classes.clTableTr}>449300</td> <td className={classes.clTableTr}>195.35</td>   
          </tr>		
          <tr>
            <td className={classes.clTableTr}>Total</td> <td className={classes.clTableTr}>382087</td> <td className={classes.clTableTr}>19104.35</td> <td className={classes.clTableTr}>2847.15</td> <td className={classes.clTableTr}>2847150</td> <td className={classes.clTableTr}>1237.89</td>   
          </tr>
        </table>

        <Loading loading={loading} />
        
      </>
    )
  }