const questions = [
    {
        question: '¿Cuál es el planeta más grande del sistema solar?',
        options: ['Marte', 'Júpiter', 'Venus', 'Saturno'],
        answer: 'Júpiter'
    },
    {
        question: '¿Quién escribió "Cien años de soledad"?',
        options: ['Mario Vargas Llosa', 'Julio Cortázar', 'Gabriel García Márquez', 'Pablo Neruda'],
        answer: 'Gabriel García Márquez'
    },
    {
        question: '¿Cuántos lados tiene un hexágono?',
        options: ['5', '6', '7', '8'],
        answer: '6'
    },
    {
        question: '¿Cuál es el océano más grande del mundo?',
        options: ['Océano Atlántico', 'Océano Índico', 'Océano Glacial Ártico', 'Océano Pacífico'],
        answer: 'Océano Pacífico'
    },
    {
        question: '¿Qué metal es líquido a temperatura ambiente?',
        options: ['Oro', 'Plata', 'Mercurio', 'Cobre'],
        answer: 'Mercurio'
    }
];

// Exporta las preguntas para que el servidor pueda usarlas
module.exports = questions;