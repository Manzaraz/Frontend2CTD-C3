// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
// console.log(localStorage);
// console.log(localStorage.jwt);
if (!localStorage.jwt){
  location.replace("./index.html")
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector("#closeApp")
  const formCrearTarea = document.querySelector(".nueva-tarea")
  const nuevaTarea = document.querySelector("#nuevaTarea")

  // Variables de conexion a la API
  const url = "https://todo-api.digitalhouse.com/v1";
  const urlUsuario = `${url}/users/getMe`
  const urlTareas = `${url}/tasks`
  const token = JSON.parse(localStorage.jwt)
  console.log(token);

  // lamamos a los fetch para obtener los datos de usuarios y sus tareas
  obtenerNombreUsuario()
  consultarTareas()

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    // console.log("Quiere cerrar sesión");
    const cerrarSesion = confirm("¿Estás seguro de que deseas cerrar sesión?")
  
    if (cerrarSesion) {
     // limpie el local storage y luego me redirija al home
     localStorage.clear()
     location.replace("./index.html")
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    }
    console.log(settings);

    // hacemos la consulta a la API
    fetch(urlUsuario, settings)
      .then( response => response.json())
      .then( userData => {
        console.log(userData);
        console.log(userData.firstName);

        const nombreDelUsuario = document.querySelector(".user-info p")
        nombreDelUsuario.textContent = userData.firstName
      } )
      .catch( err => console.log(err)) // no es siempre necesario usar el catch en esta instancia
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
        "content-type": "application/json",
      }
    }
    
    // hacemos la consulta a la API
    console.log("⛳️ Consultando mis tareas");
    fetch( urlTareas, settings )
      .then( response => response.json())
      .then( tareas => {
        console.log("Tareas del usuario");
        console.log(tareas);

        renderizarTareas(tareas)
        botonesCambioEstado()
        botonBorrarTarea()
      })
      .catch( err => console.log(err))
  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault()    

    console.log("🚩 nueva tarea.... creandose");
    console.log(nuevaTarea.value);

    // creamos nuestra bomba💣 para enviar a destino del fetch
    const payload = {
      description: nuevaTarea.value.trim(),
      // completed: true
    }

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        authorization: token,
        "content-type": "application/json"
      }
    }

    // Creamos nuestra tarea en la api
    console.log("Creando una nueva tarea en la db");
    fetch( urlTareas, settings )
      .then( response => response.json() )
      .then( tareaCreada => {
        console.log(tareaCreada);
        consultarTareas()
      })

    formCrearTarea.reset()// finalmente limpio el formulario
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    // console.log(listado);
    const tareasTerminadas = document.querySelector(".tareas-terminadas")
    const tareasPendientes = document.querySelector(".tareas-pendientes")
    tareasTerminadas.innerHTML = ""
    tareasPendientes.innerHTML = ""

    const cantidadFinalizadas = document.querySelector("#cantidad-finalizadas")
    let contador = 0
    cantidadFinalizadas.textContent = contador
    
    listado.forEach(tarea => {
      // la variable intermedia para manipular de la fecha
      let fecha = new Date(tarea.createdAt)

      // renderizar condicionalmente dependiendo si pose la propiedad completed en true.... caso contrario y imprimo las tareas pendientes
      if (tarea.completed) {
        contador++ // sumamos el contador pues está completed en true

        //imprimir las tareas completadas
        tareasTerminadas.innerHTML += `
          <li class="tarea" data-id="${tarea.id}">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}"><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
        `
      } else {
        // ahora me queda imprimir las tareasd pendientes
        tareasPendientes.innerHTML += `
          <li class="tarea" data-id="${tarea.id}">
            <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>
        ` 
      }      
    });

    //actualizar el contador en la pantalla
    cantidadFinalizadas.textContent = contador
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    const btnsCambioDeEstado = document.querySelectorAll(".change")
    // console.log(btnsCambioDeEstado);

    btnsCambioDeEstado.forEach( boton => {
      //a cada boton le asignamos una funcionalidad
      boton.addEventListener("click", (ev) => { 
        console.log(ev.target);
        console.log(ev.target.id);
        const id = ev.target.id
        const urlChange = `${urlTareas}/${id}`
        console.log(urlChange);

        const payload = { }

        //segun el tipo de boton que fue clickeado, cambiamos el estado de la tarea

        if (ev.target.classList.contains("incompleta")) {
          // si esta completa, la paso pendiente
          payload.completed = false
        } else {
          // si esta incompleta, la paso a TERMINADA
          payload.completed = true  
        }
        console.log(payload);

        const settings = {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            authorization: token,
            "content-type": "application/json"
          }
        }

        fetch( urlChange, settings )
          .then( response => consultarTareas()) // refactorizacion... ya habiendo debugeado lo que viene a continuacion
          // .then( response => {
          //   console.log(response)
          //   consultarTareas()
          // })
          // .catch(err => console.log(err))
       })
    })
  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    //obtenemos los botones de borrado
    const btnsBorrar = document.querySelectorAll('.borrar');
    
    btnsBorrar.forEach(boton => {
      //a cada boton de borrado le asignamos la funcionalidad
      boton.addEventListener("click", (e) =>{
        const id = e.target.id;
        const urlDelete = urlTareas + `/${id}`      
        
        const settings = {
          method: "DELETE",
          headers: {
            authorization: token,
            "Content-Type" : "application/json"
          }
        }

        fetch(urlDelete, settings)
        .then(response => {
            console.log("Borrando tarea...");
            console.log(response.status) // Como el status del objeto Response es 200, esto significa que ya se ha eliminado la tarea, por ende... no hace falta que haga otra acción con el objeto response
            
            // entonces sólo me queda llamar al método consultarTareas(), para que ésta me las actualice (haciendo un nuevo fetch) y las pinte nuevamente en pantalla.
            consultarTareas();
          })
          .catch(err => console.log("Error: " + err)) // si hay un error identifico el problema.
      })
   })
  };
});