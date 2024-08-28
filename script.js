let tasks = [];

function createTaskComponent(taskElement) {
  const templateContent = `
    <div class="card cardTask js-modal-trigger" data-target="modal-js-example">
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
  console.log("box", box);
  const elementoAgregar = document.createElement("div");
  elementoAgregar.innerHTML = templateContent;
  box.insertBefore(elementoAgregar, element);
}
function loadTasks(taskList) {
  taskList.forEach((element) => {
    createTaskComponent(element);
  });
}

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

  const id = tasks.length + 1;
  const tareaNueva = {
    idTask: id,
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
}
// para resetear el texto del form
//document.querySelector(".main__form").reset();

const aceptar = document.getElementById("addTaskButton");
aceptar.addEventListener("click", () => {
  addTaskHandler();
  loadModalEvents();
});

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

loadModalEvents();
