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
    }

    getAfinacion() {
        return this.afinacion;
    }

    pintarAcorde(combinaciones, nCombinacion, acorde) {
        let esCejilla = false;
        let notasGuitarra = []
        if (combinaciones.length === 0) {
            $("#titulos p:nth-child(3)").html("No se han encontrado acordes")
            return 0;
        }
        let posicionDedos = combinaciones[nCombinacion];
        let trastes = posicionDedos.filter(traste => traste !== -1 && traste !== 0);
        let trasteMinimo = Math.min(...trastes);

        if (this.esCejilla(posicionDedos)) esCejilla = true;

        for (let i = 0; i < posicionDedos.length; i++) {
            if (esCejilla && posicionDedos[i] != 0 && posicionDedos[i] != -1) {
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

    esCejilla(posicionDedos) {
        let trastes = posicionDedos.filter(traste => traste !== -1 && traste !== 0);
        let trasteMinimo = Math.min(...trastes);
        let countTrasteMinimo = trastes.filter(traste => traste === trasteMinimo).length;

        if (countTrasteMinimo >= Math.floor(this.afinacion.length / 2)) {
            let notasSuperiores = trastes.filter(traste => traste > trasteMinimo);
            if (notasSuperiores.length + countTrasteMinimo === trastes.length) {
                // Verificar que 0 o -1 están antes del resto de las notas
                for (let i = 0; i < posicionDedos.length; i++) {
                    if (posicionDedos[i] > 0 && posicionDedos.slice(i + 1).some(x => x === -1 || x === 0)) {
                        return false;
                    }
                }
                // Verificar que las cuerdas delante de la cejilla sean como mucho 3
                let dedosDelante = 0;
                for (let i = 0; i < posicionDedos.length; i++) {
                    if (posicionDedos[i] > 0 && posicionDedos[i] > trasteMinimo) {
                        dedosDelante++;
                    }
                }
                if (dedosDelante <= 3) {
                    return true;
                }
                
            }

        }
        return false;
    }
    

    buscarAcorde(notasAcorde, afinacionSubset = this.afinacion, mastilSubset = this.mastil) {
        const cantidadCuerdas = afinacionSubset.length;
        let trastesPorCuerda = [];
    
        for (let i = 0; i < cantidadCuerdas; i++) {
            let trastesEnCuerda = [];
            for (let j = 0; j < mastilSubset[i].length; j++) {
                let notaEnTraste = mastilSubset[i][j].getName();
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
                    return this.obtenerTrastePorNota(nota, cuerda, mastilSubset) === traste;
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
    
        // Buscar en subconjuntos de 4 cuerdas consecutivas
        if (cantidadCuerdas > 4) {
            for (let i = 0; i <= cantidadCuerdas - 4; i++) {
                const afinacionSubset = this.afinacion.slice(i, i + 4);
                const mastilSubset = this.mastil.slice(i, i + 4);
                let subCombinaciones = this.buscarAcorde(notasAcorde, afinacionSubset, mastilSubset);
    
                // Añadir cuerdas muteadas al inicio y al final del subset
                subCombinaciones = subCombinaciones.map(combinacion => {
                    let nuevaCombinacion = new Array(cantidadCuerdas).fill(-1);
                    for (let j = 0; j < 4; j++) {
                        nuevaCombinacion[i + j] = combinacion[j];
                    }
                    return nuevaCombinacion;
                });
    
                combinacionesFiltradas = combinacionesFiltradas.concat(subCombinaciones);
            }
        }
    
        return [...new Set(combinacionesFiltradas)];
    }

    obtenerTrastePorNota(nota, cuerda, mastil) {
        const cantidadTrastes = mastil[cuerda].length;

        for (let traste = 0; traste < cantidadTrastes; traste++) {
            if (mastil[cuerda][traste].getName() === nota) {
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