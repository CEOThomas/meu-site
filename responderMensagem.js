// /functions/responderMensagem.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const { response, user } = JSON.parse(event.body);
        
        const filePath = path.join(__dirname, '../messages.json');
        let messages = [];

        if (fs.existsSync(filePath)) {
            messages = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        // Encontra a mensagem do usuário e adiciona a resposta do staff
        const messageIndex = messages.findIndex(msg => msg.user === user);
        if (messageIndex !== -1) {
            messages[messageIndex].response = response;
        }

        fs.writeFileSync(filePath, JSON.stringify(messages));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Resposta enviada com sucesso!' })
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método não permitido' })
    };
};
