// /functions/enviarMensagem.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const { message, user } = JSON.parse(event.body);
        
        // Armazenando a mensagem em um arquivo JSON simples (isso não é ideal em produção, mas funciona para protótipos)
        const filePath = path.join(__dirname, '../messages.json');
        
        let messages = [];
        if (fs.existsSync(filePath)) {
            messages = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        messages.push({ user, message });

        fs.writeFileSync(filePath, JSON.stringify(messages));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Mensagem enviada com sucesso!' })
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método não permitido' })
    };
};