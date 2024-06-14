function getAnswer(data, userQuestion) {
    let bestMatch = null;
    let highestSimilarity = 0;

    data.forEach(entry => {
        const similarity = calculateSimilarity(userQuestion, entry.question);
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestMatch = entry;
        }
    });

    if (highestSimilarity > 0.7) { // Umbral de similitud del 70%
        return bestMatch.answer;
    } else {
        return 'Lo siento, no conozco la respuesta a esa pregunta.';
    }
}

function calculateSimilarity(text1, text2) {
    // Implementa aquí tu métrica de similitud de texto
    // Puedes utilizar la distancia de Levenshtein, la similitud del coseno, el coeficiente de Jaccard, etc.
    // Devuelve un valor entre 0 y 1 que representa la similitud entre los dos textos
}

// Luego, utilizarías esta función getAnswer en tu lógica de manejo de mensajes:
const answer = getAnswer(knowledgeBase, userMessage);
