class Electrodomestico {
    private nombre: string;
    private preciobase: number;
    private color: string;
    private consumoenergetico: string;
    private peso: number;

    constructor(nombre: string, preciobase: number, color: string, consumoenergetico: string, peso: number) {
        this.nombre = nombre;
        this.preciobase = preciobase;
        this.color = color;
        this.consumoenergetico = this.comprobarConsumoEnergetico(consumoenergetico);
        this.peso = peso;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPrecioBase(): number {
        return this.preciobase;
    }

    public getColor(): string {
        return this.color;
    }

    public getConsumoEnergetico(): string {
        return this.consumoenergetico;
    }

    public getPeso(): number {
        return this.peso;
    }


    private comprobarConsumoEnergetico(letra: string): string {
        const letrasPermitidas = ['A', 'B', 'C', 'D', 'E', 'F'];
        const letraUpper = letra.toUpperCase();
        return letrasPermitidas.includes(letraUpper) ? letraUpper : 'F';
    }

    public precioFinal(): number {
        let aumentoPrecioBase = 0;

        switch (this.consumoenergetico) {
            case 'A':
                aumentoPrecioBase += 100;
                break;
            case 'B':
                aumentoPrecioBase += 80;
                break;
            case 'C':
                aumentoPrecioBase += 60;
                break;
            case 'D':
                aumentoPrecioBase += 50;
                break;
            case 'E':
                aumentoPrecioBase += 30;
                break;
            case 'F':
                aumentoPrecioBase += 10;
                break;
        }

        if (this.peso >= 0 && this.peso < 19) {
            aumentoPrecioBase += 10;
        } else if (this.peso >= 20 && this.peso < 49) {
            aumentoPrecioBase += 50;
        } else if (this.peso >= 50 && this.peso < 79) {
            aumentoPrecioBase += 80;
        } else if (this.peso >= 80) {
            aumentoPrecioBase += 100;
        }

        return this.preciobase + aumentoPrecioBase;
    }
}

export default Electrodomestico;