const { Nota } = require('../nota.js');
const { Guitarra } = require('../guitarra.js');

describe('Crear una guitarra', () => {
    describe('con el constructor', () => {
        it('debería lanzar excepción cuando trato de crear una guitarra con más de 12 notas en la afinación', () => {
            let afinacion = [
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3),
                new Nota("B", "", 3),
                new Nota("E", "", 4),
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3),
                new Nota("B", "", 3),
                new Nota("E", "", 4),
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3),
                new Nota("B", "", 3),
                new Nota("E", "", 4)
            ];
            expect(() => new Guitarra(afinacion)).toThrow('La afinación no puede tener más de 12 notas');
        });

        it('debería lanzar excepción cuando trato de crear una guitarra con menos de 4 notas en la afinación', () => {
            let afinacion = [
                new Nota("E", "", 2),
                new Nota("A", "", 2)
            ];
            expect(() => new Guitarra(afinacion)).toThrow('La afinación no puede tener menos de 4 notas');
        });
    });
});