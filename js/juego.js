class Juego {
    constructor(guitarra) {
        this.aciertos = 0;
        this.fallos = 0;
        this.guitarra = guitarra;
    }

    pintarMastilJuego() {
        let elementoGuitarra = $("#guitarraJuego");
        for (let i = 0; i < this.guitarra.trastes; i++) {
            let traste = $('<div>')
                .addClass("traste")
                .attr("id", "traste" + i);
            if(i == 2 || i == 4 || i == 6 || i == 8) {
                traste.addClass("punto");
            }
            else if(i == 11) {
                traste.addClass("doble-punto");
            }
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
        $("#juegoContainer").append($("<button>").addClass("waves-effect waves-light btn").on("click", () => {
            window.location.href = "index.html";
        }).html("Cambiar la configuración"))
        $("#juegoContainer").append($("<button>").addClass("waves-effect waves-light btn").on("click", () => {
            window.location.href = "config.html";
        }).html("Volver a la generación de acordes"))

        let opcionesContainer = $("<div>").attr("id", "opcionesContainer");
        $("#juegoContainer").append(opcionesContainer)
        let acordeAleatorio = Aleatorio.getAcorde(Aleatorio.getNota());
        this.pintarNuevoAcorde(acordeAleatorio);
        this.pintarOpciones(acordeAleatorio);
        //Revisar para que haya al menos una posicion del acorde seleccionado
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
                        this.aciertos += 1; 
                        $("#puntuacion").html("Aciertos: " + this.aciertos + "\tFallos: " + this.fallos)
                        this.siguiente()
                    })
                        .html(acorde.toString())
                )
            } else {
                $("#opcionesContainer").append(
                    $("<button>").on("click", () => {
                        this.fallos += 1; 
                        $("#puntuacion").html("Aciertos: " + this.aciertos + "\tFallos: " + this.fallos)
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

        puntuacionDiv.html("Aciertos: " + this.aciertos + "\tFallos: " + this.fallos);
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
                if (confirm("¡Tiempo agotado! Aciertos: " + this.aciertos + "\tFallos: " + this.fallos + ". ¿Desea volver a jugar?")) {
                    window.location.href = "juego.html";
                } else {
                    window.location.href = "config.html";
                }
                return;
            }
    
            minutos = Math.floor(tiempoInicial / 60);
            segundos = tiempoInicial % 60;
            tiempoFormateado = minutos.toString().padStart(2, '0') + ":" + segundos.toString().padStart(2, '0');
    
            temporizadorDiv.html(tiempoFormateado);
        }, 1000);
    }
}