document.getElementById('close-chatbot').addEventListener('click', function() {
    document.getElementById('chatbot').style.display = 'none';
    document.getElementById('chatbot-toggle').style.display = 'block';
});

document.getElementById('send-chatbot').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('chatbot-toggle').addEventListener('click', function() {
    var chatbot = document.getElementById('chatbot');
    if (chatbot.style.display === 'none' || chatbot.style.display === '') {
        chatbot.style.display = 'flex';
        document.getElementById('chatbot-toggle').style.display = 'none';
    } else {
        chatbot.style.display = 'none';
        document.getElementById('chatbot-toggle').style.display = 'block';
    }
});

document.getElementById('submit-user-info').addEventListener('click', function() {
    var name = document.getElementById('user-name').value;
    var email = document.getElementById('user-email').value;
    var termsAccepted = document.getElementById('terms-checkbox').checked;

    if (name.trim() !== "" && email.trim() !== "" && termsAccepted) {
        document.getElementById('user-form').style.display = 'none';
        document.getElementById('chat-interface').style.display = 'block';
        document.getElementById('chatbot-footer').style.display = 'flex';
    } else {
        alert("Por favor, complete todos los campos y acepte los términos y condiciones.");
    }
});
