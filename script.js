function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const responsePanel = document.getElementById("response-panel");

    if (!userInput.trim()) {
        responsePanel.innerHTML = "<p>Please enter a question.</p>";
        return;
    }

    responsePanel.innerHTML = "<p>Thinking...</p>";

    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_API_KEY_HERE`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        responsePanel.innerHTML = `<p>${data.choices[0].message.content}</p>`;
    })
    .catch(error => {
        responsePanel.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
