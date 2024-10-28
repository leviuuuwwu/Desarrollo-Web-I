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
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = "";
    
    //Determinando el sexo según el radio seleccionado
    if (inputRdMasculino.checked) {
        sexo = "Hombre";
    } else if (inputRdFemenino.checked) {
        sexo = "Mujer";
    }
    
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre !== "" &&
        apellido !== "" &&
        fechaNacimiento !== "" &&
        sexo !== "" &&
        pais !== "Seleccione un País:" &&
        direccion !== ""
    ) {
        //Agregando información al arreglo paciente
        arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);

        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        // Mostrando el Toast de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Mostrando el Toast de Bootstrap
        toast.show();
    }
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let filas = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        filas += `<tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button id="btnEditar${contador}" type="button" class="btn btn-primary" alt="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button id="btnEliminar${contador}" type="button" class="btn btn-danger" alt="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
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

//Asignando eventos a los botones usando funciones de tipo flecha
buttonLimpiarPaciente.onclick = limpiarForm;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPacientes;
buttonAgregarPais.onclick = addPais;

//Configurando el modal para que el campo de nombre del país reciba el foco al abrirse
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar la función al cargar la página HTML
limpiarForm();
