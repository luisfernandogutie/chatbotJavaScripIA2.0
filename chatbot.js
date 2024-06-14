// Cargar la base de conocimientos al inicio
let knowledgeBase = [];

fetch('./db/knowledge.json')
    .then(response => response.json())
    .then(data => {
        knowledgeBase = data;
    })
    .catch(error => {
        console.error('Error al cargar la base de conocimientos:', error);
    });

function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message) {
        // Agrega el mensaje al chat
        addMessage('You', message);

        // Lógica adicional del chatbot
        if (message.toLowerCase().includes('contactar') || message.toLowerCase().includes('cómo puedo contactar')) {
            window.location.href = 'https://wa.me/+59167517377';
            input.value = '';
            return;
        }

        // Obtener respuesta del chatbot
        const answer = getAnswer(knowledgeBase, message);
        addMessage('Bot', answer);

        input.value = '';
    }
}

function addMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');

    const messageElement = document.createElement('div');
    messageElement.textContent = message;

    if (sender === 'You') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('bot-message');
    }

    messageContainer.appendChild(messageElement);
    chatMessages.appendChild(messageContainer);
}

// Función para saludar al usuario y ofrecer opciones de ayuda
function greetUser() {
    const greetingMessage = "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?\n\n";
    const optionsMessage = "Puedes preguntarme sobre carreras, docentes, eventos, o si eres un nuevo estudiante o antiguo.";

    addMessage('Bot', greetingMessage + optionsMessage);
}

// Observador de mutaciones para desplazamiento automático
const observer = new MutationObserver(() => {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

const config = { childList: true };
observer.observe(document.getElementById('chat-messages'), config);

// Saludar al usuario cuando la página se carga
greetUser();

// Función para obtener la respuesta del chatbot basada en el archivo JSON
// Función para obtener la respuesta del chatbot basada en la base de conocimientos
function getAnswer(data, question) {
    const normalizedQuestion = normalizeText(question);
    let bestMatch = null;
    let highestSimilarity = 0;

    // Array para almacenar las preguntas similares encontradas
    let similarQuestions = [];

    data.forEach(entry => {
        const normalizedEntryQuestion = normalizeText(entry.question);
        const similarity = calculateSimilarity(normalizedQuestion, normalizedEntryQuestion);

        // Buscar la mejor coincidencia por similitud
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestMatch = entry;
        }

        // Recopilar preguntas similares para más adelante
        if (similarity > 0.5) { // Umbral de similitud
            similarQuestions.push(entry);
        }
    });

    if (bestMatch && highestSimilarity > 0.5) {
        // Coincidencia clara encontrada por similitud
        const answers = bestMatch.answer;

        // Mostrar una de las tres respuestas si hay exactamente tres disponibles
        if (answers.length === 3) {
            return answers[Math.floor(Math.random() * 3)];
        } else {
            return getRandomAnswer(answers); // Devolver una respuesta aleatoria de las respuestas disponibles
        }
    } else {
        // Si no hay una coincidencia clara por similitud, intentar responder de manera más contextualizada
        return handleNoMatch();
    }
}

function handleNoMatch() {
    // Aquí podrías implementar lógicas para manejar respuestas más variadas y contextuales
    const responses = [
        "Lo siento, no tengo información sobre eso en este momento.",
        "Parece que no puedo ayudarte con eso. ¿Quieres preguntar algo más?",
        "No estoy seguro de entender tu pregunta. ¿Podrías intentar preguntar de otra manera?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}


// Función para obtener una respuesta aleatoria
function getRandomAnswer(answers) {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}


// Función para obtener una respuesta aleatoria
function getRandomAnswer(answers) {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}


function processSimilarQuestions(question) {
    // Aquí se deben comparar las preguntas similares utilizando NLP
    const similarQuestions = knowledgeBase.filter(entry => {
        const normalizedEntryQuestion = normalizeText(entry.question);
        const similarityScore = calculateSimilarity(normalizeText(question), normalizedEntryQuestion);
        return similarityScore > 0.7; // Umbral de similitud arbitrario, puedes ajustarlo según tus necesidades
    });

    return similarQuestions;
}

// Función para normalizar el texto
function normalizeText(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

// Función para calcular la similitud entre dos textos
function calculateSimilarity(text1, text2) {
    const words1 = text1.split(' ');
    const words2 = text2.split(' ');

    const commonWords = words1.filter(word => words2.includes(word)).length;
    return commonWords / Math.max(words1.length, words2.length);
}
