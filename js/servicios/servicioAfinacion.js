class ServicioAfinacion {
    obtenerAfinacionGuardada() {
        let formDataJSON = localStorage.getItem("afinacionData");
        if (formDataJSON) {
            let formData = JSON.parse(formDataJSON);

            if (formData.afinacionNombre === "estandar") {
                return [
                    new Nota("E", "", 2),
                    new Nota("A", "", 2),
                    new Nota("D", "", 3),
                    new Nota("G", "", 3),
                    new Nota("B", "", 3),
                    new Nota("E", "", 4)
                ];
            } else if (formData.afinacionNombre === "openC") {
                return [
                    new Nota("C", "", 2),
                    new Nota("G", "", 2),
                    new Nota("C", "", 3),
                    new Nota("E", "", 3),
                    new Nota("G", "", 3),
                    new Nota("C", "", 4)
                ];
            } else if (formData.afinacionNombre === "openD") {
                return [
                    new Nota("D", "", 2),
                    new Nota("A", "", 2),
                    new Nota("D", "", 3),
                    new Nota("F", "#", 3),
                    new Nota("A", "", 3),
                    new Nota("D", "", 4)
                ];
            } else if (formData.afinacionNombre === "openE") {
                return [
                    new Nota("E", "", 2),
                    new Nota("B", "", 2),
                    new Nota("E", "", 3),
                    new Nota("G", "#", 3),
                    new Nota("B", "", 3),
                    new Nota("E", "", 4)
                ];
            } else if (formData.afinacionNombre === "openG") {
                return [
                    new Nota("D", "", 2),
                    new Nota("G", "", 2),
                    new Nota("D", "", 3),
                    new Nota("G", "", 3),
                    new Nota("B", "", 3),
                    new Nota("D", "", 4)
                ];
            } else if (formData.afinacionNombre === "openA") {
                return [
                    new Nota("E", "", 2),
                    new Nota("A", "", 2),
                    new Nota("E", "", 3),
                    new Nota("A", "", 3),
                    new Nota("C", "#", 3),
                    new Nota("E", "", 4)
                ];
            } else if (formData.afinacionNombre === "dropD") {
                return [
                    new Nota("D", "", 2),
                    new Nota("A", "", 2),
                    new Nota("D", "", 3),
                    new Nota("G", "", 3),
                    new Nota("B", "", 3),
                    new Nota("E", "", 4)
                ];
            } else {
                if (formData.afinacionNombre === "personalizada") {
                    console.log("Afinación personalizada sin guardar")
                    let notas = [];

                    formData.notasPersonalizadas.map(nota => {
                        let alteracion = "";
                        if (nota.nombre.length > 1) {
                            alteracion = nota.nombre[1];
                        }
                        notas.push(new Nota(nota.nombre[0], alteracion, Number(nota.octava)))
                    })
                    
                    return notas.reverse();
                } else {
                    console.log("Afinación personalizada guardada")
                    let notas = [];
                    let afinacionPersonalizada = localStorage.getItem("afinacionPersonalizada_" + formData.afinacionNombre);
                    console.log(afinacionPersonalizada)
                    let afinacionPersonalizadaJSON = JSON.parse(afinacionPersonalizada);
                    console.log(afinacionPersonalizadaJSON)
                    let notasJSON = afinacionPersonalizadaJSON.notasPersonalizadas;

                    notasJSON.map(nota => {
                        let alteracion = "";
                        if (nota.nombre.length > 1) {
                            alteracion = nota.nombre[1];
                        }
                        notas.push(new Nota(nota.nombre[0], alteracion, Number(nota.octava)))
                    })

                    return notas.reverse();
                }
            }
        }
    }
}