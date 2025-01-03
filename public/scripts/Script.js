function charge_main_menu(){
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
}
function iniciar(){
    charge_main_menu();
}
// -- 
// function arrayBuffertoBase64(buffer){
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for(let i = 0; i < len; i++){
//         binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
// }

window.addEventListener("load", iniciar);
