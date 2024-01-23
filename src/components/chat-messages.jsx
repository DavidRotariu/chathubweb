import { useEffect, useState } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'

const MY_ID = 'b642cbfc-e314-425a-a80c-0916e0bcaa69'

async function fetchMessages(DISCUSSIONS_ID) {
    const API = `http://localhost:8000/api/messages/?user_id=${MY_ID}&discussion_id=${DISCUSSIONS_ID}`

    const response = await window.fetch(API)
    const data = await response.json()
    return data
}

export function ChatMessages({ selectedDiscussion }) {
    const [messages, setMessages] = useState([])

    async function loadMessages() {
        const data = await fetchMessages(selectedDiscussion)
        setMessages(data)
    }

    useEffect(() => {
        loadMessages()
    }, [selectedDiscussion])


    return (
        <div className="mx-auto max-w-screen-lg">
            <div className="mb-4 flex flex-col overflow-auto border-2 p-8">
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

            <ChatInput />
        </div>
    )
}
