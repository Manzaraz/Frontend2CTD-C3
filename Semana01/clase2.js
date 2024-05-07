/* -------------------------------------------------------------------------- */
/*                                  FUNCION 2                                 */
/* -------------------------------------------------------------------------- */
// 👇 Esta funcion nos devuelve 1, 2 o 3 según la elección del usuario.
// Hasta que el usuario ingrese un dato válido le seguimos pidiendo que elija.

function pedirJugada() {
  // inicilaizamos con la variable elección en 0
  let eleccion = 0

  do {
      // pedimos que elija una opcion válida  
      // convertimos el texto que nos llega en un número
      // y reemplazamos en valor guardado en la variable
      eleccion = parseInt(prompt("Ingrese para jugar 1(🗿 Piedra) 2(🧻 Papel) o 3(✂️Tijera)"))

  } while (isNaN(eleccion) || eleccion < 1 || eleccion > 3);

  // para mostrar por consola
  console.log("----------------------------");
  console.log("La elección del jugador es:")
  console.log(eleccion);
  console.log("----------------------------");

  // Finalmente devolevemos el valor de eleccion
  return eleccion
}
// let jugadaUsuario = pedirJugada() // Probamos la jugada

/* -------------------------------------------------------------------------- */
/*                                  FUNCION 3                                 */
/* -------------------------------------------------------------------------- */
function jugadaRandom() {
  // Math.random()👉🏻 https://www.w3schools.com/js/js_random.asp
  let numero = parseInt(Math.random() * 3 + 1);

  // mostramos los datos por consola
  console.log("----------------------------");
  console.log("La computadora saca:")
  console.log(numero);
  console.log("----------------------------");

  // finalmente devolvemos el valor de la eleccion aleatoria
  return numero;
}

// let jugadaPC = jugadaRandom() // Probamos la jugada


/* -------------------------------------------------------------------------- */
/*                                  FUNCION 4                                 */
/* -------------------------------------------------------------------------- */
// 👇 Esta funcion nos devuelve el resultado de la partida según las elecciones.
// Comparamos la eleccion de cada uno para saber quien pierde y quien gana.

function compararJugadas() {
  const RESULTADOS_POSIBLES = ['¡Genial, ganaste!', 'Esto fue un empate.', 'Una lástima, perdiste.'];

  const eleccionJugador = pedirJugada();
  const eleccionComputadora = jugadaRandom();

  // 👇 Por defecto el jugador gana
  let resultadoRonda = RESULTADOS_POSIBLES[0];

  // 👇 Chequeamos el caso en que empata
  if (eleccionJugador === eleccionComputadora) {
      resultadoRonda = RESULTADOS_POSIBLES[1];

      // 👇 Chequeamos los posibles casos en que pierde, sino ya sabemos que ganó
  } else if ((eleccionJugador === 1 && eleccionComputadora === 2) || (eleccionJugador === 2 && eleccionComputadora === 3) || (eleccionJugador === 3 && eleccionComputadora === 1)) {
      resultadoRonda = RESULTADOS_POSIBLES[2];
  }

  // devolvemos la frase con el resultado de la partida
  return resultadoRonda;
}

const resultadoDePartida = compararJugadas()



/*  //Otra versión de la Función 4
function compararJugadas() {
  const RESULTADOS_POSIBLES = ['¡Genial, ganaste!', 'Esto fue un empate.', 'Una lástima, perdiste.'];
  const OPCIONES = ['piedra', 'papel.', 'tijera'];

  const ELECCION_JUGADOR = pedirJugada()
  const JUGADA_PC = jugadaRandom()

  // El valor por defecto de la jugada es Gana
  let resultaRonda = RESULTADOS_POSIBLES[0]

  if (ELECCION_JUGADOR == JUGADA_PC) {
      resultaRonda = RESULTADOS_POSIBLES[1]
  } else if (
      (ELECCION_JUGADOR == 1 && JUGADA_PC == 2) ||
      (ELECCION_JUGADOR == 2 && JUGADA_PC == 3) ||
      (ELECCION_JUGADOR == 3 && JUGADA_PC == 1)
  ) {
      resultaRonda = RESULTADOS_POSIBLES[2]
  }

  return `La computadora eligió: ${OPCIONES[JUGADA_PC - 1]} \n eleccion Jugador: ${OPCIONES[ELECCION_JUGADOR - 1]} \n ${resultaRonda}`
}

// let jugada = compararJugadas()
// console.log(jugada);
// const resultadoDePartida = compararJugadas()
// console.log(resultadoDePartida);
*/