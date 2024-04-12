class GuitarApp {
    constructor() {
        $(() => {
            this.initEventListeners();
        })
    }

    initEventListeners() {
        $("#afinacionPredefinida").on("change", this.togglePersonalizadaContainer.bind(this));
        $("#agregarCuerda").on("click", this.agregarCuerda.bind(this));
        $("#eliminarUltimaCuerda").on("click", this.eliminarUltimaCuerda.bind(this));
        $("#afinacionForm").on("submit", (event) => {
            this.establecerAfinacion(event);
        });
        $("#addAfinacionPersonalizada").on("click", this.addAfinacionPersonalizada.bind(this));
    }

    addAfinacionPersonalizada() {
        let afinacionData = {};

        if ($("#nombreAfinacion").val() === "") {
            $("#mensajeErrorGuardarAfinacion")
                .html("<span style='color: red;'>Debes de escribir un nombre para guardar tu afinación</span>")
                .css("display", "block");
        } else {
            let notas = [];
            $("#cuerdasContainer").children("div").each(function (index) {

                let nota = {
                    nombre: $(this).find("#personalizadaCuerda" + (index + 1) + "Nota").val(),
                    octava: $(this).find("#personalizadaCuerda" + (index + 1) + "Octava").val()
                };

                notas.push(nota);
            });
            let nombre = $("#nombreAfinacion").val()
            afinacionData.notasPersonalizadas = notas;
            afinacionData.afinacionNombre = nombre;
            localStorage.setItem("afinacionPersonalizada_" + nombre, JSON.stringify(afinacionData));

            let afinacionObjeto = localStorage.getItem("afinacionPersonalizada_" + nombre);

            console.log(afinacionObjeto);
            alert("Afinación " + nombre + " guardada correctamente");
            window.location.reload();

        }
    }

    togglePersonalizadaContainer() {
        if ($("#afinacionPredefinida").val() === "personalizada") {
            $("#personalizadaContainer").show();
            $("#nombreAfinacionContainer").show();
        } else {
            if (
                ($("#afinacionPredefinida").val() === "estandar") ||
                ($("#afinacionPredefinida").val() === "dropD") ||
                ($("#afinacionPredefinida").val() === "openD") 
            ) {
                $("#personalizadaContainer").hide();
                $("#nombreAfinacionContainer").hide();
            } else {
                
                $("#personalizadaContainer").show();
                $("#nombreAfinacionContainer").show();
                this.rellenarDatosAfinacionGuardada("afinacionPersonalizada_" + $("#afinacionPredefinida").val());

            }
        }
    }

    rellenarDatosAfinacionGuardada(nombreLocalAfinacion) {
        let afinacionObjeto = localStorage.getItem(nombreLocalAfinacion);
        afinacionObjeto = JSON.parse(afinacionObjeto)
        let numNotas = afinacionObjeto["notasPersonalizadas"].length;

        if (numNotas > 4) {
            let notasParaCompletar = numNotas - 4;
            for (let i = 0; i < notasParaCompletar; i++) {
                this.agregarCuerda();
            }
        }

        $("#cuerdasContainer").children("div").each(function (index) {
            $(this).find("#personalizadaCuerda" + (index + 1) + "Nota").val(afinacionObjeto.notasPersonalizadas[index].nombre).formSelect();
            $(this).find("#personalizadaCuerda" + (index + 1) + "Octava").val(afinacionObjeto.notasPersonalizadas[index].octava).formSelect();
        });
        $("#nombreAfinacion").val(nombreLocalAfinacion.replace("afinacionPersonalizada_", "")).trigger("focus");

    }

    agregarCuerda() {
        let numCuerdas = $("#cuerdasContainer select").length / 2 + 1;
        if (numCuerdas === 13) {
            alert("No se pueden añadir más cuerdas")
            return
        }
        let nuevoCampo = `<div class="row" style="margin-bottom: 0;">
            <div class="input-field col s6">
                <div class="row" id="cuerda${numCuerdas}" style="margin-bottom: 0;">
                    <div class="col s6">
                        <div class="input-field">
                            <select name="personalizadaCuerda${numCuerdas}Nota" id="personalizadaCuerda${numCuerdas}Nota">
                                <option value="C">C (Do)</option>
                                <option value="C#">C# (Do#)</option>
                                <option value="D">D (Re)</option>
                                <option value="D#">D# (Re#)</option>
                                <option value="E">E (Mi)</option>
                                <option value="F">F (Fa)</option>
                                <option value="F#">F# (Fa#)</option>
                                <option value="G">G (Sol)</option>
                                <option value="G#">G# (Sol#)</option>
                                <option value="A">A (La)</option>
                                <option value="A#">A# (La#)</option>
                                <option value="B">B (Si)</option>
                            </select>
                            <label for="personalizadaCuerda${numCuerdas}Nota">Nota Cuerda ${numCuerdas}:</label>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
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
                            <label for="personalizadaCuerda${numCuerdas}Octava">Octava Cuerda ${numCuerdas}:</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        $("#cuerdasContainer").append(nuevoCampo);
        $("#eliminarUltimaCuerda").show();
        $('select').formSelect();
    }

    eliminarUltimaCuerda() {
        $("#cuerdasContainer").children("div").last().remove();
        if ($("#cuerdasContainer select").length <= 8) {
            $("#eliminarUltimaCuerda").hide();
        }
    }

    establecerAfinacion(event) {
        event.preventDefault();

        let afinacionData = {};

        if ($("#afinacionPredefinida").val() === "personalizada") {
            let notas = [];
            $("#cuerdasContainer").children("div").each(function () {
                let notaCompleta = $(this).find("select[name^='personalizadaCuerda'] option:selected").text();
                let nota = {
                    nombre: notaCompleta[0],
                    octava: notaCompleta[1]
                };
                notas.push(nota);
            });

            afinacionData.notasPersonalizadas = notas;
        } else {
            afinacionData.afinacionNombre = $("#afinacionPredefinida").val();
        }

        localStorage.setItem("afinacionData", JSON.stringify(afinacionData));

        window.location.href = "config.html";
    }

    cargarAfinacionesPersonalizadas() {
        let selectElement = $("#afinacionPredefinida");

        for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            if (clave.match(/^afinacionPersonalizada_.*/)) {
                let afinacionObjeto = localStorage.getItem(clave);
                console.log("Elementos encontrado: \n", afinacionObjeto);
                afinacionObjeto = JSON.parse(afinacionObjeto);
                let nuevaAfinacion = $("<option>").html(afinacionObjeto.afinacionNombre);
                selectElement.find("option[value='personalizada']").before(nuevaAfinacion);
                
            }
        }
    }
}

$(function () {
    new GuitarApp().cargarAfinacionesPersonalizadas();
    $('select').formSelect();
});