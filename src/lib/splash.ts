/**
 * Écran d'ouverture : il ne s'affiche qu'une fois par session.
 *
 * Partagé entre un composant serveur (le script d'amorçage, dans le layout)
 * et un composant client (`SplashScreen`), donc dans un module neutre :
 * les exports d'un module « use client » ne sont pas lisibles côté serveur.
 */
export const SPLASH_KEY = "fsb:splash-seen";

/**
 * Posé dans le HTML avant tout rendu : si l'écran a déjà été vu dans cette
 * session, l'attribut arrive sur `<html>` avant la première peinture et le
 * CSS masque l'écran d'emblée — donc aucun clignotement au retour sur la
 * page. Le `try/catch` couvre la navigation privée, où l'accès peut lever.
 */
export const SPLASH_INIT_SCRIPT = `try{if(sessionStorage.getItem("${SPLASH_KEY}"))document.documentElement.dataset.splashSeen="1"}catch(e){}`;
