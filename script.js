document.querySelector("button").addEventListener("click", async function() {
    const userInput = document.querySelector("#user-input").value;
    const responsePanel = document.querySelector("#response-panel");

    if (!userInput.trim()) {
        responsePanel.innerHTML = "Please enter a question.";
        return;
    }

    responsePanel.innerHTML = "Thinking...";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${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 }`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }],
                max_tokens: 100
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        responsePanel.innerHTML = data.choices[0].message.content;
    } catch (error) {
        responsePanel.innerHTML = `Error: ${error.message}`;
    }
});
