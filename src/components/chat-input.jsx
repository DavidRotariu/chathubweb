import { useState } from 'react'
import { Button } from '@mantine/core'

const MY_ID = '0d763ac3-b792-4ec5-beb5-f6c77f59890c'
const API = 'http://localhost:8000/api/messages'

async function postMessage(selectedDiscussion, message) {
  const body = {
    discussion_id: selectedDiscussion,
    user_id: MY_ID,
    value: message,
  }

  const response = await window.fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  return data
}

export function ChatInput( {selectedDiscussion} ) {
  const [value, setValue] = useState('')

  return (
    <div className="flex items-center gap-5">
      <textarea
        className="h-15 w-full border-2"
        onChange={(event) => setValue(event.target.value)}
      />

      <Button
        variant="outline"
        color="blue"
        className="block h-full w-40 p-4"
        onClick={() => postMessage(selectedDiscussion, value)}>
        Send message 
      </Button>
    </div>
  )
}
