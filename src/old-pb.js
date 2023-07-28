import PocketBase from 'pocketbase';
import { Date2DateInput } from './helpers/funcs';
import { COLLECTIONS_NAMES } from './helpers/flow'

const pb = new PocketBase('http://localhost:8090');
pb.autoCancellation(false)

 function GetAuthStore(){
     //console.log(pb)
    return pb.authStore;
}

async function Login(username, password){
    
    let authData = {error:'Error login'}

    try{
     authData = await pb.collection('users').authWithPassword(
        username,
        password,
    );}catch(e){
        console.error('failed login')
        
    }

    return authData;
}

async function UpdateRecord(id, collection, data){

    console.warn('updating ... ', id, collection, data);

    const record = await pb.collection(collection).update(id, data);
    return record;
}

async function AddCharg(data){


    //console.log('new data => \n', data, '\n')

    const schema = {
        "plaque": "test",
        "shift": "M",
        "equipe": "A",
        "sacs": 123,
        "t": 123,
        "harrivee": "2022-01-01 10:00:00.123Z",
        "hdebutcharg": "2022-01-01 10:00:00.123Z",
        "hfincharg": "2022-01-01 10:00:00.123Z",
        "phonechauff": "test",
        "status": "loading",
        "voie": "1"
    };

    //console.log('schema => \n', schema, '\n');

    let finalData = { ...schema, ...data };
    finalData.harrivee = new Date(finalData.harrivee).toISOString().replace('T', ' ');
    finalData.hdebutcharg = new Date(finalData.hdebutcharg).toISOString().replace('T', ' ');
    finalData.hfincharg = ''
   
    //console.log('final data => \n',finalData, '\n')
    
    //console.log('harrivee', ' [ ' , final.harrivee, '] [',  new Date(final.harrivee).toISOString(), ' ] ')
    
    const record = await pb.collection('chargement').create(finalData);
    //console.log(record)
    return record;


}

async function GetListChargement(startDay = undefined, endDay = undefined){

    let filter =  '';
    const ONE_DAY_MILLI = 86400000;


    if( startDay !== undefined && endDay === undefined ) endDay = Date2DateInput(new Date(new Date(startDay).getTime() + ONE_DAY_MILLI),true);
    
    if(startDay !== undefined && endDay !== undefined) filter = `harrivee >= "${startDay}" && harrivee <= "${endDay}"`;//`created >= "2022-01-01 00:00:00" && created <= "2022-01-01 00:00:00"`;

    const resultList = await pb.collection('chargement').getList(1, 50, {
        filter: filter ,
    }); 

    console.log('filtre', filter)
    console.log('startDay',startDay,'endDay',endDay)

    return resultList;
}

async function LoadMonthlyStats(y,m){
    console.log('LoadMonthlyStats',y,m)
}

async function LoadTeamsRoulement(){
    const d = await pb.collection(COLLECTIONS_NAMES.ROULEMENT).getOne('sjuhwff7f24l47s')
    console.log('LoadTeamsRoulement', d)
    return d.data;
}

async function Logout(){
   


        pb.authStore.clear();
}

export {
    GetAuthStore,
    Logout,
    UpdateRecord,
    GetListChargement,
    AddCharg,
    LoadMonthlyStats,
    Login,
    LoadTeamsRoulement
}

