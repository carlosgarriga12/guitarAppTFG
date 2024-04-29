let afinacion = new ServicioAfinacion();
let guitarra = new Guitarra(afinacion.obtenerAfinacionGuardada())
guitarra.pintar();
guitarra.rellenarMastil();

let acordeActual = new Acorde(new Nota("C", "", 3), Acordes.Mayor);
let acordeNum = 0;
guitarra.pintarAcorde(guitarra.buscarAcorde(acordeActual.getNotas()), acordeNum)

const synth = new Tone.PolySynth(Tone.Synth, {
    volume: -5,
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.03,
        decay: 0.1,
        sustain: 0.3,
        release: 1
    },
    portamento: 0.05
}).toDestination();

function generarSonido() {
    let tiempoEspera = acordeActual.getNotasObjeto().length === 3 ? 75 : 100;
    let acordeAux = new Acorde(acordeActual.getNotaBase().setOctava(4), acordeActual.getTipo())
    acordeAux.getNotasObjeto().forEach((nota, index) => {
        setTimeout(() => {
            synth.triggerAttackRelease(nota.getName() + nota.getOctava(), "8n", Tone.now())
        }, index * tiempoEspera);
    });
}

function volverIndex() {
    window.location.href = "index.html";
}

function irAJuego() {
    window.location.href = "juego.html";
}

function siguienteAcorde() {
    let notasAcorde = acordeActual.getNotas();
    acordeNum++;
    if (acordeNum === guitarra.buscarAcorde(notasAcorde).length) {
        acordeNum = 0; 
    }
    $(".dedo").remove();
    $(".notaAcorde").remove();

    guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum);
}

function anteriorAcorde() {
    let notasAcorde = acordeActual.getNotas();
    acordeNum--;
    if (acordeNum === -1) {
        acordeNum = guitarra.buscarAcorde(notasAcorde).length - 1; 
    }

    $(".dedo").remove();
    $(".notaAcorde").remove();

    guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum);
}

$(function() {
    $("#acordeForm select").on("change", function () {
        let notaBase = $("#notaBase").val();
        let tipoAcorde = $("#tipoAcorde").val();

        if (notaBase.length > 1) {
            let notaInicial = notaBase[0];
            let alteracion = notaBase[1];
            acordeActual = new Acorde(new Nota(notaInicial, alteracion, 3), Acordes[tipoAcorde]);
        } else {
            acordeActual = new Acorde(new Nota(notaBase, "", 3), Acordes[tipoAcorde]);
        }

        let notasAcorde = acordeActual.getNotas();

        $(".dedo").remove();
        $(".notaAcorde").remove();
        acordeNum = 0;
        guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum);
    });
});