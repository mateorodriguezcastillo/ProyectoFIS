import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTextField } from '@material/textfield';
import { MDCSelect } from '@material/select';
import {MDCSnackbar} from '@material/snackbar';
import ListaPeliculas from '../../dominio/lista-peliculas.mjs';
import Pelicula from '../../dominio/pelicula.mjs';
import ListaLigas from '../../dominio/lista-ligas.mjs';
import Liga from '../../dominio/liga.mjs';
import { setTestData } from './utils.js';

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});


const listaPeliculas = new ListaPeliculas();
const listaLigas = setTestData();
console.log(listaLigas);

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

const tabBar = new MDCTabBar(document.querySelector(".mdc-tab-bar"));
tabBar.listen("MDCTabBar:activated", (activatedEvent) => {
  document.querySelectorAll(".content").forEach((element, index) => {
    if (index === activatedEvent.detail.index) {
      element.classList.remove("sample-content--hidden");
    } else {
      element.classList.add("sample-content--hidden");
    }
  });
});

const textFieldTitle = new MDCTextField(document.getElementById('title'));
const textFieldYear = new MDCTextField(document.getElementById('year'));
const selectGenre = new MDCTextField(document.getElementById('year2'));

// const addButton = new MDCRipple(document.getElementById('addButton'));
// addButton.listen('click', () => {
//   let title = textFieldTitle.value;
//   let year = textFieldYear.value;
//   let genre = selectGenre.value;
//   borrarCampos();

//   try {
//     let newPelicula = new Pelicula(title, genre, year);
//     listaPeliculas.agregar(newPelicula);
//     const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
//     snackbar.labelText = 'Pelicula agregada correctamente';
//     snackbar.open();

//   } catch (error) {
//     const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
//     snackbar.labelText = error.message;
//     snackbar.open();
//   } finally {
//     let peliculas = listaPeliculas.getPeliculas();
//     console.log(peliculas);
//     cargarListaPeliculas();

//   }
// })

const addButton = new MDCRipple(document.getElementById('addButton'));
addButton.listen('click', () => {
  let title = textFieldTitle.value;
  console.log(title);
  let year = textFieldYear.value;
  let year2 = selectGenre.value;
  console.log(year2);
  borrarCampos();

  try {
    let leagueInfo ={
      'name': title,'ptsAciertosExactos': year,'ptsAciertosParciales': year2
    };
    let newLiga = new Liga(leagueInfo);
    listaLigas.push(newLiga);
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    snackbar.labelText = 'Liga agregada correctamente';
    snackbar.open();

  } catch (error) {
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    snackbar.labelText = error.message;
    snackbar.open();
  } finally {
    cargarListaLigas();
  }
})

function borrarCampos(){
  textFieldTitle.value = "";
  textFieldYear.value = "";
  selectGenre.value = "";
}

function cargarListaPeliculas(){
  let peliculas = listaPeliculas.getPeliculas();
  let lista = document.getElementById('peliculas');
  lista.innerHTML = "";

  for(let i = 0; i < peliculas.length; i++){
    let pelicula = peliculas[i];

    //div principal
    let fila = document.createElement('div');
    fila.className = "mdc-card";

    //div primary action
    let div = document.createElement('div');
    div.className = "mdc-card__primary-action";

    //info pelicula
    let informacion = document.createElement("h2")
    informacion.innerHTML = pelicula.titulo + " (" + pelicula.anio + ")" + " - " + pelicula.genero;
    div.appendChild(informacion);

    //div mdc-card media square
    let divMediaSquare = document.createElement('div');
    divMediaSquare.className = "mdc-card__media mdc-card__media--square";
    div.appendChild(divMediaSquare);

    // //div mdc-card media content
    // let divMediaContent = document.createElement('div');
    // divMediaContent.className = "mdc-card__media-content";
    // divMediaSquare.appendChild(divMediaContent);

    //div mdc ripple
    let divRipple = document.createElement('div');
    divRipple.className = "mdc-card__ripple";
    div.appendChild(divRipple);

    fila.appendChild(div);
    lista.appendChild(fila);

    let saltoLinea = document.createElement('br');
    lista.appendChild(saltoLinea);
    
    

  }
}

function cargarListaLigas(){
  let lista = document.getElementById('peliculas');
  lista.innerHTML = "";

  for(let i = 0; i < listaLigas.length; i++){
    let pelicula = listaLigas[i];

    //div principal
    let fila = document.createElement('div');
    fila.className = "mdc-card";

    //div primary action
    let div = document.createElement('div');
    div.className = "mdc-card__primary-action";

    //info pelicula
    let informacion = document.createElement("h2")
    informacion.innerHTML = pelicula.name;
    div.appendChild(informacion);

    //div mdc-card media square
    let divMediaSquare = document.createElement('div');
    divMediaSquare.className = "mdc-card__media mdc-card__media--square";
    div.appendChild(divMediaSquare);

    // //div mdc-card media content
    // let divMediaContent = document.createElement('div');
    // divMediaContent.className = "mdc-card__media-content";
    // divMediaSquare.appendChild(divMediaContent);

    //div mdc ripple
    let divRipple = document.createElement('div');
    divRipple.className = "mdc-card__ripple";
    div.appendChild(divRipple);

    fila.appendChild(div);
    lista.appendChild(fila);

    let saltoLinea = document.createElement('br');
    lista.appendChild(saltoLinea);
    
    

  }
}

cargarListaLigas();


