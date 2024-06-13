window.addEventListener("load", function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    // const form = document.querySelector("form")
    const nombre = document.querySelector("#inputNombre");
    const apellido = document.querySelector("#inputApellido");
    const email = document.querySelector("#inputEmail");
    const password = document.querySelector("#inputPassword");
    const passwordRepetida = document.querySelector("#inputPasswordRepetida");
    const url = "https://todo-api.digitalhouse.com/v1";
  
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Validación de contraseñas
      if (password.value !== passwordRepetida.value) {
        alert("Las contraseñas no coinciden. Por favor, vuelva a ingresarlas.");
        return;
      }

      const payload = {
        firstName: nombre.value,
        lastName: apellido.value,
        email: email.value,
        password: password.value
      }
  
      const settings = {
        method: "POST",
        body: JSON.stringify(payload), // json.stringify  me traduce en un objeto JSON, para guardarlo en al DB
        // body: payload, // esto dará un error
        headers: {
          "content-type": "application/json"
        }
      };
  
      // una vez armado el objeto settings con la carga util "payload", llamamos a la funcion que se encarga de hacer el login
      realizarRegister(settings);
    });
  
    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
      // console.log(settings);
  
     fetch(`${url}/users`, settings)
      .then( response => {
          console.log(response);
          
          // manejar el error de la request, si todo va bien, esta respuesta la capturaremos en el siguiente .then
          if (response.ok) {
              return response.json()
          }
  
          // Si hay un error, fuerzo el error para capturarlo en el .catch
          return Promise.reject(response)
  
      })
      .then( data => { // data es ese JSON del response, convetido en un objeto literal de javascript
          console.log(data);
          console.log(data.jwt);
  
          if (data.jwt) {
              // Guardamos el dato JWT en LocalStorage (ese token de autenticacion)
              localStorage.setItem("jwt", JSON.stringify(data.jwt))
  
              form.reset() // para limpiar los campos de los inputs del formulario
  
              // redireccionamos a nuestro dashboard de todo (lo que vendría a ser nuestro feed del facebook)
              location.replace("./mis-tareas.html")
          }
      })
      .catch( err => {
          console.log(err.status); // CHECKAMOS la propiedad status , para validar el tipo de error
  
          // 400  Contraseña incorrecta
          // 404  El usuario no existe
          // 500	Error del servidor, LA API ESTA FUERA DE SERVICIO
  
          if (err.status == 400) {
              console.warn(`Error ${err.status}: Contraseña incorrecta`);
              alert("Contraseña incorrecta. Por favor vuelva a ingresarlo")
          } else if (err.status == 404) {
              console.warn(`Error ${err.status}: El usuario no existe`);
              alert("El usuario no existe, revise el email")                
          } else {
              console.error("Error del servidor | url no existe")
              alert("Error del servidor o url no existe, comúniquese con el proveedor")
          }
      })        
  };
  
});