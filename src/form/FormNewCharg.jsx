import React from "react";
import { useState } from "react";
import * as classes from '../helpers/classes'
import FormValidationMessage from './FormValidationMessage'
import { AddCharg } from "../db/sb.js";

export default function FormNewCharg(props){

    const [inputs, setInputs] = useState({plaque:'1234AB/10', sacs:100});
   
  
    async function  onSubmit(e){
      e.preventDefault();
  
  
     
     const res = await AddCharg(inputs)
     console.warn(res);
      props.setShowFormNewCharg(!props.showFormNewCharg)
    }
  
    function onChange(e){
  
     
  
      const n = e.target.name;
      const v = e.target.value;
  
      setInputs(inputs => ({ ...inputs, [n]: v }));
  
     
    }
  
    return (
      <>
      <div>
            <button disabled={
              (inputs.plaque?.length === undefined || inputs.plaque?.length === 0) ||
              (inputs.phonechauff?.length === undefined || inputs.phonechauff?.length === 0) ||
              (inputs.harrivee?.length === undefined || inputs.harrivee?.length === 0) 
             
              
              }  className={`ml-0 ${classes.clbtnsm} disabled:bg-slate-400`} onClick={onSubmit} >Ajouter Chargement</button>
            <button className={`ml-0 bg-red-600 hover:bg-red-500 ${classes.clbtnsm}`} onClick={e => props.setShowFormNewCharg(!props.showFormNewCharg)} >Annuler</button>    
        </div>
        <form className='text-black bg-white shadow-md p-2 rounded-md'>
          <div>
            <div className={classes.clFormLabel}>Plaque</div>
            <input className={`text-white  ${classes.clFormTextInput}`}type='text' name='plaque' value={inputs.plaque || ''} onChange={onChange} placeholder='plaque'/>
            { (inputs.plaque?.length === undefined || inputs.plaque?.length === 0) &&  <FormValidationMessage data={`Plaque can't be empty!`} /> }
          </div>
          <div>
            <div className={classes.clFormLabel}>Heure d'arrivee</div>
            <input className={`text-white  ${classes.clFormTextInput}`} type='datetime-local' name='harrivee'  value={inputs.harrivee || new Date().toLocaleDateString()} onChange={onChange}  />
            { (inputs.harrivee?.length === undefined || inputs.harrivee?.length === 0) &&  <FormValidationMessage data={`Phone can't be empty!`} /> }
          </div>
          <div>
            <div className={classes.clFormLabel}>Heure debut charg.</div>
            <input className={`text-white  ${classes.clFormTextInput}`}type='datetime-local' name='hdebutcharg' value={inputs.hdebutcharg || new Date().toLocaleDateString()} onChange={onChange} />
          
          </div>
          <div>
            <div className={classes.clFormLabel}>Nombre de sacs</div>
            <input min={100} defaultValue={100} className={`text-white  ${classes.clFormTextInput}`}type='number' name='sacs' value={inputs.sacs || 100} onChange={onChange} />
          </div>
          <div>
            <div className={classes.clFormLabel}>Phone Chauffeur</div>
            <input  className={`text-white  ${classes.clFormTextInput}`}type='phone' placeholder='ex: 0893092849' maxLength={10} name='phonechauff' value={inputs.phonechauff || ''} onChange={onChange} />
            { (inputs.phonechauff?.length === undefined || inputs.phonechauff?.length === 0) &&  <FormValidationMessage data={`Phone can't be empty!`} /> }
          </div>
          <div>
            <div className={classes.clFormLabel}>Voie de charg.</div>
            {/* <input min={1} max={3} defaultValue={1} className={`text-white  ${classes.clFormTextInput}`}type='number' name='voie' value={inputs.voie || 1} onChange={onChange} /> */}
              <select className={classes.clFormTextInput} defaultValue={3} onChange={ onChange} name="voie" value={inputs.voie || 1} >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
          </div>
  
        </form>
      </>
    )
  }