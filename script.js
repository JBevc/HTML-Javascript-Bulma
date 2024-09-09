let tasks = [];

// ---------------------- CONFIG BOTONES ----------------------------------

// Boton de aceptar create task
var aceptar = document.getElementById("addTaskButton");
aceptar.addEventListener("click", () => {
  addTaskHandler();
  loadModalEvents();
  closeAllModals();
});

// aceptar = document.getElementById("editTaskButton");
// aceptar.addEventListener(("click"),() => {
//   editTask();
//   closeAllModals();
// })

// Boton de cancelar create task
var cancelar = document.getElementById("cancelButton1");
cancelar.addEventListener("click", () => {
  closeAllModals();
});

// boton de canelar edit modal
cancelar = document.getElementById("cancelButton2");
cancelar.addEventListener("click", () => {
  closeAllModals();
});

// ----------------------------- CREAR TAREAS Y MODAL ---------------------------------------

// crear div de tarea y agregarlo a la columna
function createTaskComponent(taskElement) {
  const templateContent = `
    <div class="card cardTask js-modal-trigger" data-target="taskModal" id= "${taskElement.id}">
      <div class="media-content">
        <span class="tag ${taskElement.tagColor}"> </span>
        <p class="title is-6"> ${taskElement.tituloTask} </p>
      </div>
      <div class="content">
        <p> ${taskElement.descripcionTask} </p>
      </div>
    </div>
  `;

  const box = document.getElementById(
    String(taskElement.estadoTask).toLowerCase()
  );

  const element = box.querySelector(".buttonBox");
  // console.log("box", box);

  const elementoAgr = document.createElement("div");
  elementoAgr.innerHTML = templateContent;
  elementoAgr.addEventListener("click", () => addInfoModal(taskElement));

  box.insertBefore(elementoAgr, element);
}

// cargar tareas de la lista
function loadTasks(taskList) {
  taskList.forEach((element) => {
    console.log("aa", element);
    createTaskComponent(element);
  });
}

// Crear elemento tarea
function addTaskHandler() {
  // ignora evento reset de submit button
  //event.preventDefault(true);

  const tituloInput = document.getElementById("titulo").value.trim();
  const descInput = document.getElementById("descripcion").value.trim();
  const asignadoInput = document.getElementById("asignado").value.trim();
  const prioridadInput = document.getElementById("prioridad").value.trim();
  const estadoInput = document.getElementById("estado").value.trim();
  const fechaInput = document.getElementById("fechaLimite").value.trim();

  if (prioridadInput == "Alta") {
    color = "is-danger";
  }
  if (prioridadInput == "Media") {
    color = "is-warning";
  }
  if (prioridadInput == "Baja") {
    color = "is-success";
  }

  const tareaNueva = {
    estadoTask: estadoInput,
    descripcionTask: descInput,
    tituloTask: tituloInput,
    asignadoTask: asignadoInput,
    prioridadTask: prioridadInput,
    tagColor: color,
    fechaLimiteTask: fechaInput,
  };

  tasks.push(tareaNueva);
  createTaskComponent(tareaNueva);

  // Agregar la tarea al json
  createTaskFrom_db(tareaNueva);
}

// crear modal con info de la tarea
function addInfoModal(tareaModificar) {
  const templateModalContent = `<p class="title"> Editar Tarea </p>
            <div class="columns">
              <div class="column">
                <div class="box">
                  <div class="field">
                    <label class="label"> Título </label>
                    <div class="control">
                      <input class="input" id="titulo" type="text" placeholder="${tareaModificar.tituloTask}" style="color: #000;">
                    </div>
                  </div>
                </div>
                <div class="box">
                  <label class="label"> Asignado </label>
                  <div class="select">
                    <select id="asignado">
                      <option>Opción 1</option>
                      <option>Opción 2</option>
                      <option>Opción 3</option>
                    </select>
                  </div>
                </div>
                <div class="box">
                  <label class="label"> Estado </label>
                  <div class="select">
                    <select id="estado">
                      <option>Backlog</option>
                      <option>To do</option>
                      <option>In Progress</option>
                      <option>Blocked</option>
                      <option>Done</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="box">
                  <div class="field">
                    <label class="label"> Descripción </label>
                    <div class="control">
                      <input class="input" id="descripcion" type="text" placeholder="${tareaModificar.descripcionTask}" style="color: #000;">
                    </div>
                  </div>
                </div>
                <div class="box">
                  <label class="label"> Prioridad </label>
                  <div class="select"">
                    <select id="prioridad">
                      <option>Alta</option>
                      <option>Media</option>
                      <option>Baja</option>
                    </select>
                  </div>
                </div>
                <div class="box">
                  <div class="field">
                    <label class="label"> Fecha límite </label>
                    <div class="control">
                      <input class="input" id="fechaLimite" type="date" placeholder="${tareaModificar.fechaLimiteTask}" style="color: #000;">
                    </div>
                  </div>
                </div>`;

  const modalContent = document.getElementById("taskModal_content");
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }
  const elementoAgregar = document.createElement("div");
  elementoAgregar.innerHTML = templateModalContent;
  modalContent.append(elementoAgregar);
}

// function editTask(tareaModificar) {
//   const
// }

// cargar metodos para abrir-cerrar modal
function loadModalEvents() {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
}

// cerrar todos los modal
function closeAllModals() {
  function closeModal($el) {
    $el.classList.remove("is-active");
  }
  (document.querySelectorAll(".modal") || []).forEach(($modal) => {
    closeModal($modal);
  });
}

loadModalEvents();

//------------------------------------ UT3 TA1 -------------------------------------------------------

const url = "http://localhost:3000/tasks";

// Async/Await Approach
async function fetchDataAW() {
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json(); // extract JSON from response
    console.log("data: ", data);
    data.forEach((taskResponse) => tasks.push(taskResponse));
    loadTasks(tasks);

    // Agrega el evento para abrir el modal de editar
    loadModalEvents();

    return data;
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
}

async function createTaskFrom_db(tareaNueva) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tareaNueva),
    });

    const data = await response.json();
    const tarea = document.getElementById(data.id);

    return data;
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
}

// END - Async/Await Approach
fetchDataAW();
