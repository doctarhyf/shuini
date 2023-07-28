import React, { useEffect, useState } from "react";


import * as classes from '../helpers/classes'
import { NumDaysInMonth, GetMonthName } from "../helpers/funcs";
import { UpdateRecord, LoadTeamsRoulement } from '../db/sb.js'
import { COLLECTIONS_NAMES } from "../helpers/flow";

function ShiftSelector(props){

  const [v, setV] = useState('-')
  const { team, oldShift, day, onShiftChange } = props;

  useEffect(() => {

    setV(oldShift)

  } , [])

  function onChange(e){
    
    let newShift =  e.target.value;

    setV(newShift)

    onShiftChange(day, team, newShift, oldShift)
    
  }

  function init(){
    setV('-')
  }

  return (
    <>
      {/* <input onChange={onChange} type="text" maxLength={2} value={v} className={`text-white  ${classes.clFormTextInput} text-xs `}/> */}
      <select value={v} onChange={onChange} className={`text-white  ${classes.clbtnsm} bg-slate-400 text-xs `} >
        <option>-</option>
        <option>M</option>
        <option>P</option>
        <option>N</option>
        <option>R</option>
      </select>
    </>
  )
}

export default function PageRoulementGeneral(props){

    const daysOfMonth = new Array(31).fill(0);

    const [isEditingMode, setEditingMode] = useState(false);
    const [teamsRoulement, setTeamsRoulement] = useState("A,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R:B,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,M,M:C,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,M,M,P,P:D,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,M,M,P,P,N,N")

    useEffect(() => {
      

      loadTeamsRoulement();

      

    },[])

    async function loadTeamsRoulement(){
      const d = await LoadTeamsRoulement()
      
      setTeamsRoulement(d);

      
    }

    function updateShift(day, team, newShift, arr){

      const schedPattern = 'MMPPNNRRMMPPNNRR';
      let finalArr = arr;
      finalArr[day+1] = newShift;

      //console.log('fa', finalArr)

      //return arr;
      const testArr = finalArr.slice(1,4);

      const first2areEqual = (testArr[0] === testArr[1] && testArr[1] !== testArr[2])
      const second2areEqual = (testArr[1] === testArr[2] && testArr[1] !== testArr[0])

      console.log('first2areEqual', first2areEqual, 'second2areEqual', second2areEqual)
      
      if(first2areEqual || second2areEqual){
        

        const threeDaysStr = testArr.join('');
        const idx = schedPattern.indexOf(threeDaysStr);
        
        if(idx === -1){
          console.error('Please follow proper sched format "MMPPNNRR" -> "', threeDaysStr, '"');
          return arr;
        }

        console.info('ready to generate schedule "', threeDaysStr ,'" => "', schedPattern,'" ...\nPattern index : ', idx)
        
        
        let newSchedulePattern = threeDaysStr + schedPattern.split(threeDaysStr)[1] ;
        newSchedulePattern = newSchedulePattern.length === 8 ? newSchedulePattern : newSchedulePattern.substring(0,8); 
        //console.log('newSchedulePattern', newSchedulePattern, ' len -> ', newSchedulePattern.length)
        newSchedulePattern =  newSchedulePattern.repeat(4).substring(0, NumDaysInMonth());
        console.log('schedPattern', schedPattern, 'newSchedulePattern', newSchedulePattern);
        console.log('sched len ', newSchedulePattern.length);

        finalArr =  (team + newSchedulePattern).split('');
        
        console.log(finalArr) ;
        

        return finalArr;
      }

      console.error('day 1 must be eq to day 2 and both diff to day 3, or 2 = 3 and both diff to day 1')

      return arr;
    }

    function onShiftChange(day, team, newShift, oldShift ){

      const teamsLetters = ['A','B','C','D'];
      const selectedTeamIndex = teamsLetters.indexOf(team);

      let teamsArray = teamsRoulement.split(':');
      
      let selectedTeamString = teamsArray[selectedTeamIndex];
      let selectedTeamArray = selectedTeamString.split(',')

      console.log('selectedTeamArray', selectedTeamArray)

      selectedTeamArray = updateShift(day, team, newShift, selectedTeamArray); // adjust roulement
      selectedTeamString = selectedTeamArray.join(',')

      teamsArray[selectedTeamIndex] = selectedTeamString;
      let teamsString = teamsArray.join(':');

      setTeamsRoulement(teamsString);
    }

    function onSaveSched(e){
      e.preventDefault();

      const id = 1;
      const collection = COLLECTIONS_NAMES.ROULEMENT;
      const res = UpdateRecord(id, collection, {data:teamsRoulement});

     //console.log(teamsRoulement)

      setEditingMode(false)
    }

    function onInitSched(e){
      e.preventDefault();

      const yes = confirm('are you sure?');

      if(!yes) return;

      let initSchedStr = '';
      let initSchedArr ;
      
      const teamInitSched = new Array(NumDaysInMonth()).fill('-');

      //console.log(teamInitSched)

      initSchedArr = [
        Array.from(teamInitSched),
        Array.from(teamInitSched),
        Array.from(teamInitSched),
        Array.from(teamInitSched)];

      initSchedArr[0][0] = 'A';
      initSchedArr[1][0] = 'B';
      initSchedArr[2][0] = 'C';
      initSchedArr[3][0] = 'D';

      initSchedStr = initSchedArr.join(':');

      console.log('initSchedStr',initSchedStr)
      setTeamsRoulement(initSchedStr)
      
    }

    return ( 
      <>
        {  <div>
          Edit
          <input type="checkbox" value={isEditingMode} checked={isEditingMode} onChange={e => setEditingMode(e.target.checked)} />
          {
            isEditingMode && <div>
              <button onClick={onSaveSched} className={classes.clbtnsm}>SAVE</button>
              <button onClick={onInitSched} className={classes.clbtnsm}>INITIALIZE ROULEMENT</button>
            </div>
          }
        
        </div>
        }
        <table>
          
          <tr>
            <td className={classes.clTableTr}>Eq.</td>
            {
              daysOfMonth.map((it, i) => <td key={i} className={classes.clTableTrSm}>{i+1}</td> )
            }
          </tr>

          {
            teamsRoulement.split(':').map((teamRoulement, i) => 
            <tr>
              <td key={i} className={classes.clTableTr}>{teamRoulement[0]}</td>
              {
                teamRoulement.replaceAll(',','').split('').slice(1).map((shift, i) => <td key={i} className={classes.clTableTrSm}>

                    {i < 3 && isEditingMode ? <ShiftSelector day={i} team={teamRoulement[0]} oldShift={shift} onShiftChange={onShiftChange} /> : shift}

                </td> )
              }
          </tr>)
          }
      
         
        </table>
         { isEditingMode && <div className={`text-sm style-italic text-red-white bg-red-500 p-2 rounded-md mt-2`}>
          <p>Set the 3 first days of ant team and the rest of the days will be automaticlly generated for you!</p>
        </div> }
      </>
    )
  }