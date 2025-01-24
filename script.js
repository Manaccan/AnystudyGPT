async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const responseDiv = document.getElementById("response");

    responseDiv.innerHTML = `You asked: ${userInput}`;

    // Ensure the API key is set correctly as a string
    const apiKey = "YOUR_API_KEY_HERE";
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const requestData = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
        max_tokens: 100,
        temperature: 0.7
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,  // Use the apiKey variable here
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
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


