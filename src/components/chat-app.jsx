import { MantineProvider, AppShell, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import { ChatControls } from './chat-controls'
import { ChatContacts } from './chat-contacts'
import { ChatDiscussions } from './chat-discussions'

import { theme } from '../theme'
import '@mantine/core/styles.css'
import { ChatMessages } from './chat-messages'

export function ChatApp() {
    const [contactsAreVisible, { open: showContacts, close: hideContacts }] = useDisclosure(false)
    const [selectedDiscussion, selectDiscussion] = useState('')

    return (
        <MantineProvider theme={theme}>
            <AppShell header={{ height: 70 }} navbar={{ width: 300 }} padding="lg">
                <AppShell.Header className="flex items-center">
                    <ChatControls showContacts={showContacts} />
                </AppShell.Header>

                <AppShell.Navbar className="p-4">
                    <ChatDiscussions selectDiscussion={selectDiscussion} selectedDiscussion={selectedDiscussion} />
                </AppShell.Navbar>

                <AppShell.Main>
                    <Modal size={350} opened={contactsAreVisible} onClose={hideContacts}>
                        <ChatContacts/>
                    </Modal>

                    <ChatMessages selectedDiscussion={selectedDiscussion} />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    )
}
