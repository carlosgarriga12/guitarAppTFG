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
        $("#afinacionForm").on("change", (event) => {
            this.establecerAfinacion(event);
        })
        $("#afinacionForm").on("submit", (event) => {
            this.establecerAfinacion(event);
            window.location.href = "config.html";
        });
        
        $("#addAfinacionPersonalizada").on("click", () => {
            this.addAfinacionPersonalizada();
        });
        $("#eliminarAfinacionPersonalizada").on("click", () => {
            if (confirm("¿Estás seguro de que deseas eliminar la afinación " + $("#afinacionPredefinida").val() + "?")) {
                localStorage.removeItem("afinacionPersonalizada_" + $("#afinacionPredefinida").val());
                window.location.reload();
                this.cargarAfinacionesPersonalizadas();
            } else {
                return;
            }
        });
    }

    addAfinacionPersonalizada() {
        let afinacionData = {};

        if ($("#nombreAfinacion").val() === "") {
            $("#mensajeErrorGuardarAfinacion")
                .html("<span style='color: red;'>Debes de escribir un nombre para guardar tu afinación</span>")
                .css("display", "block");
        } else {
            let afinacionOriginal = $("#afinacionPredefinida").val();
            let item = localStorage.getItem("afinacionPersonalizada_" + afinacionOriginal);
            let afinacionNueva = $("#nombreAfinacion").val()
            let notas = [];
            $("#cuerdasContainer").children("div").each(function (index) {

                let nota = {
                    nombre: $(this).find("#personalizadaCuerda" + (index + 1) + "Nota").val(),
                    octava: $(this).find("#personalizadaCuerda" + (index + 1) + "Octava").val()
                };

                notas.push(nota);
            });
            
            afinacionData.notasPersonalizadas = notas;
            if (item === null) {
                afinacionData.afinacionNombre = afinacionNueva;
                
            } else {
                localStorage.removeItem("afinacionPersonalizada_" + afinacionOriginal)
                afinacionData.afinacionNombre = afinacionNueva
                localStorage.setItem("afinacionData", JSON.stringify(afinacionData))
            }
            localStorage.setItem("afinacionPersonalizada_" + afinacionNueva, JSON.stringify(afinacionData));
    
            let afinacionObjeto = localStorage.getItem("afinacionPersonalizada_" + afinacionNueva);
            console.log(afinacionObjeto);
            alert("Afinación " + afinacionNueva + " guardada correctamente");
            window.location.href = "config.html";
            
        }
    }

    limpiarCamposPersonalizada() {
        $("#nombreAfinacion").val("");
        //$("nombreAfinacion").next().removeClass("active");
        M.updateTextFields();
        $("#cuerdasContainer").empty();
        for (let i = 0; i < 6; i++) {
            this.agregarCuerda();
        }
    }


    setAfinacionEstandar() {
        let afinacionEstandar = [
            new Nota("E", "", 2),
            new Nota("A", "", 2),
            new Nota("D", "", 3),
            new Nota("G", "", 3),
            new Nota("B", "", 3),
            new Nota("E", "", 4)
        ].reverse();
        $("#cuerdasContainer").children("div").each(function (index) {
            $(this).find("#personalizadaCuerda" + (index + 1) + "Nota").val(afinacionEstandar[index].nombre).formSelect();
            $(this).find("#personalizadaCuerda" + (index + 1) + "Octava").val(afinacionEstandar[index].octava).formSelect();
        });
    }

    togglePersonalizadaContainer() {
        let afinacionesPredef = ["estandar", "openC", "openD", "openE", "openG", "openA", "dropD"]
        if ($("#afinacionPredefinida").val() === "personalizada") {
            this.limpiarCamposPersonalizada();
            this.setAfinacionEstandar();
            $("#nombreAfinacion").next().addClass("active");                
            $("#nombreAfinacionContainer").show();
            $("#personalizadaContainer").show();
            $("#agregarCuerda").show();
            $("#addAfinacionPersonalizada").show();
            $("#eliminarAfinacionPersonalizada").hide();
            $("#eliminarUltimaCuerda").hide();
        } else {
            if (
                afinacionesPredef.includes($("#afinacionPredefinida").val())
            ) {
                $("#personalizadaContainer").hide();
                $("#nombreAfinacionContainer").hide();
                $("#eliminarAfinacionPersonalizada").hide();
                $("#agregarCuerda").hide();
                $("#eliminarUltimaCuerda").hide();
                $("#addAfinacionPersonalizada").hide();

            } else {
                M.updateTextFields();
                $("#personalizadaContainer").show();
                $("#nombreAfinacionContainer").show();
                this.rellenarDatosAfinacionGuardada("afinacionPersonalizada_" + $("#afinacionPredefinida").val());
                $("#agregarCuerda").show();
                $("#eliminarAfinacionPersonalizada").show();
                $("#addAfinacionPersonalizada").show();
                $('select').formSelect();
            }
        }
        $("select").formSelect();
    }

    rellenarDatosAfinacionGuardada(nombreLocalAfinacion) {
        let afinacionObjeto = localStorage.getItem(nombreLocalAfinacion);
        afinacionObjeto = JSON.parse(afinacionObjeto)
        let numNotas = afinacionObjeto["notasPersonalizadas"].length;

        for (let i = 0; i < numNotas; i++) {
            this.agregarCuerda();
        }


        $("#cuerdasContainer").children("div").each(function (index) {
            $(this).find("#personalizadaCuerda" + (index + 1) + "Nota").val(afinacionObjeto.notasPersonalizadas[index].nombre).formSelect();
            $(this).find("#personalizadaCuerda" + (index + 1) + "Octava").val(afinacionObjeto.notasPersonalizadas[index].octava).formSelect();
        });

        $("#nombreAfinacion").val(nombreLocalAfinacion.replace("afinacionPersonalizada_", ""));
        $("#nombreAfinacion").next().removeClass("active");
        M.updateTextFields();

    }

    agregarCuerda() {
        let numCuerdas = $("#cuerdasContainer select").length / 2 + 1;
        if (numCuerdas === 13) {
            alert("Límite de cuerdas máximas alcanzadas")
            return;
        }
        let nuevoCampo = `
            <div class="col s12">
                <div class="row" id="cuerda${numCuerdas}" style="margin-bottom: 0;">
                    <div class="input-field col s6">
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
                    <div class="input-field col s6">
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
            </div>`;

        $("#cuerdasContainer").append(nuevoCampo);
        if (numCuerdas > 6) {
            $("#eliminarUltimaCuerda").show();
        }
        M.updateTextFields();
        $('select').formSelect();
        this.establecerAfinacion(null);
    }

    eliminarUltimaCuerda() {
        $("#cuerdasContainer").children("div").last().remove();
        if ($("#cuerdasContainer select").length <= 12) {
            $("#eliminarUltimaCuerda").hide();
        }
        M.updateTextFields();
        $('select').formSelect();
        this.establecerAfinacion(null);
    }

    establecerAfinacion(event) {
        if(event !== null) {
            event.preventDefault();
        }

        let afinacionData = {};

        if ($("#afinacionPredefinida").val() === "personalizada") {
            let notas = [];
            
            $("#cuerdasContainer").children("div").each(function (index) {
                let notaNombre = $(this).find("#personalizadaCuerda" + (index + 1) + "Nota").val();
                let octavaNombre = $(this).find("#personalizadaCuerda" + (index + 1) + "Octava").val();
                let nota = {
                    nombre: notaNombre,
                    octava: octavaNombre
                };
                notas.push(nota);
            });

            afinacionData.notasPersonalizadas = notas;
            afinacionData.afinacionNombre = "personalizada";
        } else {
            afinacionData.afinacionNombre = $("#afinacionPredefinida").val();
        }

        localStorage.setItem("afinacionData", JSON.stringify(afinacionData));
        
    }

    cargarAfinacionesPersonalizadas() {
        let selectElement = $("#afinacionPredefinida");

        for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            if (clave.match(/^afinacionPersonalizada_.*/)) {
                let afinacionObjeto = localStorage.getItem(clave);
                console.log("Elementos encontrado: \n", afinacionObjeto);
                afinacionObjeto = JSON.parse(afinacionObjeto);
                let nuevaAfinacion = $("<option>").html(afinacionObjeto.afinacionNombre).val(afinacionObjeto.afinacionNombre);
                selectElement.find("option[value='personalizada']").before(nuevaAfinacion);

            }
        }
    }
}

$(function () {
    new GuitarApp().cargarAfinacionesPersonalizadas();
    $('select').formSelect();
    M.updateTextFields();
});