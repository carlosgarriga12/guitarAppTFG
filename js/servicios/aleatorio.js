class Aleatorio {
    static getNota() {
        const notas = ["C", "D", "E", "F", "G", "A", "B"]
        let nombre = notas[Math.floor(Math.random() * notas.length)]
        let alteracion = "";
        if (nombre !== "E" && nombre !== "B") {
            alteracion = (Math.random() < 0.5) ? "" : "#";
        }
        let nota = new Nota(nombre, alteracion, 3);
        return nota;
    }

    static getAcorde(notaBase) {
        let keys = Object.keys(Acordes);
        let tipoAcorde = Acordes[keys[keys.length * Math.random() << 0]];
        return new Acorde(notaBase, tipoAcorde);
    }
}