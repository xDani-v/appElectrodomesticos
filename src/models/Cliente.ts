import Electrodomestico from "./Electrodomestico";

class Cliente {
    private cedula: string;
    private nombres: string;
    private sexo: string;
    private estadoCivil: string;
    private edad: number;
    private electrodomestico: Electrodomestico;

    constructor(cedula: string, nombres: string, sexo: string, estadoCivil: string, edad: number, electrodomestico: Electrodomestico) {
        this.cedula = cedula;
        this.nombres = nombres;
        this.sexo = sexo;
        this.estadoCivil = estadoCivil;
        this.edad = edad;
        this.electrodomestico = electrodomestico;
    }

    public getCedula(): string {
        return this.cedula;
    }

    public getNombres(): string {
        return this.nombres;
    }

    public getSexo(): string {
        return this.sexo;
    }

    public getEstadoCivil(): string {
        return this.estadoCivil;
    }

    public getEdad(): number {
        return this.edad;
    }

    public getElectrodomestico(): Electrodomestico {
        return this.electrodomestico;
    }

    public calcularPrecioTotal(): number {
        return this.electrodomestico.precioFinal();
    }
}

export default Cliente;