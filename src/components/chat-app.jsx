import { MantineProvider, AppShell, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState, useEffect } from 'react'

import { ChatControls } from './chat-controls'
import { ChatContacts } from './chat-contacts'
import { ChatDiscussions } from './chat-discussions'

import { theme } from '../theme'
import '@mantine/core/styles.css'
import { ChatMessages } from './chat-messages'

import { DISCUSSIONS_ENDPOINT, MY_ID } from './urls'


async function fetchDiscussions() {
    const response = await window.fetch(`${DISCUSSIONS_ENDPOINT}/?user_id=${MY_ID}`)
    const data = await response.json()

    return data
}

export function ChatApp() {
    const [contactsAreVisible, { open: showContacts, close: hideContacts }] = useDisclosure(false)
    const [selectedDiscussion, selectDiscussion] = useState('')
    const [discussions, setDiscussions] = useState([])

    async function loadDiscussions() {
        const data = await fetchDiscussions()
        setDiscussions(data)
    }

    useEffect(() => {
        loadDiscussions()
    }, [])

    return (
        <MantineProvider theme={theme}>
            <AppShell header={{ height: 70 }} navbar={{ width: 300 }} padding="lg">
                <AppShell.Header className="flex items-center">
                    <ChatControls showContacts={showContacts} />
                </AppShell.Header>

                <AppShell.Navbar className="p-4">
                    <ChatDiscussions selectDiscussion={selectDiscussion} selectedDiscussion={selectedDiscussion} discussions={discussions} />
                </AppShell.Navbar>

                <AppShell.Main>
                    <Modal size={350} opened={contactsAreVisible} onClose={hideContacts}>
                        <ChatContacts selectDiscussion={selectDiscussion}/>
                    </Modal>

                    <ChatMessages selectedDiscussion={selectedDiscussion} loadDiscussions={loadDiscussions}/>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    )
}
