import Electrodomestico from './models/Electrodomestico';
import Cliente from "./models/Cliente";

let ingresos: any = [];


let pos = -1;
let editando = false;


const formulario = document.querySelector<HTMLFormElement>('#formularioCliente')!;

const cedulaInput: any = document.querySelector<HTMLInputElement>('#cedula');
const nombresInput: any = document.querySelector<HTMLInputElement>('#nombres');
const sexoM: any = document.querySelector<HTMLInputElement>('#sexoM');
const sexoF: any = document.querySelector<HTMLInputElement>('#sexoF');
const estadoCivilSelect: any = document.querySelector<HTMLSelectElement>('#estadoCivil');
const edadInput: any = document.querySelector<HTMLInputElement>('#edad');
const nombreElectrodomesticoInput: any = document.querySelector<HTMLInputElement>('#nombre');
const precioBaseInput: any = document.querySelector<HTMLInputElement>('#preciobase');
const colorSelect: any = document.querySelector<HTMLSelectElement>('#color');
const consumoEnergeticoInput: any = document.querySelector<HTMLInputElement>('#consumoenergetico');
const pesoInput: any = document.querySelector<HTMLInputElement>('#peso');
const btnGuardar = document.querySelector<HTMLButtonElement>('#btnGuardar')!;







formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e: Event) {
  e.preventDefault();
  let sexoInput: string = '';

  // Verificar si el input de tipo radio sexoM está seleccionado
  if (sexoM.checked) {
    // Asignar el valor "M" a la variable sexoInput
    sexoInput = "M";
  }
  // Verificar si el input de tipo radio sexoF está seleccionado
  else if (sexoF.checked) {
    // Asignar el valor "F" a la variable sexoInput
    sexoInput = "F";
  }
  console.log(sexoInput);

  const electro = new Electrodomestico(nombreElectrodomesticoInput?.value, Number(precioBaseInput?.value), colorSelect?.value, consumoEnergeticoInput?.value, pesoInput?.value);
  const cli = new Cliente(cedulaInput?.value, nombresInput?.value, sexoInput, estadoCivilSelect?.value, edadInput?.value, electro);
  console.log(cli);

  if (editando) {
    modificarRegistro(cli);
    limpiarFormulario();
    editando = false;
  } else {
    agregar(cli);
    limpiarFormulario();
  }
}

function agregar(obj: Cliente) {
  ingresos.push(obj);
  console.log(ingresos);
  mostrarTabla();
  asignarEventosBotones();

}

function modificarRegistro(obj: Cliente) {
  ingresos[pos] = obj;
  mostrarTabla();
  asignarEventosBotones();
}

function generarTabla() {
  let tablaHTML = '<table class="table table-bordered">';

  tablaHTML += `
    <tr>
      <th>Cédula</th>
      <th>Nombres</th>
      <th>Sexo</th>
      <th>Estado Civil</th>
      <th>Edad</th>
      <th>Nombre Electrodoméstico</th>
      <th>Precio Base</th>
      <th>Color</th>
      <th>Consumo Energético</th>
      <th>Peso</th>
      <th>Presio Final</th>
      <th>Acciones</th>
    </tr>
  `;

  for (let i = 0; i < ingresos.length; i++) {
    const cliente = ingresos[i];
    const electrodomestico = cliente.getElectrodomestico();
    tablaHTML += `
      <tr>
        <td>${cliente.getCedula()}</td>
        <td>${cliente.getNombres()}</td>
        <td>${cliente.getSexo()}</td>
        <td>${cliente.getEstadoCivil()}</td>
        <td>${cliente.getEdad()}</td>
        <td>${electrodomestico.getNombre()}</td>
        <td>${electrodomestico.getPrecioBase()}</td>
        <td>${electrodomestico.getColor()}</td>
        <td>${electrodomestico.getConsumoEnergetico()}</td>
        <td>${electrodomestico.getPeso()}</td>
        <td>${electrodomestico.precioFinal()}</td>
        <td>
        <button class="btn btn-warning" id="editarBtn-${i}">Editar</button>
        <button  class="btn btn-danger" id="eliminarBtn-${i}">Eliminar</button>
        </td>
      </tr>
    `;
  }

  tablaHTML += '</table>';

  return tablaHTML;
}

function asignarEventosBotones() {
  const botonesEditar = document.querySelectorAll<HTMLButtonElement>('button[id^="editarBtn-"]');
  const botonesEliminar = document.querySelectorAll<HTMLButtonElement>('button[id^="eliminarBtn-"]');

  botonesEditar.forEach((boton, index) => {
    boton.addEventListener('click', () => editarRegistro(index));
  });

  botonesEliminar.forEach((boton, index) => {
    boton.addEventListener('click', () => eliminarRegistro(index));
  });
}

function mostrarTabla() {
  const tablaDiv = document.querySelector<HTMLDivElement>('#tabla')!;
  tablaDiv.innerHTML = generarTabla();
}

function editarRegistro(index: number) {
  // Verificar si el índice es válido
  if (index < 0 || index >= ingresos.length) {
    return;
  }

  const cliente = ingresos[index];
  const electrodomestico = cliente.getElectrodomestico();

  // Cargar los datos del cliente en el formulario
  cedulaInput.value = cliente.getCedula();
  nombresInput.value = cliente.getNombres();
  const sexoCliente = cliente.getSexo();
  console.log(sexoCliente);
  // Verificar si el sexo es "M" (masculino)
  if (sexoCliente === "M") {
    // Marcar el input de tipo radio con id="sexoM"
    sexoM.checked = true;
  } else if (sexoCliente === "F") {
    // Marcar el input de tipo radio con id="sexoF"
    sexoF.checked = true;
  }
  estadoCivilSelect.value = cliente.getEstadoCivil();
  edadInput.value = cliente.getEdad().toString();

  // Cargar los datos del electrodoméstico en el formulario
  nombreElectrodomesticoInput.value = electrodomestico.getNombre();
  precioBaseInput.value = electrodomestico.getPrecioBase().toString();
  colorSelect.value = electrodomestico.getColor();
  consumoEnergeticoInput.value = electrodomestico.getConsumoEnergetico();
  pesoInput.value = electrodomestico.getPeso().toString();
  pos = index;
  // Establecer la variable "editando" en true
  editando = true;
}

function eliminarRegistro(index: number) {
  // Aquí puedes implementar la lógica para eliminar el registro en la posición index del array ingresos
  ingresos.splice(index, 1);
  // Luego, muestra nuevamente la tabla actualizada
  mostrarTabla();
}

function limpiarFormulario() {
  // Limpiar los campos del formulario
  cedulaInput.value = '';
  nombresInput.value = '';
  sexoF.checked = false;
  sexoM.checked = false;
  estadoCivilSelect.value = '';
  edadInput.value = '';

  nombreElectrodomesticoInput.value = '';
  precioBaseInput.value = '';
  colorSelect.value = '';
  consumoEnergeticoInput.value = '';
  pesoInput.value = '';

  // Restablecer la variable "editando" a false
  editando = false;
  pos = -1;
}

// Evento para mostrar la tabla al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  mostrarTabla();
});

