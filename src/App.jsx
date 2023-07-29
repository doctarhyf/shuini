import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import gck from '/gck.png';
import { SECTIONS, PAGES } from './helpers/flow'
import * as classes from './helpers/classes'
import ButtonMenu from './comps/ButtonMenu'
import PageHeader from './comps/PageHeader'
import UserBadge from './comps/UserBadge';
import FormNewCharg from './form/FormNewCharg'
import PageRapportChargementGeneral from './pages/PageRapportChargementGeneral'
import PageRapportChargementJournalier from './pages/PageRapportChargementJournalier'
import PageRoulementGeneral from './pages/PageRoulementGeneral'
import PageStats from './pages/PageStats'
import { GetMonthName } from './helpers/funcs';
import {  Login, Logout } from './db/sb.js';

function App() {

  const [section, setSection] = useState(SECTIONS.LOGIN)
  const [phone, setPhone] = useState('doctarhyf')
  const [pwd, setPwd] = useState('Gabriellemutunda1998')
  const [selectedPage, setSelectedPage] = useState(PAGES.charg)
  const [showFormNewCharg, setShowFormNewCharg] = useState(false);
  const [authStore, setAuthStore] = useState({})
  const [loginError, setLoginError] = useState(false)
 
  useEffect(() => {

    //const auth = GetAuthStore();
    //setAuthStore(auth)

    
    //if(auth.isValid) setSection(SECTIONS.MAIN_MENU)

  },[])

  async function onLogin(e){
    e.preventDefault()

    
    /* const {record, token, error} = await Login(phone, pwd);

    if(error) {
      alert(error);
      setLoginError(true)
      return;
    } */
    setSection(SECTIONS.MAIN_MENU);
    
  }

  function onButtonMenuClicked(e){
    const pageName = e.target.name;
    const page = PAGES[pageName]
    
    setSelectedPage(page);
  }

  function onLogout(){
    //if(authStore.isValid){
      setSection(SECTIONS.LOGIN)
      Logout();
   // }
  }

  return (
    <div className={`bg-slate-500  text-white min-w-max  min-h-max flex flex-col ${SECTIONS.LOGIN === section ? 'h-screen items-center justify-center' : '' }  `}>
      
      
      
      { SECTIONS.LOGIN === section && 
      
      
        <section className='form-login text-center h-min '>
        <img src={gck} className=' mx-auto' width="240pt" height="120pt" />

        
        <h5 className='py-2 text-lg text-white min-w-max text-center' >CIMENTERIE - 水泥车间</h5>
        <form onSubmit={onLogin} className='max-w-[465px]'>
          <div>
            <input value={phone} onChange={e =>  {setLoginError(false); setPhone(e.target.value); }} className={classes.clFormTextInput} type='phone' placeholder='phone number ...' />
          </div>
          <div>
            <input value={pwd} onChange={e => { setLoginError(false); setPwd(e.target.value);}} className={classes.clFormTextInput} type='password' />
          </div>

          { !loginError && <p className='text-gray-100 text-sm py-4 break-words text-center marginx-auto mx-auto w-1/2'>
            Veuillez vous connecter avec votre numero de telephone et mot de passe
          </p> }

          { loginError && 
            <p className='text-sm p-2 rounded-md bg-red-500 text-white w-min break-words mb-2'>
              Erreur de connection veuillez inserer votre "username" et votre "mot de passe" correctement. Verifier votre clavier pour les majuscules. 
            </p>
          }

         

          <div>
            <button disabled={phone.length < 9 || pwd.length < 6} onClick={onLogin} className='hover:bg-blue-600 disabled:text-gray-400 disabled:bg-slate-300 text-center bg-blue-700 text-white p-2 rounded-md w-min min-w-[300px]' type='submit'>Se connecter</button> 
          </div>
        </form>
      </section> }

      {
        SECTIONS.MAIN_MENU  === section &&
        <section className='main-menu flex flex-row' >
          <nav className='bg-slate-600 w-min p-4 h-screen min-h-screen'>
            <img src={gck} width="240pt" height="120pt" />

            <UserBadge authStore={authStore} />

            <ul className='pt-2'>
              {
                Object.values(PAGES).map((btn, i) => <ButtonMenu key={i} name={btn.name} selectedPage={selectedPage} label={btn.label} onClick={onButtonMenuClicked}  />
                )
              }
              
              <button className='bg-red-500 text-sm my-2 text-white p-2 rounded-md' onClick={onLogout} >Deconnexion</button>
              
            </ul>
          </nav>
          <div className='pg-cont p-2'>
              <PageHeader title={ PAGES.rlm.label === selectedPage.label ? `Roulement mois de ` + GetMonthName() + ` ` + new Date().getFullYear() : selectedPage.label} sub={selectedPage.sub} />
              
              { 
              
                selectedPage === PAGES.charg &&
                <div className='pg-charg' >
                  { !showFormNewCharg && <div><button className={`ml-0 ${classes.clbtnsm}`} onClick={e => setShowFormNewCharg(!showFormNewCharg)} >Nouveau Charg.</button></div> }
                 {/*  { showFormNewCharg && <div>
                      <button className={`ml-0 ${clbtnsm}`} onClick={e => setShowFormNewCharg(!showFormNewCharg)} >Demarrer Charg.</button>
                      <button className={`ml-0 bg-red-600 hover:bg-red-500 ${clbtnsm}`} onClick={e => setShowFormNewCharg(!showFormNewCharg)} >Annuler</button>    
                  </div> } */}
                  

                  {
                    showFormNewCharg && <FormNewCharg setShowFormNewCharg={setShowFormNewCharg} showFormNewCharg={showFormNewCharg} />
                  }
                  
                  {
                    !showFormNewCharg && <PageRapportChargementJournalier />
                  }
                </div>

              }

              { 

                selectedPage === PAGES.rlm &&
                <div className='pg-rlm' >
                  <PageRoulementGeneral />
                </div>

              }

              { 
              
                selectedPage === PAGES.rpt &&
                <div className='pg-rpt' >
                  <PageRapportChargementGeneral />
                </div>

              }

              {
                selectedPage === PAGES.stats &&
                <div>
                  <PageStats />
                </div>
              }

          </div>
        </section>
      }
    </div>
  )
}

export default App
