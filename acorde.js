const Acordes = {
    Mayor: "M",
    Menor: "m",
    Septima: "7",
    Aumentado: "Aug",
    Disminuido: "dim",
    MayorSiete: "M7",
    MenorSiete: "m7",
    MenorSieteB5: "m7b5", // Semidisminuido
    SusDos: "Sus2",
    SusCuatro: "Sus4"
}

class Acorde {
    constructor(notaBase, tipo) {
        this.notaBase = notaBase;
        this.tipo = tipo;
        this.notas = [];
        this.notasObjeto = [];

        let distancias;
        switch (tipo) {
            case Acordes.Mayor:
                distancias = [0, 4, 7]
                break;
            case Acordes.Menor:
                distancias = [0, 3, 7]
                break;
            case Acordes.Septima:
                distancias = [0, 4, 7, 10]
                break;
            case Acordes.Aumentado:
                distancias = [0, 4, 8]
                break;
            case Acordes.Disminuido:
                distancias = [0, 3, 6]
                break;
            case Acordes.MayorSiete:
                distancias = [0, 4, 7, 11]
                break;
            case Acordes.MenorSiete:
                distancias = [0, 3, 7, 10]
                break;
            case Acordes.MenorSieteB5:
                distancias = [0, 3, 6, 10]
                break;
            case Acordes.SusDos:
                distancias = [0, 2, 7]
                break;
            case Acordes.SusCuatro:
                distancias = [0, 5, 7]
                break;
            default:
                break;
        }

        for (let i = 0; i < distancias.length; i++) {
            this.notas.push(notaBase.calculaSiguienteNota(distancias[i]).getName());
            this.notasObjeto.push(notaBase.calculaSiguienteNota(distancias[i]));
        }
    }
    getNotaBase() {
        return this.notaBase;
    }

    getNotasObjeto() {
        return this.notasObjeto;
    }

    getTipo() {
        return this.tipo;
    }

    getNotas() {
        return this.notas;
    }

    calcularGrado(nota) {
        const grados = {
            'C': 1, 'D': 2, 'E': 3, 'F': 4, 'G': 5, 'A': 6, 'B': 7
        };
        const baseNombre = this.notaBase.nombre;
        const baseGrado = grados[baseNombre];
        const notaNombre = nota.nombre;
        const notaGrado = grados[notaNombre];

        let diferencia = (notaGrado - baseGrado + 7) % 7;
        const nombresGrados = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

        return nombresGrados[diferencia];
    }

    toString() {
        let aux = "";
        aux += this.notaBase.getName()
        aux += this.getTipo()
        return aux;
    }
}