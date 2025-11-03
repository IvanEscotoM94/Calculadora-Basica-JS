
const display = document.getElementById("display");
const teclado = document.querySelector(".teclado");
const btnIgual = document.getElementById("igual");


let operandoAnterior = null;
let operacionPendiente = null;
let escribiendoNuevo = true;


function actualizarDisplay(texto) {
    display.value = texto;
}

function tomarNumeroActual() {
    return parseFloat(display.value.replace(",", "."));
}

function escribirDigito(d) {
    if (escribiendoNuevo || display.value === "0") {
        actualizarDisplay(String(d));
        escribiendoNuevo = false;
    } else {
        actualizarDisplay(display.value + String(d));
    }
}

function prepararOperacion(op) {
    const actual = tomarNumeroActual();

    if (operandoAnterior !== null && !escribiendoNuevo && operacionPendiente) {
        const res = resolver(operandoAnterior, actual, operacionPendiente);
        actualizarDisplay(formatear(res));
        operandoAnterior = res;
    } else {
        operandoAnterior = actual;
    }

    operacionPendiente = op;
    escribiendoNuevo = true;
}

function resolver(a, b, op) {
    if (op === "+") {
        return a + b;
    }

    if (op === "-"){
        return a - b;
    }
    if (op === "*") {
        return a * b;
    }
    if (op === "/") {
        if (b === 0) {
            return NaN;
        }
        return a / b;
    }
    return b;
}

function formatear(n) {
    if (Number.isNaN(n)) {
        return "Error";
    }

    let redondeado = n.toFixed(2);

    redondeado = redondeado.replace(/\.?0+$/, "");

    return redondeado;
}


function mostrarResultado() {
    if (operandoAnterior === null || !operacionPendiente){
        return;
    }

    const actual = tomarNumeroActual();
    const res = resolver(operandoAnterior, actual, operacionPendiente);
    actualizarDisplay(formatear(res));


    operandoAnterior = res;
    operacionPendiente = null;
    escribiendoNuevo = true;
}

function limpiar() {
    operandoAnterior = null;
    operacionPendiente = null;
    escribiendoNuevo = true;
    actualizarDisplay("0");
}


teclado.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLButtonElement)) return;


    if (target.classList.contains("btn-num")) {
        const d = target.getAttribute("data-num");
        escribirDigito(d);
        return;
    }


    if (target.id === "igual") {
        mostrarResultado();
        return;
    }


    if (target.classList.contains("btn-op")) {
        const op = target.getAttribute("data-op");
        if (op === "C") {
            limpiar();
        } else {
            prepararOperacion(op);
        }
    }
});
