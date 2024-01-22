import { useEffect, useState } from 'react'
import { Badge, Button, Table } from '@mantine/core'

const API = 'http://localhost:8000/api'

const CONTACTS_ENDPOINT = '/contacts'

async function fetchContacts() {
  const response = await window.fetch(`${API}${CONTACTS_ENDPOINT}`)
  const data = await response.json()

  return data
}

export function ChatContacts() {
  const [contacts, setContacts] = useState([])

  async function loadContacts() {
    const data = await fetchContacts()
    setContacts(data)
  }

  useEffect(() => {
    loadContacts()
  }, [])

  return (
    <div>
      <h2>Contacts</h2>

      <Table verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={300}>name</Table.Th>
            <Table.Th>id</Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {contacts.map((contact) => (
            <Table.Tr key={contact.id}>
              <Table.Td> {contact.name}</Table.Td>
              <Table.Td>
                <Badge color="blue" variant="light">
                  {contact.id}
                </Badge>
              </Table.Td>

              <Table.Td>
                <Button variant="outline" color="blue" /*onClick={() => setDiscussion(contact.id)}*/>
                  Select
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Button variant="outline" color="blue">
        Start conversation
      </Button>
    </div>
  )
}
