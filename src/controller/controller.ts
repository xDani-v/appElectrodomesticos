import Electrodomestico from '../models/Electrodomestico';
import Cliente from "../models/Cliente";

class controller {
    private clientes: Cliente[];
    private electrodomesticos: Electrodomestico[];


    constructor() {
        this.clientes = [];
        this.electrodomesticos = [];
    }

    public insertarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public modificarCliente(cedula: string, clienteModificado: Cliente): void {
        const index = this.buscarClientePorCedula(cedula);
        if (index !== -1) {
            this.clientes[index] = clienteModificado;
        }
    }

    public eliminarCliente(cedula: string): void {
        const index = this.buscarClientePorCedula(cedula);
        if (index !== -1) {
            this.clientes.splice(index, 1);
        }
    }

    public buscarClientePorCedula(cedula: string): number {
        return this.clientes.findIndex((cliente) => cliente.getCedula() === cedula);
    }

    public obtenerClientes(): Cliente[] {
        return this.clientes;
    }

    public insertarElectrodomestico(electrodomestico: Electrodomestico): void {
        this.electrodomesticos.push(electrodomestico);
    }

    public modificarElectrodomestico(index: number, electrodomesticoModificado: Electrodomestico): void {
        if (index >= 0 && index < this.electrodomesticos.length) {
            this.electrodomesticos[index] = electrodomesticoModificado;
        }
    }

    public eliminarElectrodomestico(index: number): void {
        if (index >= 0 && index < this.electrodomesticos.length) {
            this.electrodomesticos.splice(index, 1);
        }
    }


}