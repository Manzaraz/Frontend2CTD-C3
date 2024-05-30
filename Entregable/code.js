let datosPersona = {
  nombre: "",
  edad: 0,
  ciudad: "",
  interesPorJs: "",
};
const listado = [
  {
    imgUrl: "https://huguidugui.files.wordpress.com/2015/03/html1.png",
    lenguajes: "HTML y CSS",
    bimestre: "1er bimestre",
  },
  {
    imgUrl: "https://jherax.files.wordpress.com/2018/08/javascript_logo.png",
    lenguajes: "Javascript",
    bimestre: "2do bimestre",
  },
  {
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
    lenguajes: "React JS",
    bimestre: "3er bimestre",
  },
];
const profileBtn = document.querySelector("#completar-perfil");
const materiasBtn = document.querySelector("#obtener-materias");
const verMasBtn = document.querySelector("#ver-mas");
const cambiarTema = document.querySelector("#cambiar-tema");
profileBtn.addEventListener("click", renderizarDatosUsuario);
materiasBtn.addEventListener("click", recorrerListadoYRenderizarTarjetas);
cambiarTema.addEventListener("click", alternarColorTema);
/* --------------------------- NO TOCAR HASTA ACÁ --------------------------- */
function obtenerDatosDelUsuario() {
  /* --------------- PUNTO 1: Escribe tu codigo a partir de aqui --------------- */
  const name = prompt("Ingresa tu nombre: ");
  const birthYear = parseInt(prompt("Ingresa el año en el que naciste: "));
  const city = prompt("Ingresa la ciudad donde vives: ");
  const likeJavascript = confirm("¿Te gusta Javascript?");
  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  datosPersona = { // Si quieren saber más de destructuring ➡️ https://www.freecodecamp.org/espanol/news/desestructuracion-de-arreglos-y-objetos-en-javascript/
    nombre: capitalizeWords(name),
    edad: 2024 - birthYear,
    ciudad: capitalizeWords(city),
    interesPorJs: likeJavascript ? "Si" : "No",
  };
  return datosPersona;
}
function renderizarDatosUsuario() {
  /* ------------------- NO TOCAR NI ELIMINAR ESTA FUNCION. ------------------- */
  obtenerDatosDelUsuario();
  /* --------------- PUNTO 2: Escribe tu codigo a partir de aqui --------------- */
  const nombrePersona = document.getElementById("nombre");
  const edadPersona = document.getElementById("edad");
  const ciudadPersona = document.getElementById("ciudad");
  const javascript = document.getElementById("javascript");
  nombrePersona.textContent = datosPersona.nombre;
  edadPersona.textContent = datosPersona.edad;
  ciudadPersona.textContent = datosPersona.ciudad;
  javascript.textContent = datosPersona.interesPorJs;
}
function recorrerListadoYRenderizarTarjetas() {
  /* ------------------ PUNTO 3: Escribe tu codigo desde aqui ------------------ */
  const fila = document.getElementById("fila");
  if (fila.children.length > 0) {
    return;
  }
  fila.innerHTML = "";
  listado.forEach((card) => {
      fila.innerHTML += `
          <div class="caja">
              <img src="${card.imgUrl}" alt="${card.lenguajes}> 
              <p class=" lenguajes"="">Lenguaje(s): ${card.lenguajes}<p></p>
              <p class="bimestre">Bimestre: ${card.bimestre}</p>    
          </div>    
        `;
    });
    const cards = document.querySelectorAll(".caja");
    cards.forEach((card) => {
      card.style.justifyContent = "center";
  });
  const seccionMaterias = document.querySelector("section");
  seccionMaterias.scrollIntoView({ behavior: 'smooth' }); /// Gracias Karina Arango por esta joya del código •
}
function alternarColorTema() {
  /* --------------------- PUNTO 4: Escribe tu codigo aqui --------------------- */
  const sitio = document.getElementById("sitio");
  sitio.classList.toggle("dark");
}
/* --------------------- PUNTO 5: Escribe tu codigo aqui --------------------- */
const sobreMi = document.getElementById("sobre-mi");
document.addEventListener("keydown", (e) => {
  sobreMi.scrollIntoView({ behavior: 'smooth' });
  if (e.code === "KeyF") {
    setTimeout(() => {
      sobreMi.classList.remove("oculto");      
    }, 750);
  }
});