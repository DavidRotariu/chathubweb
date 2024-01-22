import { useState } from 'react'
import { Button } from '@mantine/core'

const API =
  'https://chat-app-dualusv.azurewebsites.net/api/discussions/921772a4-b673-479f-8586-b2bffd3348b3/messages'

async function postMessage(message) {
  const body = {
    discussion_id: '921772a4-b673-479f-8586-b2bffd3348b3',
    user_id: '19b22709-8dcc-4a7c-ba65-e6eeecfa5162',
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

export function ChatInput() {
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
        onClick={() => postMessage(value)}>
        Send message
      </Button>
    </div>
  )
}
