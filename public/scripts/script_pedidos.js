function go_to_main() {
  window.location.href = "index.html";
}

function set_footer() {
  var last_main = document.getElementById("main");
}

function iniciar() {
  // charge_main_menu();

  var izq_bttn = document.getElementById("izquierda");
  var der_bttn = document.getElementById("derecha");

  // var img_izq = document.getElementById("plato_menu_0");
  // img_izq.addEventListener("click", carrusel_anterior);

  izq_bttn.addEventListener("click", carrusel_anterior);
  der_bttn.addEventListener("click", carrusel_siguiente);
  obtener_platos();
  set_footer();
}
function obtener_platos() {
  //Esta funcion llama los registros de Platos_pedidos del servidor.
  return fetch("http://192.168.0.150:3000/pedidos")
    .then((response) => response.json())
    .then((data) => {
      platos_disponibles = data;
      console.log(platos_disponibles);
      mostrar_carrusel();
    })
    .catch((error) => console.error("Error: ", error));
}

function mostrar_carrusel() {
  const carrusel = document.getElementById("menu_carusell");
  // carrusel.innerHTML = ""; //Limpiar el contenido anterior.
  let numero_tarjetas = 5;

  for (let i = 0; i < numero_tarjetas; i++) {
    const index = (carrusel_index + i) % platos_disponibles.length;
    const plato = platos_disponibles[index];
    const tarjeta = document.getElementById(`plato_menu_${i}`);

    //aqui se manejan los datos Binarios de las imagenes de los platos.
    const blob = new Blob([new Uint8Array(plato.ImageData.data)], {
      type: "image/jpeg",
    });
    const url = URL.createObjectURL(blob); //este nuevo URL se usa como src para la imagen en la tarjeta.
    //fin del manejo de los datos binarios.

    if (tarjeta.innerHTML.trim() === "") {
      console.clear();
      console.log(window.innerWidth, " W x ", window.innerHeight, " H");
      console.log(tarjeta.id);

      tarjeta.innerHTML = `
              <h3 class="nombre">${plato.nombre}</h3>
              <img class="imagen" src=${url} alt="imagen del plato">
              <p class="precio">Precio: $ ${parseFloat(
                plato.precio_unidad
              ).toFixed(2)}</p>
          `;
    }
    // carrusel.appendChild(tarjeta);
  }
}

function upd_size() {
  ancho_pantalla = window.innerWidth;
  mostrar_carrusel();
  console.log(ancho_pantalla);
}
function carrusel_siguiente() {
  let carrusel = document.getElementById("menu_carusell");
  let tarjeta_aux_der = document.getElementById("plato_menu_4");
  let tarjeta_izq = document.getElementById("plato_menu_1");
  let tarjeta_cen = document.getElementById("plato_menu_2");
  let tarjeta_der = document.getElementById("plato_menu_3");

  carrusel.removeChild(document.getElementById("plato_menu_0"));
  tarjeta_izq.className = "tarjeta_aux_izq";
  tarjeta_izq.id = "plato_menu_0";
  tarjeta_cen.className = "tarjeta_izq";
  tarjeta_cen.id = "plato_menu_1";
  tarjeta_der.className = "tarjeta_cen";
  tarjeta_der.id = "plato_menu_2";
  tarjeta_aux_der.className = "tarjeta_der";
  tarjeta_aux_der.id = "plato_menu_3";
  const new_plato_4 = document.createElement("div");
  new_plato_4.id = "plato_menu_4";
  new_plato_4.className = "tarjeta_aux_der";
  carrusel.appendChild(new_plato_4);

  // algo
  carrusel_index = (carrusel_index + 1) % platos_disponibles.length;
  mostrar_carrusel();
}

function carrusel_anterior() {
  // console.log("anterior");
  let carrusel = document.getElementById("menu_carusell");
  let tarjeta_aux_izq = document.getElementById("plato_menu_0");
  let tarjeta_izq = document.getElementById("plato_menu_1");
  let tarjeta_cen = document.getElementById("plato_menu_2");
  let tarjeta_der = document.getElementById("plato_menu_3");
  // let tarjeta_aux_der = document.getElementById("plato_menu_4");

  carrusel.removeChild(document.getElementById("plato_menu_4"));
  tarjeta_der.className = "tarjeta_aux_der";
  tarjeta_der.id = "plato_menu_4";
  tarjeta_cen.className = "tarjeta_der";
  tarjeta_cen.id = "plato_menu_3";
  tarjeta_izq.className = "tarjeta_cen";
  tarjeta_izq.id = "plato_menu_2";
  tarjeta_aux_izq.className = "tarjeta_izq";
  tarjeta_aux_izq.id = "plato_menu_1";
  const new_plato_0 = document.createElement("div");
  new_plato_0.id = "plato_menu_0";
  new_plato_0.className = "tarjeta_aux_izq";
  carrusel.insertBefore(new_plato_0, carrusel.firstChild);
  // carrusel.appendChild(new_plato_0);

  // tarjeta_aux_der.className = ''
  carrusel_index =
    (carrusel_index - 1 + platos_disponibles.length) %
    platos_disponibles.length;

  mostrar_carrusel();
}

function animar_der() {
  const elemento = document.getElementById("plato_menu_1");
  elemento.classList.toggle("animado");
}

function animar_izq() {
  const elemento = document.getElementById("plato_menu_1");
  elemento.classList.toggle("plato_menu_anim_izq");
}

//EJECUCION DIRECTA, NO REQUIERE LLAMADA, OSEA SE LLAMA SOLA QUE PUTA.

//ANONIMOUS FUNCTION! what im doing is building a global var to hold all the registers from the data base.
var platos_disponibles = [];
let ancho_pantalla = window.innerWidth;
let carrusel_index = 0;
// let win_resized = false;
window.addEventListener("resize", upd_size);
window.addEventListener("load", iniciar);
