const carnetInput = document.getElementById("carnet");
const nombreInput = document.getElementById("nombre");
const duiInput = document.getElementById("dui");
const nitInput = document.getElementById("nit");
const fechaNacimientoInput = document.getElementById("fechaNacimiento");
const emailInput = document.getElementById("email");
const edadInput = document.getElementById("edad");

const carnetError = document.getElementById("errorCarnet");
const nombreError = document.getElementById("errorNombre");
const duiError = document.getElementById("errorDui");
const nitError = document.getElementById("errorNit");
const fechaNacimientoError = document.getElementById("errorFechaNacimiento");
const emailError = document.getElementById("errorEmail");
const edadError = document.getElementById("errorEdad");

function validarFormulario() {
    let esValido = true;

    const carnetFormato = /^[A-Z]{2}\d{3}$/;
    if (!carnetFormato.test(carnetInput.value)) {
        esValido = false;
        carnetError.textContent = "Carnet debe tener el formato AB001";
    } else {
        carnetError.textContent = "";
    }

    const nombreFormato = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nombreFormato.test(nombreInput.value)) {
        esValido = false;
        nombreError.textContent = "El nombre no debe contener números ni caracteres especiales";
    } else {
        nombreError.textContent = "";
    }

    const duiFormato = /^\d{8}-\d{1}$/;
    if (!duiFormato.test(duiInput.value)) {
        esValido = false;
        duiError.textContent = "DUI debe tener el formato ########-#";
    } else {
        duiError.textContent = "";
    }

    const nitFormato = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
    if (!nitFormato.test(nitInput.value)) {
        esValido = false;
        nitError.textContent = "NIT debe tener el formato ####-######-###-#";
    } else {
        nitError.textContent = "";
    }

    if (!fechaNacimientoInput.value) {
        esValido = false;
        fechaNacimientoError.textContent = "Ingrese una fecha válida";
    } else {
        fechaNacimientoError.textContent = "";
    }

    const emailFormato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormato.test(emailInput.value)) {
        esValido = false;
        emailError.textContent = "Ingrese un correo electrónico válido";
    } else {
        emailError.textContent = "";
    }

    if (isNaN(edadInput.value) || edadInput.value === "" || edadInput.value < 0) {
        esValido = false;
        edadError.textContent = "Ingrese una edad válida (solo números)";
    } else {
        edadError.textContent = "";
    }

    if (esValido) {
        alert("Formulario enviado correctamente.");
    } else {
        alert("Por favor, revise los campos con errores.");
    }
}
