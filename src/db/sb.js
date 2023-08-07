
import { data } from 'autoprefixer';
import { COLLECTIONS_NAMES } from '../helpers/flow.js'
import { createClient } from '@supabase/supabase-js'

export const LOADING_STATES = {
    WAITING : 'waiting',
    DONE : 'done',
    LOADING : 'loading',
    CANCELLED : 'cancelled'
}

const PROJECT_URL = 'https://ltvavdcgdrfqhlfpgkks.supabase.co'
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0dmF2ZGNnZHJmcWhsZnBna2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1NzEwMjUsImV4cCI6MjAwNjE0NzAyNX0.nAuA5lILpr3giK0fiurM0DprdD1JAf4xgam0laMGfRU'


const supabaseUrl = PROJECT_URL;
const supabaseKey = ANON;
const supabase = createClient(supabaseUrl, supabaseKey)

async function Login(){

}

async function UpdateRecord(id, collection, data){
    
    /* console.warn('updating ... ', id, collection, data);

    const record = await pb.collection(collection).update(id, data);
    return record; */


        const res = await supabase
        .from(collection)
        .update(data)
        .eq('id', id)
        .select()

     
        if(error) {
            console.log(error)
            return
        }

        
        return res;

}

    

async function AddCharg(data){
    
    const schema = {
        "plaque": "test",
        "shift": "M",
        "equipe": "A",
        "sacs": 123,
        "t": 123,
        "harrivee": "2022-01-01 10:00:00.123Z",
        "hdebutcharg": "",
        "hfincharg": "",
        "phonechauff": "test",
        "status": LOADING_STATES.WAITING,
        "voie": "1"
    };

    //console.log('schema => \n', schema, '\n');

    let finalData = { ...schema, ...data };
    finalData.harrivee = new Date(finalData.harrivee).toISOString().replace('T', ' ');
    finalData.hdebutcharg = finalData.hdebutcharg ?  new Date(finalData.hdebutcharg).toISOString().replace('T', ' ') : null;
    finalData.hfincharg = null
   
    //console.log('final data => \n',finalData, '\n')
    
    //console.log('harrivee', ' [ ' , final.harrivee, '] [',  new Date(final.harrivee).toISOString(), ' ] ')
    
    //const record = await pb.collection(COLLECTIONS_NAMES.CHARGEMENTS).create(finalData);
   
    const record = await supabase
      .from(COLLECTIONS_NAMES.CHARGEMENTS)
      .insert([
        finalData,
      ])
      .select()
    
      let { data:rec, error } = record;

      if(error) {
        console.log(error)
        return;
      }

    return rec;
}

async function GetListChargement(startDay = undefined, endDay = undefined){

    let chargements = [];
    const {data, error} = await supabase
    .from(COLLECTIONS_NAMES.CHARGEMENTS)
    .select()

    if(error) {
        console.log(error)
        return [];
    }

    if(startDay && endDay) { // 

        chargements = data.filter((it, i) => {

           const start = new Date(startDay).getTime();
           const end =  new Date(endDay).getTime();
           const chargementDate = new Date(data[0].harrivee).getTime();

           return chargementDate >= start && chargementDate <= end;

        })
        console.log('startDay', new Date(startDay).getTime(), '\nendDay', new Date(endDay).getTime(), '\ndata[0].harrivee', new Date(data[0].harrivee).getTime())
        console.log(chargements)
    }

    if( startDay && endDay === undefined ){
       chargements = data.filter((it, i) =>  new Date( it.harrivee ).toISOString().split('T')[0] === startDay )
   
    }

    return chargements;
}

async function Logout(){

    const { error } = await supabase.auth.signOut()

    return error;
}

async function LoadTeamsRoulement(){

    let { data: roulement, error } = await supabase
    .from(COLLECTIONS_NAMES.ROULEMENT)
    .select('data')

    if(error) {
        console.log(error)
        return 'A,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,…M,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M,P,P,N,N,R,R,M,M';
    }

    return roulement[0].data;

}

async function LoadMonthlyStats(){

}

export {
    LoadMonthlyStats,
    LoadTeamsRoulement,
    GetListChargement,
    UpdateRecord,
    Logout,
    AddCharg,
    Login
}