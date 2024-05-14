/* --------------------------- listado de almbumes --------------------------- */
const albumesFamosos = [{
    id: "x123",
    nombre: "Nevermind",
    imagen: "https://m.media-amazon.com/images/I/71DQrKpImPL._SL1400_.jpg",
    like: true
},
{
    id: "y456",
    nombre: "Thriller",
    imagen: "https://img.discogs.com/LfnH5tbhcZ4xRMNLAodIyvea9xA=/fit-in/600x600/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-294033-1151290881.jpeg.jpg",
    like: false
},
{
    id: "z789",
    nombre: "The wall",
    imagen: "https://img.discogs.com/EbLYco6R1A-5Z7QJ4t4O1JSzsM8=/fit-in/587x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4620059-1370165707-3841.jpeg.jpg",
    like: true
},
{
    id: "a987",
    nombre: "Abbey Road",
    imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/RDH5EPH2TNENPI73NBWUWWMLPA.jpg",
    like: false
},
{
    id: "b654",
    nombre: "Origin of Symmetry",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_967206-MLA26105577132_102017-O.webp",
    like: false
},
{
    id: "c321",
    nombre: "Back in Black",
    imagen: "https://i1.wp.com/www.scienceofnoise.net/wp-content/uploads/2020/07/068660474366a63e1263e53ff370eb50.jpg",
    like: false
}
];



/* -------------------------------------------------------------------------- */
/*                  [1] FUNCION: captar el nombre de usuario                  */
/* -------------------------------------------------------------------------- */
//do while, prompt, innerText
function obtenerUsuario() {
    const nombreDeUsuario = document.querySelector("#nombreUsuario")
    // console.log(nombreDeUsuario);

    let usuario = ""

    do {
        usuario = prompt("Ingrese su nombre de usuario:")
    } while (usuario == null && usuario == "" && usuario.length < 3);

    // guardar la primera letra como mayuscula
    /* // Esto es para capitalizar paso a paso
    let primraLetra = usuario.charAt(0).toUpperCase()
    let restoDelNombre = usuario.slice(1).toLowerCase()
    // console.log(primraLetra + restoDelNombre);
    */

    // divido los nombres del usuario y los guardo en nombres... me da un array de nombres
    let nombres = usuario.split(" ")
    // console.log(nombres);

    // iteraremos ese array de nombres para capitalizar cada nombre
    usuario = nombres.map( nombre => {
        return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()
    }).join(" ")
    
    // refactorizar el map para que quede en una sola linea
    usuario = nombres.map( nombre => nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()).join(" ")    

    console.log(usuario);

    nombreDeUsuario.innerHTML = usuario
    // nombreDeUsuario.textContent = usuario
    // nombreDeUsuario.createTextNode = usuario // no es la manera correcta de usar createTextNode
    // nombreDeUsuario.createTextNode(usuario) // no es la manera correcta de usar createTextNode
    // nombreDeUsuario.append(document.createTextNode(usuario)) // Es la manera correcta de usar createTextNode☑️
}

// obtenerUsuario();

/* -------------------------------------------------------------------------- */
/*                [2] FUNCION: renderizar tarjetas del almbumes               */
/* -------------------------------------------------------------------------- */
//forEach, template strings, innerHTML
function renderizarAlbumes(listado) {
    const covers = document.querySelector(".covers")
    covers.innerHTML = ""

    listado.forEach(album => {
            /* // Metodo de insercion de nodos
            // primero debo crear los selectore
            const li = document.createElement("li") // padre o wrapper (envolvedor)
            const img = document.createElement("img")
            const p = document.createElement("p")
            const i = document.createElement("i")
        
            // Agregamos los atributos de cada nodo de las etiquetas creadas
            li.setAttribute("data-id", album.id )    
            // img.setAttribute("src", album.id)
            // img.setAttribute("alt", album.nombre)
            img.src = album.imagen
            img.alt = album.nombre

            p.textContent = album.nombre
            i.id = album.id
            // i.classList.add("fa fa-heart")// esto me da error porque el metodo classlist no funciona sobre un elemento que no este colocado en el dom
            i.setAttribute("class",`fa fa-heart${album.like ? " favorito" : ""}`)// de esta manera lo remedio

            // cargamos los elementos al wraper (li)
            li.appendChild(img)
            li.appendChild(p)
            li.appendChild(i)

            covers.appendChild(li)
            */
           covers.innerHTML += `
            <li data-id="${album.id}x123">
                <img src="${album.imagen}" alt="album ${album.nombre}">
                <p>${album.nombre}</p>
                <i id="${album.id}" class="fa fa-heart${album.like ? ' favorito' : ''}"></i>
            </li>
           `        
    });

}

renderizarAlbumes(albumesFamosos);


/* ----------------------------- MESA DE TRABAJO ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                   [3] FUNCION: mostrar datos del usuario                   */
/* -------------------------------------------------------------------------- */
// Dentro del div '.perfil' tenemos un parrafo con 2 span en los que debemos colocar
// correctamente su contenido.
// Para eso debemos hacer ciertos calculos y colocar esa info en el HTML. Debemos:
// 1- contar la cantidad de albumes del array y pintarlo en el span correspondiente
// 2- contar la cantidad de favoritos y pintarlo en el span correspondiente
// 3- tener en cuenta: usar las palabra en plural o en singular, según cuando
// sea necesario ( es decir: 1 album, 1 favorito / 2 albumes, 3 favoritos )
function mostrarDatosEnPerfil(albumes) {
    // desarrollar la función 👇
    
}
mostrarDatosEnPerfil(albumesFamosos);