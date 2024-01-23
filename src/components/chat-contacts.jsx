import { useEffect, useState } from 'react'
import { Button, Table } from '@mantine/core'

const MY_ID = '0d763ac3-b792-4ec5-beb5-f6c77f59890c'

const BASE_URL = 'http://localhost:8000/api'
const CONTACTS_ENDPOINT = `${BASE_URL}/contacts`
const DISCUSSIONS_ENDPOINT = `${BASE_URL}/discussions`

async function fetchContacts() {
    const response = await window.fetch(CONTACTS_ENDPOINT)
    const data = await response.json()

    return data
}

async function postDiscussion(id_list) {
    const body = {
      contacts: [...id_list, MY_ID]
    }
  
    const response = await window.fetch(DISCUSSIONS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
  
    return data
  }

export function ChatContacts() {
    const [contacts, setContacts] = useState([])
    const [selectedContacts, selectContacts] = useState([])
    const [selectedContactNames, selectContactNames] = useState([])

    async function loadContacts() {
        const data = await fetchContacts()
        setContacts(data.filter(contact => contact.id != MY_ID))
    }

    useEffect(() => {
        loadContacts()
    }, [])

    function updateSelectedContacts(id, name) {
        const idPosition = selectedContacts.indexOf(id); 
        let newSelectedContacts = []
        let newSelectedContactNames = []
        if (idPosition === -1) {
            newSelectedContacts = [...selectedContacts, id];
            newSelectedContactNames = [...selectedContactNames, name]
        }
        else {
            newSelectedContacts = selectedContacts.slice(0, idPosition).concat(selectedContacts.slice(idPosition + 1));
            newSelectedContactNames = selectedContactNames.slice(0, idPosition).concat(selectedContactNames.slice(idPosition + 1));
        }
        selectContacts(newSelectedContacts)
        selectContactNames(newSelectedContactNames)
    }

    return (
        <div>
            <Button variant="outline" color="blue" size="md" onClick={() => postDiscussion(selectedContacts)}>
                New chat with: {selectedContactNames.join(', ')}
            </Button>
            <Table verticalSpacing="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={200}>Name</Table.Th>
                        <Table.Th>Actions</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        contacts.map((contact) => (
                        <Table.Tr key={contact.id}>
                            <Table.Td> {contact.name}</Table.Td>
                            <Table.Td>
                                <Button onClick={() => updateSelectedContacts(contact.id, contact.name)}
                                variant={selectedContacts.indexOf(contact.id) === -1 ? "outline" : "default"}
                                color="blue">
                                    Select
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>


        </div>
    )
}
