const { Nota } = require('../nota.js');

describe('Crear una nota', () => {
    describe('con el constructor', () => {
        it('debería lanzar una excepción para nombres de notas inválidos', () => {
            expect(() => new Nota('Foo', '#', 4)).toThrow('Nombre de nota inválido');
        });

        it('debería lanzar una excepción para nombres de alteraciones inválidas', () =>{
            expect(() => new Nota('F', 'sostenido', 4)).toThrow('Nombre de alteración inválido');
        });

        it('debería lanzar una excepción para octavas negativas', () =>{
            expect(() => new Nota('F', '#', -1)).toThrow('La octava no puede ser negativa');
        });

        it('debería crear una instancia de Nota para nombres de notas válidos', () => {
            const nota = new Nota('F', '#', 4);
            expect(nota).toBeInstanceOf(Nota);
            expect(nota.nombre).toBe('F');
            expect(nota.alteracion).toBe('#');
            expect(nota.octava).toBe(4);
        });
    });
});

describe('Dada una nota', () => {
    describe('quiero obtener su siguiente nota', () => {
        it('debería devolver la siguiente nota correctamente para notas naturales', () => {
            const nota1 = new Nota('C', '', 4);
            const siguienteNota1 = nota1.siguiente();
            expect(siguienteNota1).toBeInstanceOf(Nota);
            expect(siguienteNota1.nombre).toBe('C');
            expect(siguienteNota1.alteracion).toBe('#');
            expect(siguienteNota1.octava).toBe(4);
        });

        it('debería devolver la siguiente nota correctamente para notas con alteración sostenida', () => {
            const nota2 = new Nota('C', '#', 4);
            const siguienteNota2 = nota2.siguiente();
            expect(siguienteNota2).toBeInstanceOf(Nota);
            expect(siguienteNota2.nombre).toBe('D');
            expect(siguienteNota2.alteracion).toBe('');
            expect(siguienteNota2.octava).toBe(4);
        });

        it('debería devolver la siguiente nota correctamente para notas con alteración bemol', () => {
            const nota3 = new Nota('D', 'b', 4);
            const siguienteNota3 = nota3.siguiente();
            expect(siguienteNota3).toBeInstanceOf(Nota);
            expect(siguienteNota3.nombre).toBe('D');
            expect(siguienteNota3.alteracion).toBe('');
            expect(siguienteNota3.octava).toBe(4);
        });

        it('debería devolver la siguiente nota correctamente para la nota E', () => {
            const nota4 = new Nota('E', '', 4);
            const siguienteNota4 = nota4.siguiente();
            expect(siguienteNota4).toBeInstanceOf(Nota);
            expect(siguienteNota4.nombre).toBe('F');
            expect(siguienteNota4.alteracion).toBe('');
            expect(siguienteNota4.octava).toBe(4);
        });

        it('debería devolver la siguiente nota correctamente para la nota B', () => {
            const nota5 = new Nota('B', '', 4);
            const siguienteNota5 = nota5.siguiente();
            expect(siguienteNota5).toBeInstanceOf(Nota);
            expect(siguienteNota5.nombre).toBe('C');
            expect(siguienteNota5.alteracion).toBe('');
            expect(siguienteNota5.octava).toBe(5);
        });
    });
});