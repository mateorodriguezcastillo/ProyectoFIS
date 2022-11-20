import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTextField } from '@material/textfield';
import { MDCSnackbar } from '@material/snackbar';
import Liga from '../../dominio/liga.mjs';
import { setTestData } from './utils.js';
import ListaLigas from '../../dominio/lista-ligas.mjs';


const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

const testdata = setTestData();
const ligas = new ListaLigas(testdata.leagues);
const usuarios = testdata.users;
const currentUser = testdata.users[0];  //Pepe


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

const textFieldNombre = new MDCTextField(document.getElementById('nombre'));
const textFieldPtsAciertosExactos = new MDCTextField(document.getElementById('ptsAciertoExacto'));
const textFieldPtsAciertoParcial = new MDCTextField(document.getElementById('ptsAciertoParcial'));

const addButton = new MDCRipple(document.getElementById('addButton'));
addButton.listen('click', () => {
  let nombre = textFieldNombre.value;
  let ptsAciertosExactos = textFieldPtsAciertosExactos.value;
  let ptsAciertoParcial = textFieldPtsAciertoParcial.value;
  borrarCampos();
  let usuariosNombres = ['Pepe']
  let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

  checkboxes.forEach(element => {
    usuariosNombres.push(element.id);
  });

  try {
    let infoLiga ={
      'id': ligas.getidAAsignar(), 'name': nombre,'ptsAciertosExactos': ptsAciertosExactos,'ptsAciertosParciales': ptsAciertoParcial
    };
    ligas.incrementarId();
    let nuevaLiga = new Liga(infoLiga);
    usuariosNombres.forEach(nombre => {
      let usuario = usuarios.find(user => user.username === nombre);
      if(usuario){
        nuevaLiga.addUser(usuario);
      }
    });
    ligas.agregar(nuevaLiga);
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    snackbar.labelText = 'Liga agregada correctamente';
    snackbar.open();

  } catch (error) {
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    snackbar.labelText = error.message;
    snackbar.open();
  } finally {
    cargarLigasGeneral();
    cargarMisLigas();
  }
})

function borrarCampos(){
  textFieldNombre.value = "";
  textFieldPtsAciertosExactos.value = "";
  textFieldPtsAciertoParcial.value = "";
}

function cargarMisLigas(){
  let lista = document.getElementById('misLigas');
  lista.innerHTML = "";
  let misLigas = ligas.getLigasDeUsuario(currentUser);

  misLigas.forEach(liga => {

    //div principal
    let fila = document.createElement('div');
    fila.className = "mdc-card";

    //div primary action
    let div = document.createElement('div');
    div.className = "mdc-card__primary-action";

    //info pelicula
    let informacion = document.createElement("h2")
    informacion.innerHTML = liga.name;
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
    let divMediaTitle = document.createElement('h4');
    divMediaTitle.className = "mdc-card__media-title";
    divMediaTitle.innerHTML = "Puntos por acierto exacto: " + liga.ptsAciertosExactos;
    divMediaContent.appendChild(divMediaTitle);

    //div mdc-card media subtitle
    let divMediaSubtitle = document.createElement('h4');
    divMediaSubtitle.className = "mdc-card__media-subtitle";
    divMediaSubtitle.innerHTML = "Puntos por acierto parcial: " + liga.ptsAciertosParciales;
    divMediaContent.appendChild(divMediaSubtitle);

    let pos = 1;
    liga.getUserList().forEach(user => {
      let divMediaSubtitle = document.createElement('h4');
      divMediaSubtitle.className = "mdc-card__media-subtitle";
      if (user.username === currentUser.username){
        divMediaSubtitle.classList.add('dorado');
      }
      divMediaSubtitle.innerHTML = pos + " | " + user.username + " - " + liga.getPuntajeUser(user) + " pts";
      divMediaContent.appendChild(divMediaSubtitle);
      pos++;
    });

    //div mdc ripple
    let divRipple = document.createElement('div');
    divRipple.className = "mdc-card__ripple";
    div.appendChild(divRipple);

    fila.appendChild(div);
    lista.appendChild(fila);

    let saltoLinea = document.createElement('br');
    lista.appendChild(saltoLinea);
  });
}

function cargarLigasGeneral(){
  let listaLigasAll = document.getElementById('ligasGeneral');
  listaLigasAll.innerHTML = "";
  ligas.getLigas().forEach(liga => {

    //div principal
    let fila = document.createElement('div');
    fila.className = "mdc-card";

    //div primary action
    let div = document.createElement('div');
    div.className = "mdc-card__primary-action";

    //info pelicula
    let informacion = document.createElement("h2")
    informacion.innerHTML = liga.name;
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
    divMediaTitle.innerHTML = "Puntos por acierto exacto: " + liga.ptsAciertosExactos;
    divMediaContent.appendChild(divMediaTitle);

    //div mdc-card media subtitle
    let divMediaSubtitle = document.createElement('h4');
    divMediaSubtitle.className = "mdc-card__media-subtitle";
    divMediaSubtitle.innerHTML = "Puntos por acierto parcial: " + liga.ptsAciertosParciales;
    divMediaContent.appendChild(divMediaSubtitle);

    liga.getUserList().forEach(user => {
      let divMediaSubtitle = document.createElement('h4');
      divMediaSubtitle.className = "mdc-card__media-subtitle";
      if (user.username === currentUser.username){
        divMediaSubtitle.classList.add('dorado');
      }
      divMediaSubtitle.innerHTML = user.username;
      divMediaContent.appendChild(divMediaSubtitle);
    });

    //div mdc ripple
    let divRipple = document.createElement('div');
    divRipple.className = "mdc-card__ripple";
    div.appendChild(divRipple);

    let boton = document.createElement('button');
    boton.className = "mdc-button mdc-card__action mdc-card__action--button dorado";
    boton.innerHTML = "Unirse";
    boton.addEventListener('click', () => {
      let unido = false;
      liga.getUserList().forEach(user => {
        if(user.username == currentUser.username){
          const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
          snackbar.labelText = 'Ya estas unido a esta liga :D';
          snackbar.open();
          unido = true;
        }
      });
      if(!unido){
        liga.addUser(currentUser);
        cargarLigasGeneral();
        cargarMisLigas();
        boton.innerHTML = "Unido";   //No parece funcionar asi que pa mi mejor sacarlo!
      }
    })
    divMediaContent.appendChild(boton);

    fila.appendChild(div);
    listaLigasAll.appendChild(fila);

    let saltoLinea = document.createElement('br');
    listaLigasAll.appendChild(saltoLinea);
  });

}

function cargarUsuariosASeleccionar(){
  let select = document.getElementById('user-list');
  select.innerHTML = "";
  let ul = document.createElement('ul');
  select.appendChild(ul);
  usuarios.forEach(user => {
    if (user.username != currentUser.username){
      
      let fila = document.createElement('li');

      let checkbox = document.createElement('input');
      checkbox.id = user.username;
      checkbox.type = "checkbox";
      fila.appendChild(checkbox);

      let span = document.createElement('span');
      span.innerHTML = user.username;
      fila.appendChild(span);

      ul.appendChild(fila);
    }
  });
}

cargarUsuariosASeleccionar()
cargarLigasGeneral();
cargarMisLigas();