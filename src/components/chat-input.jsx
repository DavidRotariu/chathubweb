import { useState, useEffect } from 'react'
import { Button } from '@mantine/core'
import { MESSAGES_ENDPOINT, WEBSOCKET_URL, MY_ID } from './urls'

async function postMessage(selectedDiscussion, message) {
    const body = {
        discussion_id: selectedDiscussion,
        user_id: MY_ID,
        value: message,
    }
    const response = await window.fetch(MESSAGES_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    const data = await response.json()

    return data
}


export function ChatInput({ selectedDiscussion, loadMessages,  loadDiscussions }) {
    const [value, setValue] = useState('')
    const [socket, setSocket] = useState(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        const newSocket = new WebSocket(WEBSOCKET_URL);
        newSocket.onopen = () => {
            //console.log('WebSocket connection opened at chat-input');
        };
        newSocket.onmessage = (event) => {
            loadDiscussions();
            loadMessages();
        };
        newSocket.onclose = () => {
            //console.log('WebSocket connection closed at chat-input');
        };
        setSocket(newSocket);
        return () => {
            newSocket.close();
        };
    }, [selectedDiscussion]);

    const sendMessage = () => {
        if (socket && value.trim() !== '') {
            const trimmedValue = value.trim();
            socket.send(trimmedValue);
            postMessage(selectedDiscussion, trimmedValue);
            setTimeout(() => {
                setValue('');
              }, 10);
          }
    };


    return (
        <div className="flex items-center gap-5">
            <textarea
                className="h-15 w-full border-2"
                onChange={(event) => setValue(event.target.value)}
                value={value}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            />

            <Button
                variant="outline"
                color="blue"
                className="block h-full p-4"
                radius="xl"
                onClick={sendMessage}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-up" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M18 11l-6 -6" />
                    <path d="M6 11l6 -6" />
                </svg>
            </Button>
        </div>
    )
}
