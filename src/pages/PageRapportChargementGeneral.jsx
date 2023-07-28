import React from "react";
import { useState } from "react";
import { Date2DateInput } from '../helpers/funcs'
import * as classes from '../helpers/classes'
import { GetListChargement } from '../db/sb.js'

 function RowRapportChargementGeneral(props){

   const {data} = props;
  
    return (
      <>
        <tr>
          <td className={classes.clTableTr}>{data.harrivee}</td><td className={classes.clTableTr}>{data.shift}</td><td className={classes.clTableTr}>{data.equipe}</td><td className={classes.clTableTr}>{data.sacs}</td><td className={classes.clTableTr}>{data.t}</td><td className={classes.clTableTr}>600</td><td className={classes.clTableTr}>{data.t - 600 < 0 ? 0 : data.t - 600}</td><td className={classes.clTableTr}>{data.t - 600 < 0 ? 0 : (data.t - 600)*1000}</td>
        </tr>
       {/*  <tr>
          <td className={classes.clTableTr}></td><td className={classes.clTableTr}>AP</td><td className={classes.clTableTr}>D</td><td className={classes.clTableTr}>14340</td><td className={classes.clTableTr}>717</td><td className={classes.clTableTr}>600</td><td className={classes.clTableTr}>117</td><td className={classes.clTableTr}>117000</td>
        </tr>
        <tr>
          <td className={classes.clTableTr}></td><td className={classes.clTableTr}>N</td><td className={classes.clTableTr}>C</td><td className={classes.clTableTr}>10880</td><td className={classes.clTableTr}>544</td><td className={classes.clTableTr}>600</td><td className={classes.clTableTr}>0</td><td className={classes.clTableTr}>0</td>
        </tr> */}
      </>
    )
  }
  
  export default function PageRapportChargementGeneral(props){
  
    let y = new Date().getUTCFullYear();
    let m = new Date().getMonth() ;
    let d = new Date().getDate();
    
  
    const [chargements, setChargements] = useState([]);
    const [dates, setDates] = useState({startDate: Date2DateInput(new Date(y,m,2)), endDate:Date2DateInput(new Date(y,m+1,1))})
  
    useState(() => {
  
      //setDatesToCurrentMonth();
      loadChargements();
  
  
    }, [])
  
    async function loadChargements(){
  
      //console.log('loading charg ...', dates)
  
      setChargements([])
      let data = await GetListChargement(dates.startDate, dates.endDate);
  
      setChargements(data);
      //console.log('items => \n', data)
      //console.log('charg => \n', data);
    }
  
    function onSearch(e){
      e.preventDefault();
      loadChargements();
      //console.log('dates => ', dates);
    }
  
    function onChange(e){
      e.preventDefault();
  
      const n = e.target.name;
      const v = e.target.value;
  
      setDates(dates => ({ ...dates, [n]:new Date(v).toISOString().split('.')[0] }))
  
      //console.log('dates => ', dates)
    }
  
    return (
      <>
      <div>
  
            <table>
              <tr>
                <td align='right'>
                 Start Date
                </td>
                <td>
                  <input value={dates.startDate} onChange={onChange} name='startDate' type='datetime-local' className={`text-white ${classes.clFormTextInput}`} />
                </td>
              </tr>
              <tr>
                <td align='right'>
                 End Date
                </td>
                <td>
                  <input value={dates.endDate} onChange={onChange} name='endDate' type='datetime-local' className={`text-white ${classes.clFormTextInput}`} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button className={classes.clbtnsm} onClick={onSearch}>Search</button>
                </td>
              </tr>
            </table>
  
      </div>
        <div>
          <table>
            <tr>
              <td className={classes.clTableTr} colSpan={8} align='center'>水泥车间包装奖金 － 7月</td>
            </tr>
            <tr>
              <td className={classes.clTableTr}>Date</td>
              <td className={classes.clTableTr}>Shift</td>
              <td className={classes.clTableTr}>EQ.</td>
              <td className={classes.clTableTr}>BAGS</td>
              <td className={classes.clTableTr}>T</td>
              <td className={classes.clTableTr}>TARGET</td>
              <td className={classes.clTableTr}>BONUS</td>
              <td className={classes.clTableTr}>CDF</td>
            </tr>
            {
              chargements.map((it,  i) => <RowRapportChargementGeneral key={i} data={it}  />)
            }
          </table>
        </div>
      </>
    )
  }