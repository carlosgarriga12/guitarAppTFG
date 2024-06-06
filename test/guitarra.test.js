const { Nota } = require('../js/baseMusica/nota.js');
const { Guitarra } = require('../js/baseMusica/guitarra.js');

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
            expect(() => new Guitarra(afinacion)).toThrow('La afinación no puede tener menos de 6 notas');
        });
        
        it('debería lanzar una excepción cuando trato de crear una guitarra con 13 cuerdas', () => {
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
                new Nota("E", "", 5)
            ];
            expect(() => new Guitarra(afinacion)).toThrow('La afinación no puede tener más de 12 notas');
        });

        it('debería lanzar una excepción cuando trato de crear una guitarra con 5 cuerdas', () => {
            let afinacion = [
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("E", "", 2),
                new Nota("A", "", 2)
            ];
            expect(() => new Guitarra(afinacion)).toThrow('La afinación no puede tener menos de 6 notas');
        });

        it('debería crear correctamente una guitarra con 6 cuerdas', () => {
            let afinacion = [
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3),
                new Nota("D", "", 3),
                new Nota("G", "", 3)
            ];
            const guitarra = new Guitarra(afinacion);
            expect(guitarra).toBeInstanceOf(Guitarra);
            expect(guitarra.afinacion.length).toBe(6);
            expect(guitarra.mastil.length).toBe(6);
            expect(guitarra.trastes).toBe(12);
        });

        it('debería crear correctamente una guitarra con 12 cuerdas', () => {
            let afinacion = [
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3),
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3),
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3)
            ];
            const guitarra = new Guitarra(afinacion);
            expect(guitarra).toBeInstanceOf(Guitarra);
            expect(guitarra.afinacion.length).toBe(12);
            expect(guitarra.mastil.length).toBe(12);
            expect(guitarra.trastes).toBe(12);
        });

        it('debería crear correctamente una guitarra con 8 cuerdas', () => {
            let afinacion = [
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3),
                new Nota("E", "", 2),
                new Nota("A", "", 2),
                new Nota("D", "", 3),
                new Nota("G", "", 3)
            ];
            const guitarra = new Guitarra(afinacion);
            expect(guitarra).toBeInstanceOf(Guitarra);
            expect(guitarra.afinacion.length).toBe(8);
            expect(guitarra.mastil.length).toBe(8);
            expect(guitarra.trastes).toBe(12);
        });
    });
});