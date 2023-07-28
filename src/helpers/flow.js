

  export const SECTIONS = {
    LOGIN:'login',
    MAIN_MENU:'mainMenu'
  }
  
  export const PAGES = {
   
    charg: { name:'charg', label:'Rapport Chargement Journalier', sub:'Affiche le rapport de chargement journalier.'},
    rlm: { name:'rlm', label:'Roulement', sub:'Affiche le roulement gen.'},
    rpt:{ name:'rpt', label:'Rapport Chargement General', sub:'Affiche le rapport de chargement general.'},
    stats: {name:'stats', label:'Stats Menseul', sub:'Statistiques total mensuels.'}
  }
  
  export const CHARGEMENT_STATES = {
    LOADING:'loading', DONE:'done', CANCELLED:'cancelled'

  }

  export const COLLECTIONS_NAMES = {
    CHARGEMENTS:'chargement', ROULEMENT:'roulement'
  }