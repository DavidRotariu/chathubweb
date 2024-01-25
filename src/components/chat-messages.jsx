import { useEffect, useState } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'

const MY_ID = '0d763ac3-b792-4ec5-beb5-f6c77f59890c'

async function fetchMessages(DISCUSSIONS_ID) {
    const API = `http://localhost:8000/api/messages/?user_id=${MY_ID}&discussion_id=${DISCUSSIONS_ID}`

    const response = await window.fetch(API)
    const data = await response.json()
    return data
}

export function ChatMessages({ selectedDiscussion }) {
    const [messages, setMessages] = useState([])
    const [selectedSomething, selectSomething] = useState(false)

    async function loadMessages() {
        const data = await fetchMessages(selectedDiscussion)
        if (data.detail == 'Discussion not found.')
            selectSomething(false)
        else {
            setMessages(data)
            selectSomething(true)
        }
    }

    useEffect(() => {
        loadMessages()
    }, [selectedDiscussion])


    return (
        <div>
            {
                selectedSomething ?
                    (
                        <div className="mx-auto max-w-screen-lg" >

                            <div className="mb-4 flex flex-col overflow-auto border-2 p-8 h-[70vh]">
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
                            <ChatInput selectedDiscussion={selectedDiscussion} loadMessages={loadMessages}/>

                        </div>) : (
                        <div className="mx-auto h-[80vh] grid place-items-center">
                            <p>Please select a chat</p>
                        </div>

                    )
            }
        </div>


    )
}
