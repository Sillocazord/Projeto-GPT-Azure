# Projeto-GPT-Azure

//A seguir, todo o codigo em caso de uma necessidade ou algum erro, se copiar e colar, so substituir algumas informações que deve dar certo, tmj famillia
===========CSS=============
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg , #232020, #3300b3);
    color: #f8fff4;
}

.chat-container{
    width: 90%;
    max-width: 600px;
    background: #232020;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.header{
    background: #3300b3;
    padding: 16px;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
}

.chat-box{
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #1d1b1b;
}

.message{
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 12px;
}

.user-message{
    align-self: flex-end;
    background: #3300b3;
    color: #f8fff4;
}

.bot-message{
    align-self: flex-start;
    background: #3a3a3a;
    color: #f8fff4;
}

.input-container{
    display: flex;
    padding: 16px;
    gap: 8px;
    background: #1d1b1b;
}

input[type="text"]{
    flex: 1;
    padding: 12px;
    border: 2px solid #3300b3;
    border-radius: 8px;
    font-size: 1rem;
    background: #2e2c2c;
    color: #f8fff4;
}

input[type="text"]::placeholder{
    color: #b3b3b3;
}

button{
    padding: 12px 16px;
    background: #3300b3;
    color: #f8fff4;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover{
    background: rgb(43, 0, 161);
}

.chat-box::-webkit-scrollbar{
    width: 8px;
}

.chat-box::-webkit-scrollbar-thumb{
    background: #3300b3;
    border-radius: 4px;
}

.chat-box::-webkit-scrollbar-track{
    background: #2e2c2c;
}



==================== HTML ====================


	<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ProjetoGPT Azure</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="chat-container">
        <header class="header">ChatGPT Azure</header>
        <div class="chat-box" id="chatBox">
            <div class="bot-message message">Olá, Como posso ajudar você hoje?</div>
        </div>
        <div class="input-container">
            <input type="text" id="userInput" placeholder="Digite sua mensagem...">
            <button onclick="sendMessage()">Enviar</button>
        </div>
    </div>
</body>
</html>




===================== JS =========================



async function sendMessage() {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const userMessage = userInput.value;
  
    if (!userMessage) return;
  
    // Adiciona mensagem do usuário
    const userDiv = document.createElement("div");
    userDiv.className = "user-message message";
    userDiv.textContent = userMessage;
    chatBox.appendChild(userDiv);
  
    // Limpa o campo de entrada
    userInput.value = "";
  
    // Faz scroll automático para a última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Configurações do endpoint e chave da API
    const endpoint = "https://ai-joaoribeiro0983ai897724152201.openai.azure.com";
    const apiKey = "DPXhJczdg6VOhO7C1hpEmnCK64uJm84bml5r3RHqOT1Nk0wDJl1rJQQJ99BBACHYHv6XJ3w3AAAAACOGb0Ez";
    const deploymentId = "gpt-4-model"; // Nome do deployment no Azure OpenAI
    const apiVersion = "2024-05-01-preview"; // Verifique a versão na documentação
  
    // URL para a chamada da API
    const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;
    
    // Configurações do corpo da requisição
    const data = {
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 50
    };
  
    // Cabeçalhos da requisição
    const headers = {
      "Content-Type": "application/json",
      "api-key": apiKey
    };
  
    try {
      // Faz a requisição com fetch
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const result = await response.json();
        const botMessage = result.choices[0].message.content;
  
        // Adiciona a resposta do bot
        const botDiv = document.createElement("div");
        botDiv.className = "bot-message message";
        botDiv.textContent = botMessage;
        chatBox.appendChild(botDiv);
  
        // Faz scroll automático para a última mensagem
        chatBox.scrollTop = chatBox.scrollHeight;
      } else {
        console.error("Erro na requisição:", response.status, response.statusText);
  
        const botDiv = document.createElement("div");
        botDiv.className = "bot-message message";
        botDiv.textContent = "Erro ao se comunicar com o serviço.";
        chatBox.appendChild(botDiv);
      }
    } catch (error) {
      console.error("Erro:", error);
  
      const botDiv = document.createElement("div");
      botDiv.className = "bot-message message";
      botDiv.textContent = "Erro ao se comunicar com o serviço.";
      chatBox.appendChild(botDiv);
    }
  }
  
  