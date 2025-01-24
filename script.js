async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const responseDiv = document.getElementById("response");

    responseDiv.innerHTML = `You asked: ${userInput}`;

    // API endpoint and key retrieval from environment
    const endpoint = "https://api.openai.com/v1/chat/completions";
    
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,  // Using environment variable
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }],
                max_tokens: 100,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        responseDiv.innerHTML += `<br>GPT Response: ${data.choices[0].message.content}`;
    } catch (error) {
        responseDiv.innerHTML += `<br>Error: ${error.message}`;
    }
}

