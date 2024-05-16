/* -------------------------------------------------------------------------- */
/*                        [4] FUNCION: marcar favorito                        */
/* -------------------------------------------------------------------------- */
// - buscar el album por id en el array 
// - cambiar el estado del like
// - volver a renderizar
function marcarFavorito() {
    // Debemos seleccionar todos los botones de like
    // <i id="x123" class="fa fa-heart favorito"></i>
    const botnesLike = document.querySelectorAll(".fa-heart")
    // console.log(botnesLike);

    botnesLike.forEach( boton => {
        boton.addEventListener("click", function (evento) { // a cada boton agrego un listener para que pueda ver quien desencadeno el evento
            console.log(evento);
            console.log(evento.target);
            console.log(evento.target.id); // es un dato util guardar este id del evento lanzado para iterarlo luego

            // variable para guardar el id
            let albumId = evento.target.id

            albumesFamosos.forEach(album => {
                if (albumId == album.id) {
                    console.log(`Coinciden los ids de albumId: ${albumId}, con el id del album iterado: ${album.id}`);
                    console.log(album.like);

                    // if (album.like == true) {
                    //     album.like = false
                    // } else {
                    //     album.like = true                        
                    // }

                    album.like = !album.like
                    console.log(album.like);
                }
            });

            // Renderizar (pintar) nuevamente las tarjetas para que se pinte los like de los álbumes
            renderizarAlbumes(albumesFamosos)
            mostrarDatosEnPerfil(albumesFamosos)

            // Recursividad: para agreagar nuevamente el listener para seguir escuchado el eveto de los botones
            marcarFavorito()
        })
    })
}
marcarFavorito()



/* ----------------------------- MESA DE TRABAJO ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                         [5] FUNCION: Eliminar album                        */
/* -------------------------------------------------------------------------- */
// Debemos desarrollar la funcion de eliminar un album. Para esto le vamos a 
// preguntar al usuario cual quiere eliminar.
// Vamos a seguir las indicaciones que nos permiten lograrlo utilizando eventos.
// 1- Hay que escuchar el evento de 'keydown' para detectar cuando el usuario presiona la tecla f ✅
// 2- Una vez que detectamos la tecla, debemos mostrarle un prompt al usuario para que ingrese el nombre del album que desea eliminar✅
// 3- Podemos buscar la posicion del almbum buscado en el array con la funcion .findIndex()
// 4- Si la busqueda nos da un resultado válido, procedemos a borrar el objeto del array
// 5- Acto seguido debemos llamar a las funciones de renderizar y marcar favorito para que sean nuevamente aplicadas.



window.addEventListener("keydown", eliminarAlbum )

function eliminarAlbum(event) {
    console.log(event);
    console.log(event.code);
    console.log(event.key);


}

// eliminarAlbum()