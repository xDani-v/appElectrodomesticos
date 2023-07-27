import Electrodomestico from './models/Electrodomestico';
import Cliente from "./models/Cliente";

let ingresos: any = [];



let editando = false;


const formulario = document.querySelector<HTMLFormElement>('#formularioCliente')!;

const cedulaInput: any = document.querySelector<HTMLInputElement>('#cedula');
const nombresInput: any = document.querySelector<HTMLInputElement>('#nombres');
const sexoInput: any = document.querySelector<HTMLInputElement>('#sexo');
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
  const electro = new Electrodomestico(nombreElectrodomesticoInput?.value, precioBaseInput?.value, colorSelect?.value, consumoEnergeticoInput?.value, pesoInput?.value);
  const cli = new Cliente(cedulaInput?.value, nombresInput?.value, sexoInput?.value, estadoCivilSelect?.value, edadInput?.value, electro);
  console.log(cli);

  if (editando) {
    editandoRegistro();
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

}

function editandoRegistro() {

}

function generarTabla() {
  let tablaHTML = '<table>';

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
        <td>
          <button onclick="${editarRegistro(i)}">Editar</button>
          <button onclick="${eliminarRegistro(i)}">Eliminar</button>
        </td>
      </tr>
    `;
  }

  tablaHTML += '</table>';

  return tablaHTML;
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
  sexoInput.value = cliente.getSexo();
  estadoCivilSelect.value = cliente.getEstadoCivil();
  edadInput.value = cliente.getEdad().toString();

  // Cargar los datos del electrodoméstico en el formulario
  nombreElectrodomesticoInput.value = electrodomestico.getNombre();
  precioBaseInput.value = electrodomestico.getPrecioBase().toString();
  colorSelect.value = electrodomestico.getColor();
  consumoEnergeticoInput.value = electrodomestico.getConsumoEnergetico();
  pesoInput.value = electrodomestico.getPeso().toString();

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
  sexoInput.checked = false;
  estadoCivilSelect.value = '';
  edadInput.value = '';

  nombreElectrodomesticoInput.value = '';
  precioBaseInput.value = '';
  colorSelect.value = '';
  consumoEnergeticoInput.value = '';
  pesoInput.value = '';

  // Restablecer la variable "editando" a false
  editando = false;
}

// Evento para mostrar la tabla al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  mostrarTabla();
});

