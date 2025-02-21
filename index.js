const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("SereneAI Webhook is running!");
});

// Function to fetch a motivational quote
async function getQuote() {
    try {
        let response = await axios.get("https://zenquotes.io/api/random");
        return response.data[0].q + " - " + response.data[0].a;
    } catch (error) {
        return "You are doing great! Keep going. 💪";
    }
}

// Webhook endpoint for Dialogflow
app.post("/webhook", async (req, res) => {
    let intent = req.body.queryResult.intent.displayName;
    let output = "I'm here to help!";

    if (intent === "Motivation") {
        output = await getQuote();
    } else if (intent === "Feeling Anxious") {
        output = "I understand. Try deep breathing. Want me to guide you?";
    } else if (intent === "Breathing Exercise") {
        output = "Great! Breathe in for 4 seconds… hold for 7… exhale for 8.";
    } else if (intent === "Self-Care Tips") {
        output = "Try a short walk, journaling, or drinking water. Small steps matter!";
    }

    res.json({ fulfillmentText: output });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
