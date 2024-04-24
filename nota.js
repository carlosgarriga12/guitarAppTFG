class Nota {
    constructor(nombre, alteracion, octava) {
        if (!['C', 'D', 'E', 'F', 'G', 'A', 'B'].includes(nombre)) {
            throw new Error('Nombre de nota inválido');
        }
        this.nombre = nombre;
        if (!['', 'b', '#'].includes(alteracion)) {
            throw new Error('Nombre de alteración inválido');
        }
        this.alteracion = alteracion;
        if (octava < 0) {
            throw new Error('La octava no puede ser negativa');
        }
        this.octava = octava;
    }

    getAlteracion() {
        return this.alteracion;
    }

    getOctava() {
        return this.octava;
    }

    setOctava(octava) {
        this.octava = octava;
        return this;
    }

    getName() {
        return this.nombre + this.alteracion;
    }

    getFullName() {
        const nombres = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
        let indice = nombres.indexOf(this.nombre);
        let alterada = false;
        // Si la alteración es sostenido, incrementa el índice
        if (this.alteracion === "#") {
            indice = (indice + 1) % 12;
            alterada = true;
        }
        // Si la alteración es bemol, decrementa el índice
        else if (this.alteracion === "b") {
            indice = (indice + 11) % 12;
            alterada = true;
        }

        // Ajustes especiales para nombres concretas
        if (this.nombre === "E" && this.alteracion === "#") {
            indice = (nombres.indexOf("F")) % 12;
            return nombres[indice] + this.octava;
        }
        else if (this.nombre === "B" && this.alteracion === "#") {
            indice = (nombres.indexOf("C")) % 12;
            this.octava++;
            return nombres[indice] + this.octava;
        }
        else if (this.nombre === "F" && this.alteracion === "b") {
            indice = (nombres.indexOf("E")) % 12;
            return nombres[indice] + this.octava;
        }
        else if (this.nombre === "C" && this.alteracion === "b") {
            indice = (nombres.indexOf("B")) % 12;
            this.octava--;
            if (this.octava >= 0)
                return nombres[indice] + this.octava;
            else
                return new Error("No existe el Cb de octava 0");
        }

        if (alterada) {
            if (this.alteracion === "#") {
                return nombres[indice].split("/")[0] + this.octava;
            }
            else {
                return nombres[indice].split("/")[1] + this.octava;
            }
        }
        return nombres[indice] + this.octava;
    }

    siguiente() {
        const nombres = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
        let nombre = this.getFullName()
        if (nombre.length === 2) {
            if (nombre.charAt(0) === "E") {
                return new Nota("F", "", this.octava); //Mantenemos la misma octava
            }

            if (nombre.charAt(0) === "B") {
                return new Nota("C", "", this.octava + 1); //Tenemos que aumentar la octava
            }

            return new Nota(this.nombre, "#", this.octava);
        } else {
            if (this.alteracion === 'b') {
                return new Nota(this.nombre, "", this.octava);
            } else if (this.alteracion === "#") {
                switch (this.nombre) {
                    case "C":
                        return new Nota("D", "", this.octava)
                    case "D":
                        return new Nota("E", "", this.octava)
                    case "F":
                        return new Nota("G", "", this.octava)
                    case "G":
                        return new Nota("A", "", this.octava)
                    case "A":
                        return new Nota("B", "", this.octava)
                }
            }
        }
    }

    calculaSiguienteNota(semitonos) {
        let nota = this;
        for (let i = 0; i < semitonos; i++) {
            nota = nota.siguiente();
        }
        return nota;
    }
}

module.exports = { Nota };