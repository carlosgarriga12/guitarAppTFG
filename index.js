$(document).ready(function () {
    $("#afinacionPredefinida").change(function () {
        if ($(this).val() === "personalizada") {
            $("#personalizadaContainer").show();
        } else {
            $("#personalizadaContainer").hide();
        }
    });

    $("#agregarCuerda").click(function () {
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
    });

    $("#eliminarUltimaCuerda").click(function () {
        $("#cuerdasContainer div:last-child").remove();
        if ($("#cuerdasContainer select").length === 0) {
            $(this).hide();
        }
    });
});

$(document).ready(function () {
    $("#afinacionForm").submit(function (event) {
        event.preventDefault();

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
    });
});