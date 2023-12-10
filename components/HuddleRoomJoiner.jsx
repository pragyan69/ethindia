// import React, { useEffect, useRef } from 'react';
// import { HuddleClient, HuddleProvider } from '@huddle01/react';
// import {
//     useLocalAudio,
//     useLocalPeer,
//     useLocalVideo,
//     usePeerIds,
//     useRoom,
//   } from "@huddle01/react/hooks";
// import RemotePeer from "./RemotePeer";
// // Define your HuddleClient outside of the component for better performance
// const huddleClient = new HuddleClient({
//   projectId: 'E7MsNFLXDJTdwCL4UZpqn48pD_i6-m-M', // Your project ID here
//   options: {
//     activeSpeakers: {
//       size: 8,
//     },
//   },
// });

// const RoomJoinComponent = ({ roomId, token }) => {
//     const { joinRoom } = useRoom();
//     const { enableVideo, stream: videoStream } = useLocalVideo();
//     const { enableAudio, stream: audioStream } = useLocalAudio();
//     const { peerIds } = usePeerIds();
//     const videoRef = useRef(null);
  
//     useEffect(() => {
//       if (roomId && token) {
//         joinRoom({ roomId, token })
//           .then(() => {
//             console.log('Joined room successfully');
//             enableVideo();
//             enableAudio();
//           })
//           .catch(error => console.error('Error joining room:', error));
//       }
//     }, [roomId, token, joinRoom, enableVideo, enableAudio]);
  
//     useEffect(() => {
//       if (videoStream && videoRef.current) {
//         videoRef.current.srcObject = videoStream;
//       }
//     }, [videoStream]);
  
//     return (
//       <div>
//         <video ref={videoRef} autoPlay muted />
//         {peerIds.map(peerId => <RemotePeer key={peerId} peerId={peerId} />)}
//         {/* ... Add buttons and other UI elements as needed ... */}
//       </div>
//     );
//   };
  
//   const HuddleRoomJoiner = ({ roomId, token }) => (
//     <HuddleProvider client={huddleClient}>
//       <RoomJoinComponent roomId={roomId} token={token} />
//     </HuddleProvider>
//   );
  
//   export default HuddleRoomJoiner;





import React, { useEffect, useRef, useState } from 'react';
import { HuddleClient, HuddleProvider } from '@huddle01/react';
import {
  useLocalAudio,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import RemotePeer from "./RemotePeer";

const huddleClient = new HuddleClient({
  projectId: 'E7MsNFLXDJTdwCL4UZpqn48pD_i6-m-M', // Your project ID here
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

const RoomJoinComponent = ({ roomId, token }) => {
  const { joinRoom } = useRoom();
  const { enableVideo, disableVideo, stream: videoStream, isVideoOn } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();
  const { peerIds } = usePeerIds();
  const videoRef = useRef(null);

  useEffect(() => {
    if (roomId && token) {
      joinRoom({ roomId, token })
        .then(() => {
          console.log('Joined room successfully');
          enableVideo();
          enableAudio();
        })
        .catch(error => console.error('Error joining room:', error));
    }
  }, [roomId, token, joinRoom, enableVideo, enableAudio]);

  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      {peerIds.map(peerId => <RemotePeer key={peerId} peerId={peerId} />)}

      {/* Video Control Button */}
      <button onClick={isVideoOn ? disableVideo : enableVideo}>
        {isVideoOn ? 'Disable' : 'Enable'} Video
      </button>

      {/* Audio Control Button */}
      <button onClick={isAudioOn ? disableAudio : enableAudio}>
        {isAudioOn ? 'Mute' : 'Unmute'} Audio
      </button>

      {/* ... Add other UI elements as needed ... */}
    </div>
  );
};

const HuddleRoomJoiner = ({ roomId, token }) => (
  <HuddleProvider client={huddleClient}>
    <RoomJoinComponent roomId={roomId} token={token} />
  </HuddleProvider>
);

export default HuddleRoomJoiner;

