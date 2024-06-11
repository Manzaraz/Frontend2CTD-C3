window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    //    const form = document.querySelector("form")
    const email = document.querySelector("#inputEmail")
    const password = document.querySelector("#inputPassword")
    const url = "https://todo-api.digitalhouse.com/v1"



    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
       event.preventDefault()

        //Creamos el cuerpo de la request (petición al servidor)
        const payload = {
            email: email.value,
            password: password.value,
        }
        // console.log(payload);

        // Configuramos la request (consulta) a la API
        const settings = {
           method: "POST",
           body: JSON.stringify(payload),
           headers: {
            "Content-Type": "application/json"
           }
        }
 
        realizarLogin(settings)



    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
       console.log(settings);
       console.log("🏄🏻‍♂️Lanzando la consulta a la API....");

        fetch(`${url}/users/login`, settings)
            .then( response => {
                console.log(response);

                // manejar el error de la request, si todo va bien, esta respuesta la capturaremos en el siguiente .then
                if (response.ok) return response.json(response)

                // Si hay un error, fuerzo el error para capturarlo en el .catch
                return Promise.reject(response)
            })
            .then( data => {
                console.log(data);
                console.log(data.jwt);

                if (data.jwt) {
                    // guardar el dato de JWT en el local storfage (ese token), para hacer el login
                    localStorage.setItem("jwt", JSON.stringify(data.jwt))

                    form.reset() // para limpiar los campos de los inputs del formulario

                    location.replace("./mis-tareas.html") // redireccionamos a nuestro dashboard de todo

                }

            })
            .catch( err => {
                // console.log(err);
                // console.log(err.status);

                // 400 Contraseña incorrecta
                // 404	El usuario no existe
                // 500	 Error del servidor
                if (err.status == 400) {
                    console.warn("Contraseña incorrecta");
                    alert("Contraseña incorrecta");
                } else if (err.status == 404) {
                    console.warn("Usuario inexistente, verifique su email");
                    alert("Usuario inexistente, verifique su email");
                } else {
                    console.error("Error del servidor");
                    alert("Aplicación con tareas de mantenimiento");
                }
            })        
    };
});

// {
//     "email": "maverick@topgun.com",
//     "password": "no lo sabras"
//   }