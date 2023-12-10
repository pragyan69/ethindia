import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CreateRoom = () => {
    const [title, setTitle] = useState('');
    const [hostWallet, setHostWallet] = useState('');
    const API_KEY = 'WRK7aHhUs6KwyWR534VDkTyTq1rUG-rT'; // Replace with your actual API key

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://api.huddle01.com/api/v1/create-room',
                {
                    title: title,
                    hostWallets: [hostWallet],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY,
                    },
                }
            );

            console.log(response.data);
            alert('Room created successfully!');
        } catch (error) {
            console.error('Error in API call:', error);
            alert('Failed to create room');
        }
    };

    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create a Room
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    label="Room Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Host Wallet Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    id="hostWallet"
                    value={hostWallet}
                    onChange={(e) => setHostWallet(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className = "text-black"
                >
                    Create Room
                </Button>
            </Box>
        </Box>
    );
};

export default CreateRoom;
