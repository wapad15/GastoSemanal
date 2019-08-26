//-------------------------variables------------------
//variable global para saber el presupuesto semanl
const presupuestoUsuario = prompt("¿cual es tu presupuesto Semanal?");
//cantidad que se va  instanciar como una clase Presupuesto
let cantidadPresupuesto;
//variable del formulario agregar gasto
const formulario = document.getElementById("agregar-gasto");

//---------------------------clases-----------------------
//clase de presupuesto
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }
  //Metodo para ir restando del presupuesto actual
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}
//clase Interfaz que maneja todo lo relacioando al HTML
class Interfaz {
  //Metodo para insertar el presupuesto al htm  en el span presupuesto
  insertarPresupuesto(cantidad) {
    const presupuestoSpan = document.querySelector("span#total");
    const restanteSpan = document.querySelector("span#restante");

    //insertar al HTML
    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }

  imprimirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    //insertamos el div con el mensaje al HTML
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    //quitar el aler despues de 2.5 segundos
    setTimeout(function() {
      document.querySelector(".primario .alert").remove();
      formulario.reset();
    }, 2500);
  }
  //metodo que inserta los gastos a la lista
  agregarGastoListado(nombre, cantidad) {
    const gastoListado = document.querySelector("#gastos ul");

    //creamos un li para añadir al ul (creamos un elemento para añadir a la lista)
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between aligin-items-center";
    li.innerHTML = `
      ${nombre}
      <span class="badge badge-primary badge-pill"> ${cantidad}</span>
    `;

    //Insertar al html
    gastoListado.appendChild(li);
  }
  //metodo de interfaz que comprueba el presupuesto restante
  presupuestoRestante(cantidad) {
    const restante = document.querySelector("span#restante");
    //leemos el presupuesto restante
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(
      cantidad,
    );
    //agregamos el presupuesto restante al html del span restante
    restante.innerHTML = `${presupuestoRestanteUsuario}`;
    //llamamos al metodo comprobar presupuesto para que dependiendo el restante que nos quedo cambie el color del span presupuesto
    this.comprobarPresupuesto();
  }
  //cambia el color al presupuesto
  comprobarPresupuesto() {
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;
    //comprobar el 25% del gasto y seleccionamos el span de restante y removemos y damos clases
    if (presupuestoTotal / 4 > presupuestoRestante) {
      const restante = document.querySelector(".restante");
      restante.classList.remove("alert-success", "alert-warning");
      restante.classList.add("alert-danger");
      //comprovamos el 50%  y seleccionamos el span de restante y removemos y damos clases
    } else if (presupuestoTotal / 2 > presupuestoRestante) {
      const restante = document.querySelector(".restante");
      restante.classList.remove("alert-success");
      restante.classList.add("alert-warning");
    }
  }
}
//------------------------------event listeners----------------
document.addEventListener("DOMContentLoaded", function() {
  //condicional para saber si el usuario no digito nada en el presupuesto y recargar la ventana
  if (presupuestoUsuario === null || presupuestoUsuario === "") {
    window.location.reload();
  } else {
    //instanciar un presupusto
    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
    //instanciar la clase de interfaz
    const ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

formulario.addEventListener("submit", function(e) {
  e.preventDefault();

  // leemos del formulario el nombre del gasto y la cantidad
  const nombreGasto = document.querySelector("#gasto").value;
  const cantidadGasto = document.querySelector("#cantidad").value;

  //instanciar la interfaz
  const ui = new Interfaz();

  //comprovamos con un condicional que los valores no esten vacios
  if (nombreGasto === "" || cantidadGasto === "") {
    //llamaos al metoo imprimir mensaje  al cual le pasamos un mensaje de error y el tipo de mensaje
    ui.imprimirMensaje("existen algun campo vacio", "error");
  } else {
    // insertar en html
    ui.imprimirMensaje("Correcto", "correcto");
    ui.agregarGastoListado(nombreGasto, cantidadGasto);
    ui.presupuestoRestante(cantidadGasto);
  }
});
