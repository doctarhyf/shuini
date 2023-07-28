import React from "react";
import { useState, useEffect } from "react";
import { Date2DateInput, CalculateDateDifference } from '../helpers/funcs'
import * as classes from '../helpers/classes'
import { GetListChargement, UpdateRecord } from '../db/sb.js'
import { CHARGEMENT_STATES, COLLECTIONS_NAMES } from '../helpers/flow'

function RowRapportChargementJournalier(props){

    const { num, data, loadChargements } = props;

    
    

    async function updateChargementStatus(newStat){
     
      const resp = confirm('Are you sure you wanna update the record?')

      if(resp){
      data.status = newStat; //CHARGEMENT_STATES.CANCELLED;
      
      if(CHARGEMENT_STATES.DONE === data.status){
        data.hfincharg = Date2DateInput( new Date());

        const fin = new Date(data.hfincharg.split('.')[0]);
        const debut = new Date(data.harrivee.split('.')[0])

        data.dureecharg = CalculateDateDifference(debut, fin)

        console.log(data.dureecharg)

        return ;
      }

      const res = await UpdateRecord(data.id, COLLECTIONS_NAMES.CHARGEMENTS, data);
      
      
      
      console.log(res);

      loadChargements();
      }

    }
  
    return (
      <tr>
        <td className={classes.clTableTr}>{num + 1 + ' - ' + data.id}</td>
        <td className={classes.clTableTr}>{data.plaque}</td>
        <td className={classes.clTableTr}>{data.harrivee}</td>
        <td className={classes.clTableTr}>{data.hdebutcharg}</td>
        <td className={classes.clTableTr}>{data.hfincharg}</td>
        <td className={classes.clTableTr}>{ data.dureecharg }</td>
        <td className={classes.clTableTr}>{data.sacs}</td>
        <td className={classes.clTableTr}>.</td>
        <td className={classes.clTableTr}>{data.phonechauff}</td>
        <td className={classes.clTableTr}>{data.voie}</td>
        <td className={classes.clTableTr}>{data.status}</td>
        <td className={classes.clTableTr}>
          { CHARGEMENT_STATES.LOADING === data.status &&
          <div>
            <button onClick={e => updateChargementStatus(CHARGEMENT_STATES.DONE)} className={`p-1 m-0 ${classes.clbtnsm} `} >FIN CHARG.</button>
            <button onClick={e => updateChargementStatus(CHARGEMENT_STATES.CANCELLED)} className={`p-1 m-0 bg-red-600 hover:bg-red-500 ${classes.clbtnsm}`} >ANNULER</button>
          </div> }
        </td>
      </tr>
    )
  }
  
export default function PageRapportChargementJournalier(props){
  
    //const camions = new Array(20).fill(0);
  
    const [chargements, setChargements] = useState([]);
    const [dates, setDates] = useState({startDate:Date2DateInput(new Date()).split('T')[0]})
  
    useEffect(() => {
  
      loadChargements();
  
    }, [])
  
    async function loadChargements(date = undefined){
      
      
      const d = date === undefined ? dates.startDate : date;
      const data = await GetListChargement(d);
  
      setChargements(data);
    }
  
    function onSearch(e){
      e.preventDefault();
      setChargements([])
      loadChargements();
  
    }
  
    function onChange(e){
      e.preventDefault()
  
      const n = e.target.name;
      const v = e.target.value;
  
      setDates(inputs => ({ ...inputs, [n]:v}))
      loadChargements(v);
      
    }
  
  
    return (
      <>
  
        <div>
          <table>
            <tr>
              <td>Date</td>
              <td>
                <input  value={dates.startDate} type='date' className={`text-white ${classes.clFormTextInput}`} onChange={onChange} name='startDate' />
              </td>
            
             
              <td colSpan={2}>
                { true && <button className={`w-full  ${classes.clbtnsm} m-0 `} onClick={onSearch} >FILTER</button> }
              </td>
            </tr>
          </table>
        </div>
        <div>
          <table className='text-sm'>
            <tbody>
            <tr>
              <td className={classes.clTableTr} colSpan={12} align='center'>Suivi temps de chargement des camions</td>
            </tr>
            <tr>
              <td className={classes.clTableTr}>Num Camion</td>
              <td className={classes.clTableTr}>Plaque</td>
              <td className={classes.clTableTr}>Heure D'arrivee</td>
              <td className={classes.clTableTr}>Hr. Debut Charg.</td>
              <td className={classes.clTableTr}>Hr. Fin Charg.</td>
              <td className={classes.clTableTr}>Tps. Charg.</td>
              <td className={classes.clTableTr}>Qty. Charg.</td>
              <td className={classes.clTableTr}>Sign. Chauff.</td>
              <td className={classes.clTableTr}>Phone Chauff.</td>
              <td className={classes.clTableTr}>Voir de charg.</td>
              <td className={classes.clTableTr}>Status.</td>
              <td className={classes.clTableTr}>Action</td>
            </tr>
  
            {
              chargements.map((it, i) => <RowRapportChargementJournalier num={i} key={i} data={it} loadChargements={loadChargements} />)
            }
            
            </tbody>
          </table>
        </div>
      </>
    )
  }