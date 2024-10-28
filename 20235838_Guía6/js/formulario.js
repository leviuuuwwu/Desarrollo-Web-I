//Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRbtMasculino");
const inputRdFemenino = document.getElementById("idRbtFemenino");
const cmbPais = document.getElementById("idCboPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
//Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("modalPais");

//Arreglo global de pacientes
let arrayPaciente = [];

/*
Función para limpiar el formulario
siempre que se cargue la página o cuando se presione
el botón de limpiar del formulario
*/
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = "Seleccione un País:";
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

/*
Función para agregar un paciente al arreglo arrayPaciente
validando que todos los campos estén completos
*/
const addPaciente = function () {
    const editIndex = buttonAgregarPaciente.getAttribute("data-edit-index");

    if (editIndex !== null) {
        actualizarPaciente(parseInt(editIndex));
    } else {
        let nombre = inputNombre.value;
        let apellido = inputApellido.value;
        let fechaNacimiento = inputFechaNacimiento.value;
        let sexo = inputRdMasculino.checked ? "Hombre" : inputRdFemenino.checked ? "Mujer" : "";
        let pais = cmbPais.value;
        let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
        let direccion = inputDireccion.value;

        if (nombre && apellido && fechaNacimiento && sexo && pais !== "Seleccione un País:" && direccion) {
            arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
            toast.show();
            limpiarForm();
            imprimirPacientes();
        } else {
            mensaje.innerHTML = "Faltan campos por completar";
            toast.show();
        }
    }
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let filas = "";
    arrayPaciente.forEach((element, index) => {
        filas += `<tr>
            <td scope="row" class="text-center fw-bold">${index + 1}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button onclick="editarPaciente(${index})" type="button" class="btn btn-primary" alt="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button onclick="eliminarPaciente(${index})" type="button" class="btn btn-danger" alt="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
    });
    return filas;
}

/*
Función para mostrar la lista de pacientes
generando el contenido de la tabla en HTML
*/
const imprimirPacientes = () => {
    const tabla = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center">#</th>
                <th scope="col" class="text-center">Nombre</th>
                <th scope="col" class="text-center">Apellido</th>
                <th scope="col" class="text-center">Fecha nacimiento</th>
                <th scope="col" class="text-center">Sexo</th>
                <th scope="col" class="text-center">País</th>
                <th scope="col" class="text-center">Dirección</th>
                <th scope="col" class="text-center">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;
    document.getElementById("idListaPacientes").innerHTML = tabla;
};

//Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew !== "") {
        //Agregando el nuevo option en el select
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando a un mensaje a nuestra notificacion
        mensaje.innerHTML = "País agregado correctamente";
         //LLamando al componente de Bootstrap
        toast.show();
    } else {
        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
         //LLamando al componente de Bootstrap
        toast.show();
    }
};

const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
    } else if (paciente[3] === "Mujer") {
        inputRdFemenino.checked = true;
    }
    cmbPais.value = Array.from(cmbPais.options).find(opt => opt.text === paciente[4]).value;
    inputDireccion.value = paciente[5];
};

const actualizarPaciente = (index) => {
    arrayPaciente[index] = [
        inputNombre.value,
        inputApellido.value,
        inputFechaNacimiento.value,
        inputRdMasculino.checked ? "Hombre" : "Mujer",
        cmbPais.options[cmbPais.selectedIndex].text,
        inputDireccion.value,
];

    mensaje.innerHTML = "Paciente actualizado correctamente";
    toast.show();
    limpiarForm();
    imprimirPacientes();
    buttonAgregarPaciente.removeAttribute("data-edit-index");
};

const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1);

    // Mostrar mensaje de eliminación
    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();
    imprimirPacientes();
};

//Asignando eventos a los botones usando funciones de tipo flecha
buttonLimpiarPaciente.onclick = limpiarForm;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPacientes;
buttonAgregarPais.onclick = addPais;
buttonAgregarPaciente.setAttribute("data-edit-index", index);

//Configurando el modal para que el campo de nombre del país reciba el foco al abrirse
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar la función al cargar la página HTML
limpiarForm();
