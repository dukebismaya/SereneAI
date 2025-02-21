const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Webhook route
app.post("/webhook", (req, res) => {
    try {
        const intentName = req.body.queryResult.intent.displayName;

        let responseText = "I'm here to help!"; // Default response

        // Custom responses based on intent
        if (intentName === "Default Welcome Intent") {
            responseText = "Welcome! How can I assist you today?";
        } else if (intentName === "Anxiety Help") {
            responseText = "I understand that dealing with anxiety can be tough. Would you like some breathing exercises or grounding techniques?";
        } else if (intentName === "Advice Intent") {
            responseText = "Sure! I can provide guidance on many topics. What advice are you looking for?";
        } else {
            responseText = "Sorry, I don't understand that yet. Can you rephrase?";
        }

        // Send response back to Dialogflow
        res.json({ fulfillmentText: responseText });
    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).json({ fulfillmentText: "Something went wrong!" });
    }
});

// Health check route
app.get("/", (req, res) => {
    res.send("SereneAI Webhook is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
