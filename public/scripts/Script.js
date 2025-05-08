function iniciar() {
  obtener_platos();
  setTimeout(set_nav_dots, 500);
  run_nav_dots();
}

function set_nav_dots() {
  var dot = document.getElementsByClassName("dot");
  //this for is for set every click eventlistener to every dot.
  for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener("click", function () {
      // console.log(`dot ${i + 1} clicked!`);
      for (let z = 0; z < dot.length; z++) {
        dot[z].id = "";
      }
      slider_index = i;
      this.id = "dot_alter";
      build_slider();
    });
  }
  dot[0].click();
}

//this block allows the slider change the plate automatically.
function run_nav_dots() {
  let dot = document.getElementsByClassName("dot");
  try {
    for (let i = 0; i < dot.length; i++) {
      setTimeout(() => {
        dot[i].click();
      }, i * 3500);
    }
  } catch (error) {
    if ((error == "Error from run_nav_dots:", error)) {
    }
  }
}

async function obtener_platos() {
  //Esta funcion llama los registros de Platos_pedidos del servidor.
  return fetch("http://192.168.0.150:3000/catering")
    .then((response) => response.json())
    .then((data) => {
      platos_disponibles = data;
      console.log(platos_disponibles);
      build_slider();
    })
    .catch((error) => console.error("Error: ", error));
  // try {
  //   let response = await fetch("/catering");
  //   let data = await response.json();
  //   platos_disponibles = data;
  //   console.log(platos_disponibles);
  //   build_slider();
  // } catch (error) {
  //   console.error("Error from obtener_platos: ", error);
  // }
}

function build_slider() {
  let index = 0;
  try {
    if (platos_disponibles.length > 0) {
      index = slider_index % platos_disponibles.length;
    }

    // console.log(`index actual ${index}`);
    let plato = platos_disponibles[index];
    //aqui capturo el elemento a modificar dinamicamente.
    let over_text = document.getElementById(`over_name`);
    let over_description = document.getElementById(`over_description`);
    let slider_img = document.getElementById(`slider_img`);

    //aqui se manejan los datos Binarios de las imagenes de los platos.
    let blob = new Blob([new Uint8Array(plato.ImageData.data)], {
      type: "image/jpeg",
    });
    let url = URL.createObjectURL(blob); //este nuevo URL se usa como src para la imagen en la tarjeta.
    //fin del manejo de los datos binarios.
    over_text.textContent = plato.nombre;
    over_description.textContent = plato.descripcion;
    slider_img.src = url;
  } catch (error) {
    console.log("Error from build_slider: ", error);
  }
}

function upd_size() {
  ancho_pantalla = window.innerWidth;
  build_slider();
  console.log(ancho_pantalla);
}

function slider_siguiente() {
  let slider = document.getElementById("menu_carusell");
  let tarjeta_aux_der = document.getElementById("plato_menu_4");
  let tarjeta_izq = document.getElementById("plato_menu_1");
  let tarjeta_cen = document.getElementById("plato_menu_2");
  let tarjeta_der = document.getElementById("plato_menu_3");

  slider.removeChild(document.getElementById("plato_menu_0"));
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
  slider.appendChild(new_plato_4);

  // algo
  slider_index = (slider_index + 1) % platos_disponibles.length;
  build_slider();
}

function slider_anterior() {
  // console.log("anterior");
  let slider = document.getElementById("menu_carusell");
  let tarjeta_aux_izq = document.getElementById("plato_menu_0");
  let tarjeta_izq = document.getElementById("plato_menu_1");
  let tarjeta_cen = document.getElementById("plato_menu_2");
  let tarjeta_der = document.getElementById("plato_menu_3");
  // let tarjeta_aux_der = document.getElementById("plato_menu_4");

  slider.removeChild(document.getElementById("plato_menu_4"));
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
  slider.insertBefore(new_plato_0, slider.firstChild);
  // slider.appendChild(new_plato_0);

  // tarjeta_aux_der.className = ''
  slider_index =
    (slider_index - 1 + platos_disponibles.length) % platos_disponibles.length;

  build_slider();
}

// function animar_der() {
//   const elemento = document.getElementById("plato_menu_1");
//   elemento.classList.toggle("animado");
// }

// function animar_izq() {
//   const elemento = document.getElementById("plato_menu_1");
//   elemento.classList.toggle("plato_menu_anim_izq");
// }

// //EJECUCION DIRECTA, NO REQUIERE LLAMADA.

// //ANONIMOUS FUNCTION! what im doing is building a global var to hold all the registers from the data base.
var platos_disponibles = [];
let ancho_pantalla = window.innerWidth;
let slider_index = 0;
// // let win_resized = false;
window.addEventListener("resize", upd_size);
window.addEventListener("load", iniciar);
setInterval(run_nav_dots, 17500);

function go_to_main() {
  window.location.href = "index.html";
}
