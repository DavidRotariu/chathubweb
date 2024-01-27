import { useEffect, useState, useRef } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { MESSAGES_ENDPOINT, WEBSOCKET_URL } from './urls'


async function fetchMessages(MY_ID, DISCUSSIONS_ID) {
    if(DISCUSSIONS_ID == '') return 'error'
    const API = `${MESSAGES_ENDPOINT}/?user_id=${MY_ID}&discussion_id=${DISCUSSIONS_ID}`
    const response = await window.fetch(API)
    const data = await response.json()
    return data
}

export function ChatMessages({ selectedDiscussion, loadDiscussions, MY_ID }) {
    const [messages, setMessages] = useState([])
    const [selectedSomething, selectSomething] = useState(false)
    const [socket, setSocket] = useState(null);
    const messageContainerRef = useRef(null);

    const handleWebSocketMessage = () => {
        loadDiscussions();
        loadMessages();
    };

    useEffect(() => {
        const newSocket = new WebSocket(WEBSOCKET_URL);
        newSocket.onopen = () => {
            //console.log('WebSocket connection opened at chat-messages');
        };
        newSocket.onmessage = handleWebSocketMessage;
        newSocket.onclose = () => {
            //console.log('WebSocket connection closed at chat-messages');
        };
        setSocket(newSocket);
        return () => {
            newSocket.close();
        };
    }, []);


    async function loadMessages() {
        const data = await fetchMessages(MY_ID, selectedDiscussion)
        if (data.detail == 'Discussion not found.' || data == 'error')
            selectSomething(false)
        else {
            setMessages(data)
            selectSomething(true)
        }
    }

    useEffect(() => {
        loadMessages()
    }, [selectedDiscussion])

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <div>
            {
                selectedSomething ?
                    (
                        <div className="mx-auto max-w-screen-lg" >

                            <div className="mb-4 flex flex-col overflow-auto border-2 p-8 h-[70vh]" ref={messageContainerRef}>
                                {messages.map((message) => (
                                    <div
                                        className={`mb-1 ${message.user_id === MY_ID ? 'self-end' : 'self-start'}`}
                                        key={message.id}
                                    >
                                        <ChatMessage
                                            value={message.value}
                                            userName={message.name}
                                            isMe={message.user_id === MY_ID}
                                        />
                                    </div>
                                ))}
                            </div>
                            <ChatInput selectedDiscussion={selectedDiscussion} loadMessages={loadMessages} loadDiscussions={loadDiscussions} MY_ID={MY_ID}/>

                        </div>) : (
                        <div className="mx-auto h-[80vh] grid place-items-center">
                            <p>Please select a chat</p>
                        </div>

                    )
            }
        </div>


    )
}
