const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Use environment variable for API key
const HF_API_KEY = process.env.HF_API_KEY;

app.post("/webhook", async (req, res) => {
    const userMessage = req.body.queryResult.queryText;

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: userMessage },
            { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );

        const botReply = response.data.generated_text || "Sorry, I couldn't process that.";
        res.json({ fulfillmentText: botReply });
    } catch (error) {
        console.error(error);
        res.json({ fulfillmentText: "I'm sorry, something went wrong." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
