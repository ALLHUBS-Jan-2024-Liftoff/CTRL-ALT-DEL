import React from "react";
import { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";


const ChatPage = () => {
   
    const [chatEvents, setChatEvents] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const messageInput = React.useRef(null);

    useEffect(() => {
        // Establish WebSocket connection
        const socket = new SockJS('http://localhost:8080/api/ws');
        const client = Stomp.over(socket);
    
        client.connect({}, () => {
          // Subscribe to the chat event
          client.subscribe('/topic/public', (evt) => {
            setChatEvents((prevEvents) => [...prevEvents, JSON.parse(evt.body)]);
          });
          
        });
    
        setStompClient(client);
    
        return () => {
          if (stompClient) {
            stompClient.disconnect();
          }
        };
      }, []);

    const handleSubmitChat = (event) => {
        const messageContent = messageInput.value.trim();
        event.preventDefault();
        
    };

    const handleSubmitUsers = (event) => {

        event.preventDefault();
        stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: "username", type: "JOIN" }));
    };


return (
    <div>
        <h1>Chat Page</h1>
        <form onSubmit={handleSubmitUsers}>
            <button type="submit">Add User</button>
        </form>
        <form onSubmit={handleSubmitChat}>
            <input type="text"/>
            <button type="submit">Send Message</button>
        </form>
    </div>
);


};

export default ChatPage