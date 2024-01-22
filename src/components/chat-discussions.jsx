import { useEffect, useState } from 'react'
import { Card, Text } from '@mantine/core';

const API = 'http://localhost:8000/api'
const MY_ID = '0d763ac3-b792-4ec5-beb5-f6c77f59890c'
const DISCUSSIONS_ENDPOINT = '/discussions/?user_id='


async function fetchDiscussions() {
    const response = await window.fetch(`${API}${DISCUSSIONS_ENDPOINT}${MY_ID}`)
    const data = await response.json()

    return data
}


export function ChatDiscussions() {
    const [discussions, setDiscussions] = useState([])

    async function loadDiscussions() {
        const data = await fetchDiscussions()
        setDiscussions(data)
    }

    console.log(discussions)

    useEffect(() => {
        loadDiscussions()
    }, [])

    return (
        <div>
            {discussions.map((discussion) => 
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                        <Text fw={500}>{discussion.name}</Text>
                    </Card.Section>
                </Card>
            )}
        </div>
    )

}