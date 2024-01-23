import { useEffect, useState } from 'react'
import { Button, Table } from '@mantine/core'

const API = 'http://localhost:8000/api'

const CONTACTS_ENDPOINT = '/contacts'

async function fetchContacts() {
    const response = await window.fetch(`${API}${CONTACTS_ENDPOINT}`)
    const data = await response.json()

    return data
}

export function ChatContacts() {
    const [contacts, setContacts] = useState([])
    const [selectedContacts, selectContacts] = useState([])
    const [selectedContactNames, selectContactNames] = useState([])

    async function loadContacts() {
        const data = await fetchContacts()
        setContacts(data)
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
            <h2>Contacts</h2>

            <Table verticalSpacing="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={200}>Name</Table.Th>
                        <Table.Th>Actions</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {contacts.map((contact) => (
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

            <Button variant="outline" color="blue" size="md" className="my-1">
                New chat with: {selectedContactNames.join(', ')}
            </Button>
        </div>
    )
}
