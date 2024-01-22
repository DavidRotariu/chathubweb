import { Button, Group } from '@mantine/core'

export function ChatControls({ showContacts }) {
  return (
    <Group>
      <Button
        variant="outline"
        onClick={() => {
          showContacts(true)
        }}>
        New Chat
      </Button>
    </Group>
  )
}
