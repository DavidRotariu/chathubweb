import { useEffect, useState } from 'react'
import { Button, Table } from '@mantine/core'
import { CONTACTS_ENDPOINT, DISCUSSIONS_ENDPOINT } from './urls'

async function fetchContacts() {
    const response = await window.fetch(CONTACTS_ENDPOINT)
    const data = await response.json()

    return data
}

async function postDiscussion(id_list, MY_ID, selectDiscussion) {
    const body = {
      contacts: [...id_list, MY_ID]
    }
  
    const response = await window.fetch(DISCUSSIONS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()

    if(data.id) {
        selectDiscussion(data.id);
    }
  
    return data
  }

export function ChatContacts({selectDiscussion, hideContacts, MY_ID}) {
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

    function createDiscussion() {
        hideContacts(true);
        postDiscussion(selectedContacts, MY_ID, selectDiscussion);
    }

    return (
        <div>
            <Button variant="outline" color="blue" size="md" onClick={createDiscussion}>
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
