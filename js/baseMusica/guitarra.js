class Guitarra {
    constructor(afinacion) {
        if (afinacion.length > 12) {
            throw new Error('La afinación no puede tener más de 12 notas');
        }
        if (afinacion.length < 6) {
            throw new Error('La afinación no puede tener menos de 6 notas');
        }
        this.afinacion = afinacion;
        this.mastil = [];
        this.trastes = 12;

        for (let i = 0; i < this.afinacion.length; i++) {
            let fila = new Array(this.trastes);
            this.mastil.push(fila);
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                anteriorAcorde();
            } else if (event.key === 'ArrowRight') {
                siguienteAcorde();
            }
        });
    }

    getAfinacion() {
        return this.afinacion;
    }

    pintarAcorde(combinaciones, nCombinacion, acorde) {
        let esCejilla = false;
        let notasGuitarra = []
        if (combinaciones.length === 0) {
            alert("No se han encontrado combinaciones posibles en la afinación actual");
            return 0;
        }
        let posicionDedos = combinaciones[nCombinacion];
        let trastes = posicionDedos.filter(traste => traste !== -1 && traste !== 0);
        let trasteMinimo = Math.min(...trastes);

        if (this.esCejilla(posicionDedos)) esCejilla = true;

        for (let i = 0; i < posicionDedos.length; i++) {
            if (esCejilla) {
                let posicion = $("<div>").addClass("cejilla");
                let id = "#cuerda" + i + "Traste" + (trasteMinimo - 1);
                $(id).append(posicion)
            }
            let notaAcorde;
            if (posicionDedos[i] !== - 1) {
                let notaInicial = this.afinacion[i];

                for (let j = 0; j < posicionDedos[i]; j++) {
                    notaInicial = notaInicial.siguiente();
                }
                notasGuitarra.push(notaInicial);

                let grado = acorde.calcularGrado(notaInicial);
                notaAcorde = $("<div>")
                    .addClass("notaAcorde")
                    .html(notaInicial.getName() + notaInicial.getOctava());

                if (grado === "I") {
                    notaAcorde.css('color', 'red');
                }

                if (posicionDedos[i] !== 0) {
                    let posicion = $("<div>").addClass("dedo").text(grado);
                    let id = "#cuerda" + i + "Traste" + (posicionDedos[i] - 1);
                    $(id).append(posicion)
                }
            } else {
                notaAcorde = $("<div>")
                    .addClass("notaAcorde")
                    .html("X");
            }
            $("#guitarraNotasAcorde").append(notaAcorde)
        }
        $("#titulos p:nth-child(3)").html("Acorde " + (nCombinacion + 1) + "/" + combinaciones.length)

        return notasGuitarra;
    }

    pintar() {
        let elementoGuitarra = $("#guitarra");
        for (let i = 0; i < this.trastes; i++) {
            let traste = $('<div>').addClass("traste").attr("id", "traste" + i);
            if (i == 2 || i == 4 || i == 6 || i == 8) {
                traste.addClass("punto");
            }
            else if (i == 11) {
                traste.addClass("doble-punto");
            }
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

    /*buscarAcorde(notasAcorde) {
        const cantidadCuerdas = this.afinacion.length;

        let trastesPorCuerda = [];
        for (let i = 0; i < cantidadCuerdas; i++) {
            let trastesEnCuerda = [];
            for (let j = 0; j < this.mastil[i].length; j++) {
                let notaEnTraste = this.mastil[i][j].getName();
                if (notasAcorde.includes(notaEnTraste)) {
                    trastesEnCuerda.push(j);
                }
            }
            trastesPorCuerda.push(trastesEnCuerda);
        }

        console.log("Trastes por cuerda")
        console.log(trastesPorCuerda);

        let combinaciones = [];
        let indices = new Array(cantidadCuerdas).fill(0);
        while (indices[cantidadCuerdas - 1] < trastesPorCuerda[cantidadCuerdas - 1].length) {
            let posicionesDedos = [];
            for (let i = 0; i < cantidadCuerdas; i++) {
                let traste = trastesPorCuerda[i][indices[i]];
                posicionesDedos.push(traste);
            }

            // Verificar si todas las notas del acorde están presentes en la combinación
            let todasLasNotasPresentes = notasAcorde.every(nota => {
                return posicionesDedos.some((traste, cuerda) => {
                    return this.obtenerTrastePorNota(nota, cuerda) === traste;
                });
            });

            if (todasLasNotasPresentes) {
                combinaciones.push(posicionesDedos);
            }

            indices[0]++;
            for (let i = 0; i < cantidadCuerdas - 1; i++) {
                if (indices[i] === trastesPorCuerda[i].length) {
                    indices[i] = 0;
                    indices[i + 1]++;
                }
            }
            if (indices[cantidadCuerdas - 1] >= trastesPorCuerda[cantidadCuerdas - 1].length) {
                break;
            }
        }

        const limiteDistanciaMaxima = 3;

        let combinacionesFiltradas = combinaciones.filter(combinacion => {
            return this.calcularDistanciaMaxima(combinacion) <= limiteDistanciaMaxima;
        });

        console.log("Combinaciones filtradas:");
        console.log(combinacionesFiltradas);
        return combinacionesFiltradas;
        


    }*/
    esCejilla(posicionDedos) {
        let trastes = posicionDedos.filter(traste => traste !== -1 && traste !== 0);
        let trasteMinimo = Math.min(...trastes);
        let countTrasteMinimo = trastes.filter(traste => traste === trasteMinimo).length;

        if (countTrasteMinimo >= 3) {
            let notasSuperiores = trastes.filter(traste => traste > trasteMinimo);
            if (notasSuperiores.length + countTrasteMinimo === trastes.length) {
                // Verificar que 0 o -1 están antes del resto de las notas
                for (let i = 0; i < posicionDedos.length; i++) {
                    if (posicionDedos[i] > 0 && posicionDedos.slice(i + 1).some(x => x === -1 || x === 0)) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    buscarAcorde(notasAcorde) {
        const cantidadCuerdas = this.afinacion.length;

        let trastesPorCuerda = [];
        for (let i = 0; i < cantidadCuerdas; i++) {
            let trastesEnCuerda = [];
            for (let j = 0; j < this.mastil[i].length; j++) {
                let notaEnTraste = this.mastil[i][j].getName();
                if (notasAcorde.includes(notaEnTraste)) {
                    trastesEnCuerda.push(j);
                }
            }
            trastesPorCuerda.push(trastesEnCuerda);
        }

        console.log("Trastes por cuerda");
        console.log(trastesPorCuerda);

        let combinaciones = [];
        let indices = new Array(cantidadCuerdas).fill(0);
        while (indices[cantidadCuerdas - 1] < trastesPorCuerda[cantidadCuerdas - 1].length) {
            let posicionesDedos = [];
            for (let i = 0; i < cantidadCuerdas; i++) {
                let traste = trastesPorCuerda[i][indices[i]];
                posicionesDedos.push(traste);
            }

            // Verificar si todas las notas del acorde están presentes en la combinación
            let todasLasNotasPresentes = notasAcorde.every(nota => {
                return posicionesDedos.some((traste, cuerda) => {
                    return this.obtenerTrastePorNota(nota, cuerda) === traste;
                });
            });

            if (todasLasNotasPresentes) {
                combinaciones.push(posicionesDedos);
            }

            indices[0]++;
            for (let i = 0; i < cantidadCuerdas - 1; i++) {
                if (indices[i] === trastesPorCuerda[i].length) {
                    indices[i] = 0;
                    indices[i + 1]++;
                }
            }
            if (indices[cantidadCuerdas - 1] >= trastesPorCuerda[cantidadCuerdas - 1].length) {
                break;
            }
        }

        const limiteDistanciaMaxima = 3;

        let combinacionesFiltradas = combinaciones.filter(combinacion => {
            let cantidadDedos = combinacion.filter(traste => traste > 0).length;
            return cantidadDedos <= 4 || this.esCejilla(combinacion);
        }).filter(combinacion => {
            return this.calcularDistanciaMaxima(combinacion) <= limiteDistanciaMaxima;
        });

        console.log("Combinaciones filtradas:");
        console.log(combinacionesFiltradas);
        return combinacionesFiltradas;
    }

    obtenerTrastePorNota(nota, cuerda) {
        const cantidadTrastes = this.mastil[cuerda].length;

        for (let traste = 0; traste < cantidadTrastes; traste++) {
            if (this.mastil[cuerda][traste].getName() === nota) {
                return traste;
            }
        }

        return -1;
    }

    calcularDistanciaMaxima(combinacion) {
        let distanciaMaxima = 0;
        for (let i = 0; i < combinacion.length - 1; i++) {
            if (combinacion[i] === 0) continue;
            for (let j = i + 1; j < combinacion.length; j++) {
                if (combinacion[j] === 0) continue;
                let distancia = Math.abs(combinacion[i] - combinacion[j]);
                if (distancia > distanciaMaxima) {
                    distanciaMaxima = distancia;
                }
            }
        }
        return distanciaMaxima;
    }
}

module.exports = { Guitarra };