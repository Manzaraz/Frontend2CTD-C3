// 🚩 Antes de empezar, vinculemos el HTML solo con el script de clase 4.

const listadoNoticias = [{
    titulo: "¡SOMOS CAMPEONES DEL MUNDO!",
    epigrafe: "Argentina le ganó por penales a Francia y la Copa la levanta Messi, el mejor. ¡Vamos!",
    foto: "./img/futbol.jpeg"
},
{
    titulo: "Instituciones ejemplares: por qué tres escuelas de América Latina quedaron entre las 15 mejores del mundo",
    epigrafe: "Son dos establecimientos brasileños y uno colombiano.",
    foto: "./img/escuela.jpeg"
},
{
    titulo: "Xi Jinping llega a París para reunirse con Macron y Von der Leyen",
    epigrafe: "El presidente de China, Xi Jinping, llegó al Palacio del Elíseo de París, en Francia, para una reunión trilateral con el presidente de Francia.",
    foto: "./img/europa.jpeg"
}
]

// Vamos a trabajar con nodos de manera dinámica, sobre todo crearlos desde JS en vez de que estén estáticos en el HTML
// Para eso vamos a valernos de array listadoNoticias que tenemos más arriba
// ¿Cual es la idea? utilizar la información que nos llega del listado para presentarla en pantalla.

// Primero, mantengamos el HTML vinculado solo con clase5 y clase6 👌

/* -------------------------- PRACTICANDO ATRIBUTOS ------------------------- */
// Completemos correctamente el 'alt' de cada imagen con la frase "miniatura de noticia"

const imagenes = document.querySelectorAll('.noticias article img');
console.log(imagenes);
console.log("alt: "+imagenes[0].getAttribute('alt')) //vemos que está vacío
// rellenamos el atributo👇
imagenes[0].setAttribute('alt', 'miniatura de noticia');
console.log("alt: "+imagenes[0].getAttribute('alt')) // ahora vemos que es un texto

// Hagamoslo más dinámico y recorramos todas las imagenes👇
for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].setAttribute('alt', 'miniatura de noticia');
    console.log(imagenes[i])
}


/* ---------------------- PRACTICANDO CREACION DE NODOS --------------------- */
// 1- Ahora vamos a ir al HTML y eliminar los 3 Article que se encuentran en el main.
// 2- Comentamos la parte de este código de "Practicando atributos"
// 3- Vamos a crear de a uno e insertarlos en el HTML usando un bucle👇

const main = document.querySelector('main');

listadoNoticias.forEach(noticia => {
    // creamos los elementos👇
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');

    // completamos los nodos con sus propiedades👇
    h2.innerText = noticia.titulo
    img.setAttribute('src', noticia.foto)
    img.setAttribute('alt', "miniatura de noticia")
    p.innerText = noticia.epigrafe

    // armamos los nodos dentro de donde van👇
    article.appendChild(h2)
    article.appendChild(img)
    article.appendChild(p)

    // finalmente lo insertamos en el HTML👇
    main.appendChild(article)
})



/* -------------------------------------------------------------------------- */
/*                          CONSIGNA MESA DE TRABAJO                          */
/* -------------------------------------------------------------------------- */
// Antes de comenzar vamos a comentar la parte de PRACTICANDO ATRIBUTOS y PRACTICANDO CREACION DE NODOS.
// Una vez que solo tenemos el código comentado podemos empezar la practica.
// 1- Debemos reutilizar el "listadoNoticias" para lograr el mismo resultado de crear los nodos dinamicamente.
// 2- La diferencia ahora radica en utilizar un bucle y dentro del mismo utilizar la notación de Plantillas Literales (con comillas invertidas -> ``)
// 3- El resultado debe ser el mismo que en el caso anterior pero vamos a implementar el método innerHTML para insertar la plantilla creada.
// Ejemplo: si quiero insertar un titulo en el body, haría los siguiente:
// document.querySelector('body').innerHTML += `<h1>Nuevo Título</h1>`;

function renderizandoElementos() {
// desarrollar la consigna aquí


}
renderizandoElementos();