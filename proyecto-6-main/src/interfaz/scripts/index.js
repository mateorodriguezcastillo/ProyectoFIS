import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTextField } from '@material/textfield';
import {MDCList} from '@material/list';
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

const listaLigas = setTestData();
const ligas = listaLigas[0]
const user1 = listaLigas[1];
console.log(listaLigas);

let id = 4;

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
  var usuarios = ['Pepe']
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

  for (var i = 0; i < checkboxes.length; i++) {
    usuarios.push(checkboxes[i].id)
  }

  console.log(usuarios);

  try {
    let leagueInfo ={
      'id': id, 'name': title,'ptsAciertosExactos': year,'ptsAciertosParciales': year2
    };
    id++;
    let newLiga = new Liga(leagueInfo);
    for (var i = 0; i < usuarios.length; i++) {
      let user = listaLigas[2].find(user => user.username === usuarios[i]);
      if (user){
        newLiga.addUser(user);
      }
    }
    user1.addLiga(newLiga);
    ligas.push(newLiga);
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

function cargarListaLigas(){
  let lista = document.getElementById('peliculas');
  lista.innerHTML = "";

  for(const element of user1.getLigas()){
    let pelicula = element;

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

    //div mdc-card media content
    let divMediaContent = document.createElement('div');
    divMediaContent.className = "mdc-card__media-content";
    divMediaSquare.appendChild(divMediaContent);

    //div mdc-card media title
    let divMediaTitle = document.createElement('h3');
    divMediaTitle.className = "mdc-card__media-title";
    divMediaTitle.innerHTML = "Puntos por acierto exacto: " + pelicula.ptsAciertosExactos;
    divMediaContent.appendChild(divMediaTitle);

    //div mdc-card media subtitle
    let divMediaSubtitle = document.createElement('h3');
    divMediaSubtitle.className = "mdc-card__media-subtitle";
    divMediaSubtitle.innerHTML = "Puntos por acierto parcial: " + pelicula.ptsAciertosParciales;
    divMediaContent.appendChild(divMediaSubtitle);

    console.log(pelicula);

    for(const user of pelicula.userList){
      let divMediaSubtitle = document.createElement('h3');
      divMediaSubtitle.className = "mdc-card__media-subtitle";
      divMediaSubtitle.innerHTML = user.username;
      divMediaContent.appendChild(divMediaSubtitle);
    }

    //div mdc ripple
    let divRipple = document.createElement('div');
    divRipple.className = "mdc-card__ripple";
    div.appendChild(divRipple);

    fila.appendChild(div);
    lista.appendChild(fila);

    let saltoLinea = document.createElement('br');
    lista.appendChild(saltoLinea);
  }

  let listaLigasAll = document.getElementById('ligasGeneral');
  listaLigasAll.innerHTML = "";

  for(const element of ligas){
    let pelicula = element;

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
    divMediaSquare.style = "overflow-y: auto; height:100%;";
    div.appendChild(divMediaSquare);

    //div mdc-card media content
    let divMediaContent = document.createElement('div');
    divMediaContent.className = "mdc-card__media-content";
    divMediaSquare.appendChild(divMediaContent);

    //div mdc-card media title
    let divMediaTitle = document.createElement('h4');
    divMediaTitle.className = "mdc-card__media-title";
    divMediaTitle.innerHTML = "Puntos por acierto exacto: " + pelicula.ptsAciertosExactos;
    divMediaContent.appendChild(divMediaTitle);

    //div mdc-card media subtitle
    let divMediaSubtitle = document.createElement('h4');
    divMediaSubtitle.className = "mdc-card__media-subtitle";
    divMediaSubtitle.innerHTML = "Puntos por acierto parcial: " + pelicula.ptsAciertosParciales;
    divMediaContent.appendChild(divMediaSubtitle);

    console.log(pelicula);
    console.log(pelicula.userList);

    for(const user of pelicula.userList){
      let divMediaSubtitle = document.createElement('h4');
      divMediaSubtitle.className = "mdc-card__media-subtitle";
      console.log(user);
      divMediaSubtitle.innerHTML = user.username;
      divMediaContent.appendChild(divMediaSubtitle);
    }

    //div mdc ripple
    let divRipple = document.createElement('div');
    divRipple.className = "mdc-card__ripple";
    div.appendChild(divRipple);

    let boton = document.createElement('button');
    //boton.id = pelicula.id;
    boton.className = "mdc-button mdc-card__action mdc-card__action--button";
    boton.innerHTML = "Unirse";
    boton.addEventListener('click', () => {
      let unido = false;
      for(const element of pelicula.userList){
        if(element.username == user1.username){
          const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
          snackbar.labelText = 'Ya estas unido a esta liga :D';
          snackbar.open();
          unido = true;
        }
      }
      if(!unido){
        pelicula.addUser(user1);
        user1.addLiga(pelicula);
        cargarListaLigas();
        boton.innerHTML = "Unido";
      }
    })
    divMediaContent.appendChild(boton);

    fila.appendChild(div);
    listaLigasAll.appendChild(fila);

    let saltoLinea = document.createElement('br');
    listaLigasAll.appendChild(saltoLinea);
  }


}

function loadUsersToSelect(){
  let select = document.getElementById('user-list');
  select.innerHTML = "";
  for(const user of listaLigas[2]){
    if (user.username != user1.username){
      let fila = document.createElement('li');
      // fila.className = "mdc-list-item";

      let checkbox = document.createElement('input');
      checkbox.id = user.username;
      checkbox.type = "checkbox";
      fila.appendChild(checkbox);

      let span = document.createElement('span');
      // span.className = "mdc-list-item__text";
      span.innerHTML = user.username;
      fila.appendChild(span);

      select.appendChild(fila);
    }
  }
}

// function unirseLiga(liga){
//   let select = document.getElementById('user-list');
//   let users = [];
//   for(const user of select.children){
//     if(user.children[0].checked){


loadUsersToSelect()
cargarListaLigas();