// en un mundo ideal la api me trae la info casi al instante
// const getData = () => { 
//     return listadoComentarios
//  }

//  console.log(getData());
// Qué son las promesas? Son un objeto de javascript que me permite evaluar la promesa de recibir algo y que puede tardar en el tiempo,
// en un mundo real la api puede tardar en traerme la info incluso por mas de un segundo

// const getData = () => { 
//     setTimeout(() => {
//         console.log("Resuelvo peticion");
//         return listadoComentarios
//     }, 3000);
//  }

// //  console.log(getData());

// const getData = () => { 
//     console.log("Inicio de la petición");

//     return new Promise ((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Resuelvo peticion");
//             return listadoComentarios
//         }, 3000);
//     })
//  }

//  console.log(getData());

listadoComentarios = []

const getData = () => { 
    console.log("Inicio de la petición");

    return new Promise ((resolve, reject) => {
        // diferentes funciones para ir a buscar ese recurso a la API, e inclusive trasformar esa data

        if (listadoComentarios.length > 0) {
            setTimeout(() => {
                console.log("Resuelvo peticion");
                resolve( listadoComentarios )
            }, 3000);
            
        } else { // indicar que el recurso no tiene contenido y tengo que manejar el rechazo de la respuesta
            console.log("Se rechazó la propuesta");
            reject({
                message: "Recurso no encontrado",
                status: 404
            })
        }
    })
 }

//  console.log(getData());
getData()
.then( (datos) => {
    console.log("Te contesto desde el .then()");
    console.log(datos);
})
.catch( error => console.log(error))

getData()
.then( (datos) => {
    console.log("Te contesto desde el .then()");
    console.log(datos);
    return reject(datos)
})
.then( datosPotables => {
    console.log("segundo then.... hago algo para renderizar");
})
.catch( error => console.log(error))

