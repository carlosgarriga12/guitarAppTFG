let afinacion = new ServicioAfinacion();
let guitarra = new Guitarra(afinacion.obtenerAfinacionGuardada())

guitarra.pintar();
guitarra.rellenarMastil();

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

    toString() {
        let aux = "";
        aux += this.notaBase.getName()
        aux += this.getTipo()
        return aux;
    }
}

let acordeActual = new Acorde(new Nota("C", "", 3), Acordes.Mayor);
let acordeNum = 0;
guitarra.pintarAcorde(guitarra.buscarAcorde(acordeActual.getNotas()), acordeNum)

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
    let tiempoEspera = acordeActual.getNotasObjeto().length === 3 ? 75 : 100;
    let acordeAux = new Acorde(acordeActual.getNotaBase().setOctava(4), acordeActual.getTipo())
    acordeAux.getNotasObjeto().forEach((nota, index) => {
        setTimeout(() => {
            synth.triggerAttackRelease(nota.getName() + nota.getOctava(), "8n", Tone.now())
        }, index * tiempoEspera);
    });
}

function volverIndex() {
    window.location.href = "index.html";
}

function irAJuego() {
    window.location.href = "juego.html";
}

function siguienteAcorde() {
    let notasAcorde = acordeActual.getNotas();
    acordeNum++;
    if (acordeNum === guitarra.buscarAcorde(notasAcorde).length) {
        acordeNum = 0; 
    }
    $(".dedo").remove();
    $(".notaAcorde").remove();

    guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum);
}

function anteriorAcorde() {
    let notasAcorde = acordeActual.getNotas();
    acordeNum--;
    if (acordeNum === -1) {
        acordeNum = guitarra.buscarAcorde(notasAcorde).length - 1; 
    }

    $(".dedo").remove();
    $(".notaAcorde").remove();

    guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum);
}

$(function() {
    $("#acordeForm select").on("change", function () {
        let notaBase = $("#notaBase").val();
        let tipoAcorde = $("#tipoAcorde").val();

        if (notaBase.length > 1) {
            let notaInicial = notaBase[0];
            let alteracion = notaBase[1];
            acordeActual = new Acorde(new Nota(notaInicial, alteracion, 3), Acordes[tipoAcorde]);
        } else {
            acordeActual = new Acorde(new Nota(notaBase, "", 3), Acordes[tipoAcorde]);
        }

        let notasAcorde = acordeActual.getNotas();

        $(".dedo").remove();
        $(".notaAcorde").remove();
        acordeNum = 0;
        guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum);
    });
});

class Aleatorio {
    static getNota() {
        const notas = ["C", "D", "E", "F", "G", "A", "B"]
        let nombre = notas[Math.floor(Math.random() * notas.length)]
        let alteracion = "";
        if (nombre !== "E" && nombre !== "B") {
            alteracion = (Math.random() < 0.5) ? "" : "#";
        }
        let nota = new Nota(nombre, alteracion, 3);
        return nota;
    }

    static getAcorde(notaBase) {
        let keys = Object.keys(Acordes);
        let tipoAcorde = Acordes[keys[keys.length * Math.random() << 0]];
        return new Acorde(notaBase, tipoAcorde);
    }
}

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
                    .attr("id", "JuegoCuerda" + j + "Traste" + i);
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
        $("#juegoContainer button").remove();
        $("#juegoContainer").append($("<div>").attr("id", "estadoJuego"))
        $("#estadoJuego").append($("<div>").attr("id", "puntuacion"))
        this.inicializarPuntuacion();
        $("#estadoJuego").append($("<div>").attr("id", "temporizador"))
        this.inicializarTemporizador();
        $("#juegoContainer").append($("<div>").attr("id", "containerJuego"))
        $("#containerJuego").append($("<div>").attr("id", "guitarraNotasJuego"))
        this.pintarAfinacionActual();
        $("#containerJuego").append($("<div>").attr("id", "guitarraJuego"))
        this.pintarMastilJuego();
        $("#juegoContainer").append($("<button>").on("click", () => {
            window.location.href = "index.html";
        }).html("Cambiar la configuración"))

        let opcionesContainer = $("<div>").attr("id", "opcionesContainer");
        $("#juegoContainer").append(opcionesContainer)
        let acordeAleatorio = Aleatorio.getAcorde(Aleatorio.getNota());
        this.pintarNuevoAcorde(acordeAleatorio);
        this.pintarOpciones(acordeAleatorio);
    }

    pintarNuevoAcorde(acorde) {
        let combinacionesAcordes = this.guitarra.buscarAcorde(acorde.getNotas())
        let posicionDedos = combinacionesAcordes[Math.floor(Math.random() * combinacionesAcordes.length)];

        for (let i = 0; i < posicionDedos.length; i++) {
            let notaInicial = this.guitarra.afinacion[i];

            for (let j = 0; j < posicionDedos[i]; j++) {
                notaInicial = notaInicial.siguiente();
            }
            if (posicionDedos[i] !== 0) {
                let posicion = $("<div>").addClass("dedo");
                let id = "#JuegoCuerda" + i + "Traste" + (posicionDedos[i] - 1);
                $(id).append(posicion)
            }
        }

    }

    pintarOpciones(acorde) {
        let numeroAleatorio = Math.floor(Math.random() * 3);
        console.log(numeroAleatorio)
        for (let i = 0; i < 3; i++) {
            if (i === numeroAleatorio) {
                $("#opcionesContainer").append(
                    $("<button>").on("click", () => {
                        this.puntuacion += 100; 
                        $("#puntuacion").html("Puntuación: " + this.puntuacion)
                        this.siguiente()
                    })
                        .html(acorde.toString())
                )
            } else {
                $("#opcionesContainer").append(
                    $("<button>").on("click", () => {
                        this.puntuacion -= 100; 
                        $("#puntuacion").html("Puntuación: " + this.puntuacion)
                        this.siguiente()
                    })
                        .html(Aleatorio.getAcorde(Aleatorio.getNota()).toString())
                )
            }
        }
    }

    siguiente() {
        $(".dedo").remove();
        $("#opcionesContainer").empty();
        let acordeAleatorio = Aleatorio.getAcorde(Aleatorio.getNota());
        this.pintarNuevoAcorde(acordeAleatorio);
        this.pintarOpciones(acordeAleatorio);
    }

    inicializarPuntuacion() {
        let puntuacionDiv = $("#puntuacion");

        puntuacionDiv.html("Puntuación: " + this.puntuacion);
    }

    inicializarTemporizador() {
        let temporizadorDiv = $("#temporizador");
    
        let tiempoInicial = 120;
    
        let minutos = Math.floor(tiempoInicial / 60);
        let segundos = tiempoInicial % 60;
        let tiempoFormateado = minutos.toString().padStart(2, '0') + ":" + segundos.toString().padStart(2, '0');
        temporizadorDiv.html(tiempoFormateado);
    
        let temporizadorInterval = setInterval(function() {
            tiempoInicial--;
    
            if (tiempoInicial <= 0) {
                clearInterval(temporizadorInterval); 
                temporizadorDiv.html("¡Tiempo agotado!");
                return;
            }
    
            minutos = Math.floor(tiempoInicial / 60);
            segundos = tiempoInicial % 60;
            tiempoFormateado = minutos.toString().padStart(2, '0') + ":" + segundos.toString().padStart(2, '0');
    
            temporizadorDiv.html(tiempoFormateado);
        }, 1000);
    }
}

let juego = new Juego(guitarra);