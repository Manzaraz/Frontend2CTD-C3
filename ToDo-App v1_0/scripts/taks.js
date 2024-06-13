// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
// console.log(localStorage.jwt);
if (!localStorage.jwt) {
  location.replace("./index.html")
}



/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const formCrearTarea = document.querySelector(".nueva-tarea")
  const btnCerrarSesion = document.querySelector("#closeApp")
  const nuevaTarea = document.querySelector("#nuevaTarea")

  // variables de conexion a la api
  const url = "https://todo-api.digitalhouse.com/v1"
  const urlTareas = `${url}/tasks`
  const urlUsuario = `${url}/users/getMe`
  const token = JSON.parse(localStorage.jwt)
  // const token = localStorage.jwt


  obtenerNombreUsuario()
  consultarTareas()

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    const cerrarSesion = confirm("¿Estás seguro de que deseas cerra sesión?")

    if (cerrarSesion) {
    // limpiar el localStorage
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

    // hago nuestra consulta a la api para obtener los datos del usuario
    fetch(urlUsuario, settings)
      .then( response => {
        console.log(response);
        return response.json(response)
      })
      .then( data => {
        console.log(data);
        console.log(data.firstName);

        const nombreUsuario = document.querySelector(".user-info p")
        nombreUsuario.textContent = data.firstName
      })
      // .catch(err => console.log(err)) // lo comento... por que necesario, salvo que en la etapa del debbugin tenga problemas al capturar el token
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    }

    console.log("🚩 Consultando mis tareas");
    fetch(urlTareas, settings)
      .then( res => res.json())
      .then( tareas => {
        // console.log("Tareas del usuario");
        // console.log(tareas);

        // llamo a pintar las tareas en pantalla
        renderizarTareas(tareas)
        botonesCambioEstado()
        botonBorrarTarea()
      })
      .catch( err => console.warn(err))    



  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault()

    console.log("🚩 Tarea nueva");
    console.log(nuevaTarea.value);

    const payload = {
      description: nuevaTarea.value.trim(),
      // completed: true  // si no le envio esta propiedad, la api me creara completed en false
    }
    console.log(payload);

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      }
    }

    console.log("Creamos una nueva tarea en la api");
    fetch(urlTareas, settings)
      .then( response => response.json())
      .then( tarea => {
        console.log(tarea);
        consultarTareas(tarea)
      })
      .catch( err => console.warn(err))

      // necesitamos limpiar el formulario
      formCrearTarea.reset()
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    console.log(listado);
    // buscar los elementos del dom donde irán nuestras tareas
    const tareasPendientes = document.querySelector(".tareas-pendientes")
    const tareasTerminadas = document.querySelector(".tareas-terminadas")
    tareasPendientes.innerHTML = ""
    tareasTerminadas.innerHTML = ""

    // el contador de tareas finalizadas
    const cantidadFinalizadas = document.querySelector("#cantidad-finalizadas")
    let contador = 0
    cantidadFinalizadas.textContent = contador
    
    listado.forEach(tarea => {
      console.log(tarea.completed);

      /// veamos la fecha
      // console.log(tarea.createdAt);
      let fecha = new Date(tarea.createdAt).toLocaleDateString()

      if (tarea.completed) { // Imprimir las tareas completadas
        contador++ /// sumamos el contador, porque la tarea está completada

        // imprimir las tareas completadas
        tareasTerminadas.innerHTML += `
          <li class="tarea" data-id=${tarea.id}>
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id=${tarea.id}><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id=${tarea.id}><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
        `
      } else { // Imprimir las tareas pendientes
        tareasPendientes.innerHTML += `
          <li class="tarea" data-id=${tarea.id}>
            <button class="change" id=${tarea.id}><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha}</p>
            </div>
          </li>
        `
      }

    });

    // actualizamos el contador en pantalla, con el valor para las true
    cantidadFinalizadas.textContent = contador

  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    // capturamos todos los botones con la clase .change
    const btnsCambioEstado = document.querySelectorAll('.change ')

    btnsCambioEstado.forEach( boton =>{
      // a cada boton le agrego un evento
      boton.addEventListener("click", (ev) => {
        console.log("Cambio de estado de la tarea");
        console.log(ev.target);
        // console.log(ev.target.id);

        const id = ev.target.id
        const urlChange = urlTareas + `/${id}`
        // console.log(urlChange);
        const payload = {}

        //segun el tipo de boton que fue clickeado, cambiamos el estado de la tarea pendiente o no
        if (ev.target.classList.contains("incompleta")) {
          payload.completed = false
        } else {
          payload.completed = true          
        }
        console.log(payload);

        const settings = {
          method: "PUT",
          headers: {
            authorization: token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }

        fetch(urlChange, settings)
          .then( res => consultarTareas())
          // .then( res => {
            // console.log(res);
            // // llamar a consultar tareas 
            // consultarTareas()
            // return res.json()
          // })
          // .then( data => {
          //   console.log(data);
          //   consultarTareas()

          // } )       
          // .catch(err => console.log(err))
      })
    })  
  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

});