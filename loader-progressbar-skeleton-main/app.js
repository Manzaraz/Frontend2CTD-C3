/* --------------------------------- spinner -------------------------------- */
// necesitamos clickear el boton y que desaparezca el texto y se vea el gif unos segundos
const btn = document.querySelector('button');
const btnImg = document.querySelector('button img');
const btnTexto = document.querySelector('button span');

btn.addEventListener("click", () => { 
    console.log("hiciste click");

    // invertimos las clases de los elementos dentro del boton
    invertirClases()
    // btn.setAttribute("disabled","")
    btn.disabled = true

    setTimeout(() => {
        invertirClases()
        btn.removeAttribute("disabled")
    }, 2500);
})

function invertirClases() {
    btnImg.classList.toggle("oculto")
    btnTexto.classList.toggle("oculto")
}


/* ----------------------------- barra progreso ----------------------------- */
const barra = document.querySelector('#barra');
const relleno = document.querySelector('#relleno');

let porcentaje = 0 
// pintamos el resultado del porcentaje en la barra
relleno.style.width = `${porcentaje}%`

// Creamos un bucle para incremetntar el porcentaje
const intervalo = setInterval(() => {
    if (porcentaje < 95) {
        porcentaje++
        relleno.style.width = `${porcentaje}%`
        // console.log(porcentaje);
    } else {
        // frenamos el intervalo cuando llegue al 100%
        clearInterval(intervalo)
    }
}, 50);

/// luego en alguna parte del codigo cuando haya recibido la respuesta del fetch
// relleno.style.width = `100%`

// para aplicar al <progress>
const progress = document.querySelector("progress")

const intervalo1 = setInterval(() => {
    if (porcentaje < 95) {
        porcentaje++
        progress.value = porcentaje
    } else {
        clearInterval(intervalo1)
    }
}, 50);


/* -------------------------------- skeleton -------------------------------- */

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/pikachu';
const pokemon = document.querySelector('#pokemon')
const skeleton = document.querySelector('.skeleton');

fetch(apiUrl)
    .then( res => res.json())
    .then( data => {
        // console.log(data);
        // console.log(data.name);
        // console.log(data.sprites.front_female);
        // console.log(data.types[0].type.name);
        const nombre = data.name
        const imagen = data.sprites.front_female
        const tipo = data.types[0].type.name;
        // console.log(nombre, imagen, tipo);

        //remuevo el skeleton del div pokemon
        skeleton.remove()

        pokemon.innerHTML += componenteTarjeta(nombre, imagen, tipo)


    })


const componenteTarjeta = (name, img, type) => { 
    return `
        <article >
            <h2>${name}</h2>
            <img src="${img}" alt="pokemon">
            <h6>Tipo: ${type}</h6>
        </article>
    
    `
}
