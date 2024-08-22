import React from "react";
import { useState, useEffect, useRef } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axiosInstance from "../services/axiosService";


const ChatPage = ({isLoggedIn}) => {
   
    const [chatEvents, setChatEvents] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [userBadge, setUserBadge] = useState(null);
    const messageInput = useRef(null);

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

      useEffect(() => {
        // NOTE: This could be changed to update when isLoggedIn updates at the app level
        if (isLoggedIn || localStorage.getItem('loggedIn') === 'true') {
            const fetchUserBadge = async () => {
            try {
            const response = await axiosInstance.get('/user/badge');
            setUserBadge(response.data);
            } catch (error) {
            console.error("Failed to fetch user badge", error);
            }
        };

        fetchUserBadge();
        }
      }, [isLoggedIn]);

    const handleSubmitChat = (event) => {
        event.preventDefault();
        const message = event.target.message.value;
        const messageContent = message.trim();
        if(messageContent && stompClient) {
           const chatMessage = {
                sender: userBadge.initials,
                content: messageContent,
                type: 'CHAT'
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            messageInput.current.value = '';
        }
    };

     const handleSubmitUsers = (event) => {
        event.preventDefault();
       if (stompClient) { 
        stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: userBadge.initials, type: "JOIN" }));
        }
    };

    const handleMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        if (message.type === "JOIN") {
            setChatEvents((prevEvents) => [...prevEvents, { sender: message.sender, content: " joined the chat", type: "JOIN" }]);
        } else if (message.type === "LEAVE") {
            setChatEvents((prevEvents) => [...prevEvents, { sender: message.sender, content: " left the chat", type: "LEAVE" }]);
        } else if (message.type === "CHAT") {
            setChatEvents((prevEvents) => [...prevEvents, { sender: message.sender, content: message.content, type: "CHAT" }]);
        }
    };



return (
    <div>
        <h1>Chat Page</h1>
        {/* <form onSubmit={handleSubmitUsers}>
            <button type="submit">Add User</button>
        </form> */}
        {/* <div className="chat-window">
                {chatEvents.map((event, index) => (
                    <div key={index} className={`chat-message ${event.type}`}>
                        <strong>{event.sender}: </strong> {event.content}
                    </div>
                ))}
        </div> */}
        <form onSubmit={handleSubmitChat}>
            <input type="text" name ="message"/>
            <button type="submit">Send Message</button>
        </form>
        <div className="chat-window">
            {chatEvents.map((event, index) => (
                <div key={index} className={`chat-message ${event.type}`}>
                    <strong>{event.sender}: </strong> {event.content}
                </div>
            ))}
        </div>
    </div>
    
);


};

export default ChatPage