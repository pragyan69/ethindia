



import React, { FC, ReactNode, useState } from "react";
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";
import CreateRoom from "./CreateRoom";
import RoomList from "./RoomList";
import HuddleRoomJoiner from "./HuddleRoomJoiner";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  const fetchToken = async (selectedRoomId: string) => {
    try {
      const response = await axios.post('http://localhost:3001/generate-token', { roomId: selectedRoomId });
      let tk = response.data.token

      console.log({tk});
      
      setToken(tk);
      setRoomId(selectedRoomId);
      console.log("selectedroom: ", selectedRoomId,"tk", tk)
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  return (
    <>
      <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen">
        <Header />
        <div className="py-16 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8 w-full">
          {children}
          <CreateRoom />
          <RoomList onRoomSelect={fetchToken} />
          {token && roomId && <HuddleRoomJoiner roomId={roomId} token={token} />}
        </div>
      </div>
    </>
  );
};

export default Layout;


