// 👇Acá vemos que el document nos dá acceso a todo el DOM, ese arbol que contiene todos los nodos de nuestro sitio
// console.log(document);


/*
Ahora vamos a utilizar 2 métodos propios de document que nos facilitan "pescar" elementos en el sitio:
- querySelector()
- querySelectorAll()
*/

// Obtenemos el titulo principal
const titulo = document.querySelector("h1")
// Ahora vayamos a la consola y despleguemos la flecha que nos muestra todas las propiedades del nodo
// console.log(titulo);
// console.log(titulo.textContent);
// console.log(titulo.innerText);


// nos traemos ahora un listado de nodos 👇
const itemsMenu = document.querySelector(".info")
const infoExtra = document.querySelector(".info .clima")
const navItems = document.querySelectorAll("ul li")
// hacemos un selector más específico👇
const imagen = document.querySelector("[src='./img/futbol.jpeg']")


// console.log(itemsMenu);
// console.log(infoExtra);
// console.log(navItems);
// console.log(imagen);
// console.log(itemsMenu.children);

/* ------------------------------- Practicando ------------------------------ */
// Seleccionamos la lista de noticias y revisamos su informacion interna.
// Aprovechamos que la NodeList es un ITERABLE, entonces podemos recorrerla.
// 🚩 No es un Array.
const articulos = document.querySelectorAll("article")
// console.log(articulos);

// Ahora hacemos la misma practica pero con ForEach, y accedemos a propiedades de los nodos.
// for (let i = 0; i < articulos.length; i++) {
//     console.log(articulos[i])
// }

// vamos a practiacar con ForEach
articulos.forEach(function (articulo) {
    const titular = articulo.querySelector("h2").textContent
    // console.log(titular)
})

// for (const noticia of articulos) {
for (const noticia of articulos) {
    const texto = noticia.querySelector("p").innerText
    // console.log(texto);
    // console.log(texto.length);
}

// 💪🏼 Ahora llevemos esto un paso adelante!
// Vamos a interactuar con el DOM para agregarle mas estilos a nuestro sitio.
// 👇 Primero capturemos todos los elementos que vamos a modificar.
const sitio = document.querySelector("body")
const btnTema = document.querySelector(".tema button")
const menuItems = document.querySelectorAll("nav li")
const contenedorDeNoticias = document.querySelector("main")


// console.log(contenedorDeNoticias);

/* ---------------------------- Editado los ITEMS --------------------------- */
// 👇 Acá podemos ver todas las propiedades CSS que podemos modificar con JS
// console.log(menuItems[2].style)

menuItems.forEach( (item) => {
    item.style.textTransform = "uppercase"
    item.style.color = "aqua"
    item.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    item.style.borderRadius = "50vh"
    item.style.padding = "10px"
    item.style.marginTop = "20pox"
})


/* ----------------------------- Editando clases ---------------------------- */
// vamos probando uno a uno los métodos
console.log(sitio.classList)
console.log(sitio.classList.contains("dark"))

console.log(sitio.classList)
console.log(sitio.classList.add("dark"))

console.log(sitio.classList)
console.log(sitio.classList.remove("dark"))

console.log(sitio.classList)
console.log(sitio.classList.toggle("dark"))
console.log(sitio.classList.toggle("dark"))
console.log(sitio.classList.toggle("dark"))




/* -------------------------------------------------------------------------- */
/*                          CONSIGNA MESA DE TRABAJO                          */
/* -------------------------------------------------------------------------- */
// Primero debemos comentar o eliminar las líneas que modifican las clases de "sitio"
// 1- Desarrollar la función a continuacion para que el usuario elija el tema del sitio.
// 2- Debemos preguntarle al usuario mediante un confirm si desea usar el modo oscuro.
// 3- Si el usuario confirma debemos aplicar la clase "dark" al "sitio", si cancela debe quedar en modo claro.
// 4- A su vez, si está en modo onsecuritypolicyviolation, el texto del boton debe decir "Cambiar a modo claro 🌞". De lo contrario, si está en modo claro debeb decir "Cambiar a modo oscuro 🌛"
function elegirTema() {
    const sitio = document.querySelector("body");
    const btnTema = document.querySelector(".tema button");
    const confirmacion = confirm("¿Desea usar el modo oscuro?");
  
    if (confirmacion) {
      sitio.classList.add("dark");
      btnTema.textContent = "Cambiar a modo claro 🌞";
    } else {
      sitio.classList.remove("dark");
      btnTema.textContent = "Cambiar a modo oscuro 🌛";
    }
  }
  
  function changeTheme() {
    const sitio = document.querySelector("body");
    const btnTema = document.querySelector(".tema button");
  
    sitio.classList.toggle("dark");
  
    if (sitio.classList.contains("dark")) {
      btnTema.textContent = "Cambiar a modo claro 🌞";
    } else {
      btnTema.textContent = "Cambiar a modo oscuro 🌛";
    }
  }
  
  elegirTema();
  