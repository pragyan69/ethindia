const express = require('express');
const { AccessToken, Role } = require('@huddle01/server-sdk/auth');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON body in requests

// Replace with your actual API key
const apiKey = "WRK7aHhUs6KwyWR534VDkTyTq1rUG-rT"; 

app.post('/generate-token', async (req, res) => {
    const roomId = req.body.roomId; // Get roomId from the request

    try {
        const accessToken = new AccessToken({
            apiKey,
            roomId,
            role: Role.HOST,
            permissions: {
                admin: true,
                canConsume: true,
                canProduce: true,
                canProduceSources: {
                    cam: true,
                    mic: true,
                    screen: true,
                },
                canRecvData: true,
                canSendData: true,
                canUpdateMetadata: true,
            },
            options: {
                metadata: { 
                    // Additional metadata if needed
                },
            },
        });

        console.log('AccessToken instance:', accessToken);
        
        const token = await accessToken.toJwt();
        console.log('Generated JWT token:', token);

        if (typeof token !== 'string' || token.length === 0) {
            throw new Error('JWT token generation failed - Token is empty.');
        }

        res.json({ token });
    } catch (error) {
        console.error('Error during token generation:', error);
        res.status(500).send("Error generating token: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
