async function sendMessage(){
    const chatBox = document.getElementById("chatBox");
    const userinput = document.getElementById("userInput");
    const userMessage = userinput.value;

    if(!userMessage) return;

    //Adicionar mensagem do usuário
    const userDiv = document.getElementById("div");
    userDiv.className = "user-message message";
    userDiv.textContent = userMessage
    chatBox.appendChild(userDiv);

    //Limpar campo de entrada
    userinput.value = "";

    //Fazer scroll automático para última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;

    //Configuração do endpoint e chave da api
    const endpoint = "https://ai-sillassilva9869ai378938847876.openai.azure.com";
    const apiKey = "4uWL21xiVqiFXsRZeGGJmgWe52BkftIKpVCTupgyMGWmaAm7qia4JQQJ99BCACHYHv6XJ3w3AAAAACOGXxwp";
    const deploymentId = "gpt-4";  //Nome do deployment no Azure Open AI
    const apiVersion = "2024-05-01-preview";    //Verifique a versão na documentação
}
