/* -------------------------------------------------------------------------- */
/*                                  FUNCION 1                                 */
/* -------------------------------------------------------------------------- */

function iniciarJuego() {
    // Saludando al usuario
    alert("Bienvenido al juego Piedra🗿, Papel 📃 o Tijera✂️ de Frontend II")

    // Pedir el nombre al usuario y guardarlo en una variable
    let nombre = prompt("Ingrese su nombre por favor.")

    //    alert("Gracias por jugar " + nombre + ", ¡Mucha suerte!🍀")
    alert(`Gracias por jugar ${nombre}, ¡Mucha suerte!🍀`)

    // Mostramos datos por consola
    console.log("--------------")
    console.log("El jugador es:")
    console.log(nombre)
    console.log("--------------")
    

    return nombre
}

const nombreJugador = iniciarJuego()
console.log(nombreJugador.length);
console.log(isNaN(nombreJugador));

/* -------------------------------------------------------------------------- */
/*                          CONSIGNA MESA DE TRABAJO                          */
/* -------------------------------------------------------------------------- */
// 1- Modificar la funcion de iniciarJuego(), validar si ingresa un dato válido como nombre.
// 2- Si no ingresa un texto, o tiene menos de 3 caracteres debemos volverle a pedir que lo ingrese.
// 3- Finalmente el nombre devuelto debe estar todo en mayúsculas.





