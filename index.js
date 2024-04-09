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
            $("#cuerdasContainer").children("div").each(function () {
                let notaCompleta = $(this).find("select[name^='personalizadaCuerda'] option:selected").val();
                let nota = {
                    nombre: notaCompleta[0],
                    octava: notaCompleta[1]
                };
                notas.push(nota);
            });

            afinacionData.notasPersonalizadas = notas;

            let afinacionGuardada = localStorage.getItem($("#nombreAfinacion").val(), JSON.stringify(afinacionData));
            
            let afinacionObjeto = JSON.parse(afinacionGuardada);

            // Imprimir el objeto en la consola
            console.log(afinacionObjeto);

        }
    }

    togglePersonalizadaContainer() {
        if ($("#afinacionPredefinida").val() === "personalizada") {
            $("#personalizadaContainer").show();
            $("#nombreAfinacionContainer").show();
        } else {
            $("#personalizadaContainer").hide();
            $("#nombreAfinacionContainer").hide();
        }
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
}

$(function () {
    new GuitarApp();
    $('select').formSelect();
});