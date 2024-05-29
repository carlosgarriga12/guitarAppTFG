let afinacion = new ServicioAfinacion();
let guitarra = new Guitarra(afinacion.obtenerAfinacionGuardada())
guitarra.pintar();
guitarra.rellenarMastil();

let acordeActual = new Acorde(new Nota("C", "", 3), Acordes.Mayor);
let acordeNum = 0;
let notasGuitarra = guitarra.pintarAcorde(guitarra.buscarAcorde(acordeActual.getNotas()), acordeNum, acordeActual)

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
    let tiempoEspera = 150;
    notasGuitarra.forEach((nota, index) => {
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
    if(guitarra.buscarAcorde(notasAcorde).length === 0) {
        return;
    }
    if (acordeNum === guitarra.buscarAcorde(notasAcorde).length) {
        acordeNum = 0; 
    }
    $(".dedo").remove();
    $(".notaAcorde").remove();

    notasGuitarra = guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum, acordeActual);
    
}

function anteriorAcorde() {
    let notasAcorde = acordeActual.getNotas();
    acordeNum--;
    if(guitarra.buscarAcorde(notasAcorde).length === 0) {
        return;
    }
    if (acordeNum === -1) {
        acordeNum = guitarra.buscarAcorde(notasAcorde).length - 1; 
    }

    $(".dedo").remove();
    $(".notaAcorde").remove();

    notasGuitarra = guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum, acordeActual);
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
        notasGuitarra = guitarra.pintarAcorde(guitarra.buscarAcorde(notasAcorde), acordeNum, acordeActual);
    });
    $('select').formSelect();
});