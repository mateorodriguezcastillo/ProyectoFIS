import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTextField } from '@material/textfield';
import { MDCSnackbar } from '@material/snackbar';
import {MDCFormField} from '@material/form-field';
import {MDCCheckbox} from '@material/checkbox';
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
const usuario1 = testdata.users[0];   //Pepe

//let id = 4;

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
  var usuariosNombres = ['Pepe']
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

  // for (var i = 0; i < checkboxes.length; i++) {
  //   usuariosNombres.push(checkboxes[i].id)
  // }
  checkboxes.forEach(element => {
    usuariosNombres.push(element.id);
  });

  try {
    let infoLiga ={
      'id': ligas.getidAAsignar(), 'name': nombre,'ptsAciertosExactos': ptsAciertosExactos,'ptsAciertosParciales': ptsAciertoParcial
    };
    ligas.incrementarId();
    let nuevaLiga = new Liga(infoLiga);
    // for (var i = 0; i < usuariosNombres.length; i++) {
    //   let usuario = usuarios.find(user => user.username === usuariosNombres[i]);
    //   if (usuario){
    //     nuevaLiga.addUser(usuario);
    //   }
    // }
    usuariosNombres.forEach(nombre => {
      let usuario = usuarios.find(user => user.username === nombre);
      if(usuario){
        nuevaLiga.addUser(usuario);
      }
    });
    // usuario1.addLiga(nuevaLiga);
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
  let misLigas = ligas.getLigasDeUsuario(usuario1);

  misLigas.forEach(liga => {
    // let arrayNoOrder = [];

    // for(const user of liga.userList){
    //   let puntos = (user.aciertosExactos * liga.ptsAciertosExactos) + (user.aciertosParciales * liga.ptsAciertosParciales);
    //   arrayNoOrder.push([user.username, puntos]);
    // }

    // let arrayOrder = arrayNoOrder.sort(function(a, b) {
    //   return b[1] - a[1];
    // });

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
    let divMediaTitle = document.createElement('h3');
    divMediaTitle.className = "mdc-card__media-title";
    divMediaTitle.innerHTML = "Puntos por acierto exacto: " + liga.ptsAciertosExactos;
    divMediaContent.appendChild(divMediaTitle);

    //div mdc-card media subtitle
    let divMediaSubtitle = document.createElement('h3');
    divMediaSubtitle.className = "mdc-card__media-subtitle";
    divMediaSubtitle.innerHTML = "Puntos por acierto parcial: " + liga.ptsAciertosParciales;
    divMediaContent.appendChild(divMediaSubtitle);

    // let i = 0;
    // for(const user of arrayOrder){
    //   let divMediaSubtitle = document.createElement('h3');
    //   divMediaSubtitle.className = "mdc-card__media-subtitle";
    //   divMediaSubtitle.innerHTML = user[0] + " - " + user[1];
    //   divMediaContent.appendChild(divMediaSubtitle);
    //   i++;
    // }
    //console.log(liga.getUserList());
    liga.getUserList().forEach(user => {
      let divMediaSubtitle = document.createElement('h3');
      divMediaSubtitle.className = "mdc-card__media-subtitle";
      divMediaSubtitle.innerHTML = user.username + " - " + liga.getPuntajeUser(user);
      divMediaContent.appendChild(divMediaSubtitle);
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

    // console.log(pelicula);
    // console.log(pelicula.userList);

    // for(const user of liga.getUserList()){
    //   let divMediaSubtitle = document.createElement('h4');
    //   divMediaSubtitle.className = "mdc-card__media-subtitle";
    //   console.log(user);
    //   divMediaSubtitle.innerHTML = user.username;
    //   divMediaContent.appendChild(divMediaSubtitle);
    // }

    liga.getUserList().forEach(user => {
      let divMediaSubtitle = document.createElement('h4');
      divMediaSubtitle.className = "mdc-card__media-subtitle";
      //console.log(user);
      divMediaSubtitle.innerHTML = user.username;
      divMediaContent.appendChild(divMediaSubtitle);
    });

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
      // for(const element of liga.getUserList()){
      //   if(element.username == user1.username){
      //     const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
      //     snackbar.labelText = 'Ya estas unido a esta liga :D';
      //     snackbar.open();
      //     unido = true;
      //   }
      // }
      liga.getUserList().forEach(user => {
        if(user.username == usuario1.username){
          const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
          snackbar.labelText = 'Ya estas unido a esta liga :D';
          snackbar.open();
          unido = true;
        }
      });
      if(!unido){
        liga.addUser(usuario1);
        // user1.addLiga(pelicula);
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
  // for(const user of usuarios){
  //   if (user.username != usuario1.username){
      
  //     let fila = document.createElement('li');

  //     let checkbox = document.createElement('input');
  //     checkbox.id = user.username;
  //     checkbox.type = "checkbox";
  //     fila.appendChild(checkbox);

  //     let span = document.createElement('span');
  //     // span.className = "mdc-list-item__text";
  //     span.innerHTML = user.username;
  //     fila.appendChild(span);

  //     ul.appendChild(fila);
  //   }
  // }
  usuarios.forEach(user => {
    if (user.username != usuario1.username){
      
      let fila = document.createElement('li');

      let checkbox = document.createElement('input');
      checkbox.id = user.username;
      checkbox.type = "checkbox";
      fila.appendChild(checkbox);

      let span = document.createElement('span');
      // span.className = "mdc-list-item__text";
      span.innerHTML = user.username;
      fila.appendChild(span);

      ul.appendChild(fila);
    }
  });
}

{/* <div class="mdc-checkbox">
  <input type="checkbox"
          class="mdc-checkbox__native-control"
          id="checkbox-1"/>
  <div class="mdc-checkbox__background">
    <svg class="mdc-checkbox__checkmark"
          viewBox="0 0 24 24">
      <path class="mdc-checkbox__checkmark-path"
            fill="none"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
    <div class="mdc-checkbox__mixedmark"></div>
  </div>
  <div class="mdc-checkbox__ripple"></div>
</div>
<label for="checkbox-1">Checkbox 1</label> */}

// function cargarUsuariosASeleccionar(){
//   let select = document.getElementById('users-list-checkbox');

//   let ul = document.getElementById('user-list-ul');
//   select.appendChild(ul);

//   for (const user of usuarios){
//     if (user.username != usuario1.username){

//       let fila = document.createElement('li');
//       ul.appendChild(fila);

//       let divMdcCheckbox = document.createElement('div');
//       divMdcCheckbox.className = "mdc-checkbox";
//       fila.appendChild(divMdcCheckbox);

//       let input = document.createElement('input');
//       input.type = "checkbox";
//       input.className = "mdc-checkbox__native-control";
//       input.id = user.username;
//       divMdcCheckbox.appendChild(input);

//       let divMdcCheckboxBackground = document.createElement('div');
//       divMdcCheckboxBackground.className = "mdc-checkbox__background";
//       divMdcCheckbox.appendChild(divMdcCheckboxBackground);

//       let svg = document.createElement('svg');
//       svg.className = "mdc-checkbox__checkmark";
//       svg.viewBox = "0 0 24 24";
//       divMdcCheckboxBackground.appendChild(svg);

//       let path = document.createElement('path');
//       path.className = "mdc-checkbox__checkmark-path";
//       path.fill = "none";
//       path.d = "M1.73,12.91 8.1,19.28 22.79,4.59";
//       svg.appendChild(path);

//       let divMdcCheckboxMixedmark = document.createElement('div');
//       divMdcCheckboxMixedmark.className = "mdc-checkbox__mixedmark";
//       divMdcCheckboxBackground.appendChild(divMdcCheckboxMixedmark);

//       let divMdcCheckboxRipple = document.createElement('div');
//       divMdcCheckboxRipple.className = "mdc-checkbox__ripple";
//       divMdcCheckbox.appendChild(divMdcCheckboxRipple);

//       let label = document.createElement('label');
//       label.for = user.username;
//       label.innerHTML = user.username;
//       divMdcCheckbox.appendChild(label);
//     }
//   }
//   const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
//   const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
//   formField.input = checkbox;
// }


cargarUsuariosASeleccionar()
cargarLigasGeneral();
cargarMisLigas();