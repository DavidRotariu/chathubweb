import { useEffect, useState } from 'react'
import { Avatar, Card, Title, Text } from '@mantine/core';

const API = 'http://localhost:8000/api'
const MY_ID = 'b642cbfc-e314-425a-a80c-0916e0bcaa69'
const DISCUSSIONS_ENDPOINT = '/discussions/?user_id='


async function fetchDiscussions() {
    const response = await window.fetch(`${API}${DISCUSSIONS_ENDPOINT}${MY_ID}`)
    const data = await response.json()

    return data
}


export function ChatDiscussions({ selectDiscussion, selectedDiscussion }) {
    const [discussions, setDiscussions] = useState([])

    async function loadDiscussions() {
        const data = await fetchDiscussions()
        setDiscussions(data)
    }

    useEffect(() => {
        loadDiscussions()
    }, [])


    return (
        <div>
            {discussions.map((discussion) =>
                <Card
                    onClick={() => selectDiscussion(discussion.id)}
                    shadow="md"
                    padding="sm"
                    radius="md"
                    style={{
                        backgroundColor: discussion.id === selectedDiscussion ? '#EFEFEF' : '#F8F8F8',
                        marginBottom: '10px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {discussion.contacts.length > 2 ? (
                            <Avatar size={40} radius="xl" style={{ fontSize: 20, marginRight: '10px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users-group" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
                            </Avatar>
                        ) : (
                            <Avatar size={40} radius="xl" style={{ fontSize: 20, marginRight: '10px' }}>
                                {discussion.name && discussion.name.toUpperCase()[0]}
                            </Avatar>
                        )}
                        <div>
                            <Title order={3} style={{ marginBottom: '5px', color: '#333333' }}>
                                {discussion.name}
                            </Title>
                            <Text style={{ color: '#666666' }}>Sample recent message</Text>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )

}