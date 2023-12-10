import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const RoomList = ({ onRoomSelect }) => {
    const [rooms, setRooms] = useState([]);
    const [showRooms, setShowRooms] = useState(false);
    const API_KEY = 'WRK7aHhUs6KwyWR534VDkTyTq1rUG-rT';

    const fetchRooms = async () => {
        try {
            const response = await axios.get('https://api.huddle01.com/api/v1/get-rooms', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
            });
            setRooms(response.data.rooms);
            setShowRooms(true);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    return (
        <div className="p-6">
            <Typography variant="h4" gutterBottom>
                Rooms
            </Typography>
            <Button variant="contained" className='text-black' onClick={fetchRooms}>
                Show Rooms
            </Button>
            {showRooms && (
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                    {rooms.map(room => (
                        <Card key={room.roomId} className="w-80">
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {room.roomId}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Meeting URL: <Link href={room.meetingUrl} target="_blank" rel="noopener noreferrer">{room.meetingUrl}</Link>
                                </Typography>
                                <Typography variant="body2">
                                    Room Type: {room.roomType}
                                </Typography>
                                <Button 
                                  variant="contained" 
                                  color="primary" 
                                  className='mt-2 text-black' 
                                  onClick={() => onRoomSelect(room.roomId)}>
                                    Join Room
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoomList;
