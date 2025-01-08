/* function charge_main_menu(){
    fetch('http://192.168.0.150:3000/platos')
        .then(response => response.json())
        .then(data => {
            const ListaPlatos = document.getElementById('menu_carusell');
            data.forEach (plato => {
                const div = document.createElement(`div`);
                div.className = 'plato_menu';
                // div.textContent = `${plato.Descripcion}`;
                if(plato.ImageData){
                    const img = document.createElement(`img`);
                    // const uint8array = new Uint8Array(plato.ImageData.data);
                    // const base64String = btoa(String.fromCharCode(...uint8array));
                    // console.log(`Base64 de ${plato.Descripcion}:`, base64String);
                    
                    // img.src = `data:image/jpg;base64,${base64String}`;
                    
                    // img.src = `data:image/jpeg;base64,${arrayBuffertoBase64(plato.ImageData.data)}`;
                    
                    const blob = new Blob([new Uint8Array(plato.ImageData.data)], {type: 'image/jpeg'});
                    const url = URL.createObjectURL(blob);
                    img.src = url;
                    console.log(plato.Descripcion);
                    
                    // console.log(`URL de la imagen de ${plato.Descripcion}:`, img.src);
                    // console.log('los Datos base64: ', btoa(String.fromCharCode(...new Uint8Array(plato.ImageData.data))) );
                    
                    
                    // img.src = `data:image/jpg;base64,${btoa(String.fromCharCode(...new Uint8Array(plato.ImageData.data)))}`;
                    img.alt = `${plato.Descripcion}`;
                    div.appendChild(img);
                }
                if(plato.Descripcion){
                    const descripcion = document.createElement(`p`);
                    descripcion.className = 'plato_descripcion';
                    descripcion.textContent = `${plato.Descripcion}`;
                    div.appendChild(descripcion);

                }
                if(plato.Precio_Unidad){
                    const precio = document.createElement(`p`);
                    precio.className = 'plato_precio';
                    precio.textContent = `${plato.Precio_Unidad}`;
                    div.appendChild(precio);

                }
                ListaPlatos.appendChild(div);
            });
        })
        .catch(error => console.error('error: ', error));
} */

/*NOTA: la funcion anterior la use para rellenar el Main con los registros
devueltos desde la api, pero se cargaban todos, fue bueno para probar pero por ahora
construire una mejor funcion para manejar los datos.*/

function iniciar() {
  // charge_main_menu();

  var izq_bttn = document.getElementById("izquierda");
  var der_bttn = document.getElementById("derecha");

  // var img_izq = document.getElementById("plato_menu_0");
  // img_izq.addEventListener("click", carrusel_anterior);

  izq_bttn.addEventListener("click", carrusel_anterior);
  der_bttn.addEventListener("click", carrusel_siguiente);

  obtener_platos();
}
function obtener_platos() {
  //Esta funcion llama los registros de Platos_pedidos del servidor.
  return fetch("http://192.168.0.150:3000/platos")
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
  carrusel.innerHTML = ""; //Limpiar el contenido anterior.

  let numero_tarjetas = 3;
  if (ancho_pantalla < 1250 && ancho_pantalla > 650) {
    numero_tarjetas = 2;
  }
  if (ancho_pantalla < 650) {
    numero_tarjetas = 1;
  }

  for (let i = 0; i < numero_tarjetas; i++) {
    const index = (carrusel_index + i) % platos_disponibles.length;
    const plato = platos_disponibles[index];
    const tarjeta = document.createElement("div");
    // console.log(plato[index].Descripcion);
    //aqui se manejan los datos Binarios de las imagenes de los platos.
    const blob = new Blob([new Uint8Array(plato.ImageData.data)], {
      type: "image/jpeg",
    });
    const url = URL.createObjectURL(blob); //este nuevo URL se usa como src para la imagen en la tarjeta.
    //fin del manejo de los datos binarios.
    tarjeta.className = "plato_menu";
    tarjeta.id = `plato_menu_${i}`;
    tarjeta.innerHTML = `
            <h3>${plato.Descripcion}</h3>
            <img src=${url} alt="imagen del plato">
            <p>Precio: $ ${plato.Precio_Unidad}</p>
        `;
    carrusel.appendChild(tarjeta);
  }
}

function upd_size() {
  ancho_pantalla = window.innerWidth;
  mostrar_carrusel();
  // console.log(ancho_pantalla);
}
function carrusel_siguiente() {
  carrusel_index = (carrusel_index + 1) % platos_disponibles.length;
  mostrar_carrusel();
}

function carrusel_anterior() {
  console.log("anterior");
  carrusel_index =
    (carrusel_index - 1 + platos_disponibles.length) %
    platos_disponibles.length;
  // animar_izq();
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
let win_resized = false;
window.addEventListener("resize", upd_size);
window.addEventListener("load", iniciar);
