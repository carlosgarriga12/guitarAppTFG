class Guitarra {
    constructor(afinacion) {
        this.afinacion = afinacion;
        this.mastil = [];
        this.trastes = 12;

        for (let i = 0; i < this.afinacion.length; i++) {
            let fila = new Array(this.trastes);
            this.mastil.push(fila);
        }
    }

    getAfinacion() {
        return this.afinacion;
    }

    pintarAcorde(combinaciones, nCombinacion) {
        if(combinaciones.length === 0) {
            alert("No se han encontrado combinaciones posibles en la afinación actual");
        } 
        let posicionDedos = combinaciones[nCombinacion];

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
            if(i == 2 || i == 4 || i == 6 || i == 8) {
                traste.addClass("punto");
            }
            else if(i == 11) {
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

            //combinaciones.push(posicionesDedos);
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
            for (let j = i + 1; j < combinacion.length; j++) {
                let distancia = Math.abs(combinacion[i] - combinacion[j]);
                if (distancia > distanciaMaxima) {
                    distanciaMaxima = distancia;
                }
            }
        }
        return distanciaMaxima;
    }
}