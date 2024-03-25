class GuitarApp {
    constructor() {
        $(document).ready(() => {
            this.initEventListeners();
        });
    }

    initEventListeners() {
        $("#afinacionPredefinida").change(() => this.togglePersonalizadaContainer());

        $("#agregarCuerda").click(() => this.agregarCuerda());

        $("#eliminarUltimaCuerda").click(() => this.eliminarUltimaCuerda());

        $("#afinacionForm").submit((event) => this.guardarAfinacion(event));
    }

    togglePersonalizadaContainer() {
        if ($("#afinacionPredefinida").val() === "personalizada") {
            $("#personalizadaContainer").show();
        } else {
            $("#personalizadaContainer").hide();
        }
    }

    agregarCuerda() {
        let numCuerdas = $("#cuerdasContainer select").length / 2 + 1;
        let nuevoCampo = `<div id="cuerda${numCuerdas}">
                            <label for="personalizadaCuerda${numCuerdas}Nombre">Nombre Cuerda ${numCuerdas}:</label>
                            <select name="personalizadaCuerda${numCuerdas}Nombre" id="personalizadaCuerda${numCuerdas}Nombre">
                                <option value="C">C</option>
                                <option value="C#">C#</option>
                                <option value="D">D</option>
                                <option value="D#">D#</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                                <option value="F#">F#</option>
                                <option value="G">G</option>
                                <option value="G#">G#</option>
                                <option value="A">A</option>
                                <option value="A#">A#</option>
                                <option value="B">B</option>
                            </select>
                            <label for="personalizadaCuerda${numCuerdas}Octava">Octava Cuerda ${numCuerdas}:</label>
                            <select name="personalizadaCuerda${numCuerdas}Octava" id="personalizadaCuerda${numCuerdas}Octava">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>`;
        $("#cuerdasContainer").append(nuevoCampo);
        $("#eliminarUltimaCuerda").show();
    }

    eliminarUltimaCuerda() {
        $("#cuerdasContainer div:last-child").remove();
        if ($("#cuerdasContainer select").length === 0) {
            $("#eliminarUltimaCuerda").hide();
        }
    }

    guardarAfinacion(event) {
        event.preventDefault();

        if ($("#afinacionPredefinida").val() === "personalizada" && $("#cuerdasContainer select").length === 0) {
            alert("Debes añadir al menos una cuerda para una afinación personalizada.");
            return;
        }

        let afinacionData = {};

        if ($("#afinacionPredefinida").val() === "personalizada") {
            let notas = [];

            $("#cuerdasContainer div").each(function () {
                let notaCompleta = $(this).find("select[name^='personalizadaCuerda'] option:selected").text();
                let nota = {
                    nombre: notaCompleta[0],
                    octava: notaCompleta[1]
                };
                notas.push(nota);
            });

            afinacionData.notasPersonalizadas = notas;
        } else {
            afinacionData.afinacionPredefinida = $("#afinacionPredefinida").val();
        }

        localStorage.setItem("afinacionData", JSON.stringify(afinacionData));

        window.location.href = "config.html";
    }
}

new GuitarApp();