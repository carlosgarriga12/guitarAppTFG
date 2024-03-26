class Nota {
    constructor(nombre, alteracion, octava) {
        this.nombre = nombre;
        this.alteracion = alteracion;
        this.octava = octava;
    }

    getOctava() {
        return this.octava;
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
                return "Nota incorrecta"
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

    intervaloCon(otraNota) {
        const nombres = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
        let indice1 = nombres.indexOf(this.nombre);
        let indice2 = nombres.indexOf(otraNota.nombre);

        let distancia = Math.abs(indice2 - indice1);

        return distancia;
    }

    calculaSiguienteNota(semitonos) {
        let nota = this;
        for (let i = 0; i < semitonos; i++) {
            nota = nota.siguiente();
        }
        return nota;
    }

    getNotaAleatoria() {
        const notas = ["C", "D", "E", "F", "G", "A", "B"]
        let nombre = Math.floor(Math.random() * notas.length)
        let alteracion = "";
        if (nombre !== "E" && nombre !== "B") {
            alteracion = (Math.random() < 0.5) ? "" : "#";
        }

        return new Nota(nombre, alteracion, 3)
    }
}

class Guitarra {
    constructor(afinacion) {
        this.afinacion = afinacion;
        this.mastil = []; // Inicializa el mástil con una matriz vacía
        this.trastes = 12;

        for (let i = 0; i < this.afinacion.length; i++) {
            let fila = new Array(this.trastes);
            this.mastil.push(fila);
        }
    }

    getAfinacion() {
        return this.afinacion;
    }

    pintarAcorde(posicionDedos) {
        for (let i = 0; i < posicionDedos.length; i++) {
            let notaInicial = this.afinacion[i];

            for (let j = 0; j < posicionDedos[i]; j++) {
                notaInicial = notaInicial.siguiente();
            }

            $("#guitarraNotasAcorde").append($("<div>")
                .addClass("notaAcorde")
                .html(notaInicial.getName() + notaInicial.getOctava()))
            if (posicionDedos[i] !== 0) {
                let posicion = $("<div>").addClass("dedo");
                let id = "#cuerda" + i + "Traste" + (posicionDedos[i] - 1);
                $(id).append(posicion)
            }
        }
    }

    pintar() {
        let elementoGuitarra = $("#guitarra");
        for (let i = 0; i < this.trastes; i++) {
            let traste = $('<div>').addClass("traste").attr("id", "traste" + i);
            elementoGuitarra.append(traste);
            for (let j = this.afinacion.length - 1; j >= 0; j--) {
                let cuerda = $('<div>').addClass("cuerda").attr("id", "cuerda" + j + "Traste" + i);
                traste.append(cuerda);
            }
        }

    }

    rellenarMastil() {
        for (let i = 0; i < this.afinacion.length; i++) {
            let notaActual = this.afinacion[i];
            $("#guitarraNotasAfinacion").append($("<div>")
                .attr("id", "nota" + (this.afinacion.length - i))
                .html(notaActual.getName() + notaActual.getOctava()))
            for (let j = 0; j < this.trastes; j++) {
                this.mastil[i][j] = notaActual;
                notaActual = notaActual.siguiente();
            }
        }
    }

    buscarAcorde(notasAcorde) {
        let posicionDedos = []
        //Busca por cada cuerda la próxima nota que coincida con el acorde dado
        //Mejorar algoritmo y realizar pruebas
        for (let i = 0; i < this.afinacion.length; i++) {
            loop:
            for (let j = 0; j < this.trastes; j++) {
                if (notasAcorde.includes(this.mastil[i][j].getName())) {
                    posicionDedos.push(j);
                    break loop;
                }
            }
        }

        return posicionDedos;
    }

}

class ServicioAfinacion {
    obtenerAfinacionGuardada() {
        let formDataJSON = localStorage.getItem("afinacionData");
        if (formDataJSON) {
            let formData = JSON.parse(formDataJSON);

            if (formData.afinacionPredefinida === "estandar") {
                return [
                    new Nota("E", "", 2),
                    new Nota("A", "", 2),
                    new Nota("D", "", 3),
                    new Nota("G", "", 3),
                    new Nota("B", "", 3),
                    new Nota("E", "", 4)
                ];
            } else if (formData.afinacionPredefinida === "dropD") {
                return [
                    new Nota("D", "", 2),
                    new Nota("A", "", 2),
                    new Nota("D", "", 3),
                    new Nota("G", "", 3),
                    new Nota("B", "", 3),
                    new Nota("E", "", 4)
                ];
            } else if (formData.afinacionPredefinida === "openD") {
                return [
                    new Nota("D", "", 2),
                    new Nota("A", "", 2),
                    new Nota("D", "", 3),
                    new Nota("F", "#", 3),
                    new Nota("A", "", 3),
                    new Nota("D", "", 4)
                ];
            } else {
                let notas = [];

                formData.notasPersonalizadas.map(nota => {
                    let alteracion = "";
                    if (nota.nombre.length > 1) {
                        alteracion = nota.nombre[1];
                    }
                    notas.push(new Nota(nota.nombre[0], alteracion, Number(nota.octava)))
                })

                return notas;
            }
        }
    }
}

let afinacion = new ServicioAfinacion();
let guitarra = new Guitarra(afinacion.obtenerAfinacionGuardada())

guitarra.pintar();
guitarra.rellenarMastil();

const Acordes = {
    Mayor: "M",
    Menor: "m",
    Septima: "7"
}

class Acorde {
    constructor(notaBase, tipo) {
        this.notaBase = notaBase;
        this.tipo = tipo;
        this.notas = [];

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
            default:
                break;
        }

        for (let i = 0; i < distancias.length; i++) {
            this.notas.push(notaBase.calculaSiguienteNota(distancias[i]).getName());
        }
    }

    getNotas() {
        return this.notas;
    }
}

let acordeDeDoMayor = new Acorde(new Nota("C", "", 3), Acordes.Mayor);
guitarra.pintarAcorde(guitarra.buscarAcorde(acordeDeDoMayor.getNotas()))

const synth = new Tone.PolySynth(Tone.Synth, {
    volume: -5,
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.03,
        decay: 0.1,
        sustain: 0.3,
        release: 1
    },
    portamento: 0.05
}).toDestination();

function generarSonido() {
    let now = Tone.now()
    acordeDeDoMayor.getNotas().map(nota => {
        synth.triggerAttackRelease(nota.getName() + nota.getOctava(), "8n", now)
    })
}

function volverIndex() {
    window.location.href = "index.html";
}

function irAJuego() {
    window.location.href = "juego.html";
}

$(document).ready(function () {
    $("#acordeForm select").change(function () {
        let notaBase = $("#notaBase").val();
        let tipoAcorde = $("#tipoAcorde").val();

        let acorde;

        if (notaBase.length > 1) {
            let notaInicial = notaBase[0];
            let alteracion = notaBase[1];
            acorde = new Acorde(new Nota(notaInicial, alteracion, 3), Acordes[tipoAcorde]);
        } else {
            acorde = new Acorde(new Nota(notaBase, "", 3), Acordes[tipoAcorde]);
        }

        let notasAcorde = acorde.getNotas();

        $(".dedo").remove();
        $(".notaAcorde").remove();

        guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde));
    });
});

class Juego {
    constructor(guitarra) {
        this.puntuacion = 0;
        this.afinacion = afinacion.obtenerAfinacionGuardada();
        this.guitarra = guitarra;
    }

    pintarMastilJuego() {
        let elementoGuitarra = $("#guitarraJuego");
        for (let i = 0; i < this.guitarra.trastes; i++) {
            let traste = $('<div>')
            .addClass("traste")
            .attr("id", "traste" + i);
            elementoGuitarra.append(traste);
            for (let j = this.guitarra.afinacion.length - 1; j >= 0; j--) {
                let cuerda = $('<div>')
                .addClass("cuerda")
                .addClass("cuerdaJuego")
                .attr("id", "cuerda" + j + "Traste" + i);
                traste.append(cuerda);
            }
        }
    }

    pintarAfinacionActual() {
        for (let i = 0; i < this.guitarra.afinacion.length; i++) {
            let notaActual = this.guitarra.afinacion[i];
            $("#guitarraNotasJuego").append($("<div>")
                .attr("id", "notaJuego" + (this.guitarra.afinacion.length - i))
                .html(notaActual.getName() + notaActual.getOctava()))
        }
    }

    comenzar() {
        $("main button").remove();
        $("main").append($("<div>").attr("id", "containerJuego"))
        $("#containerJuego").append($("<div>").attr("id", "guitarraNotasJuego"))
        this.pintarAfinacionActual();
        $("#containerJuego").append($("<div>").attr("id", "guitarraJuego"))
        this.pintarMastilJuego();
        $("main").append($("<button>").on("click", () => {
            window.location.href = "index.html";
        }).html("Cambiar la configuración"))

        
    }

    siguiente() {
        
    }

    hasGanado() {

    }
}

let juego = new Juego(guitarra);