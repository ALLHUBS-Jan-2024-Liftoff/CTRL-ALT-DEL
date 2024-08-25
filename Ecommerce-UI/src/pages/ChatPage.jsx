
import React, { useState, useEffect, useRef } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axiosInstance from "../services/axiosService";
import './ChatPage.css'; 

const ChatPage = ({ isLoggedIn }) => {
    const [chatEvents, setChatEvents] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false); 
    const [userBadge, setUserBadge] = useState(null);
    const messageInput = useRef(null);

    useEffect(() => {
        console.log("Opening Web Socket...");
        const socket = new SockJS('http://localhost:8080/api/ws');
        const client = Stomp.over(socket);
        client.connect({}, () => {
            console.log("Connected to WebSocket");
            setConnected(true); 

            client.subscribe('/topic/public', (evt) => {
                setChatEvents((prevEvents) => {
                    const newEvent = JSON.parse(evt.body);

                    
                    if (!prevEvents.some(event => event.id === newEvent.id)) {
                        return [...prevEvents, newEvent];
                    }
                    return prevEvents;
                });
            });
        });

        setStompClient(client);

        return () => {
            console.log(">>> DISCONNECT");
            if (connected && client) { 
                client.disconnect();
                setConnected(false); 
            }
        };
    }, [connected]);  
    useEffect(() => {
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
        event.stopPropagation();

        
        if (!userBadge) {
            console.error("User badge is not available.");
            return;
        }

        const message = event.target.message.value;
        const messageContent = message.trim();
        if (messageContent && stompClient) {
            const chatMessage = {
                sender: userBadge.initials,
                content: messageContent,
                type: 'CHAT'
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            messageInput.current.value = '';
        }
    };

    return (
        <div className="container">
            <h1 className="header">Live Chat</h1>
            <div className="chat-window">
                {chatEvents.map((event, index) => (
                    <div key={index} className={`chat-message ${event.type}`}>
                        <strong>{event.sender}: </strong> {event.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmitChat} className="form">
                <input type="text" name="message" ref={messageInput} className="input" placeholder="Type a message..." />
                <button type="submit" className="button">Send</button>
            </form>
        </div>
    );
};

export default ChatPage;