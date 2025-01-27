document.querySelector("button").addEventListener("click", async function() {
    const userInput = document.querySelector("#user-input").value;
    const responsePanel = document.querySelector("#response-panel");

    if (!userInput) {
        responsePanel.innerHTML = "Please enter a question.";
        return;
    }

    responsePanel.innerHTML = "Thinking...";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${YOUR_API_KEY_HERE}`
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
