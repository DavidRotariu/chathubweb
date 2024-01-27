import { MantineProvider, AppShell, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState, useEffect } from 'react'

import { ChatControls } from './chat-controls'
import { ChatContacts } from './chat-contacts'
import { ChatDiscussions } from './chat-discussions'
import { ChatLogin } from './chat-login'

import { theme } from '../theme'
import '@mantine/core/styles.css'
import { ChatMessages } from './chat-messages'

import { DISCUSSIONS_ENDPOINT } from './urls'


async function fetchDiscussions(MY_ID) {
    const response = await window.fetch(`${DISCUSSIONS_ENDPOINT}/?user_id=${MY_ID}`)
    const data = await response.json()
    return data
}

export function ChatApp() {
    const [contactsAreVisible, { open: showContacts, close: hideContacts }] = useDisclosure(false)
    const [selectedDiscussion, selectDiscussion] = useState('')
    const [discussions, setDiscussions] = useState([])
    const [loginIsVisible, {open: showLogin, close: hideLogin}] = useDisclosure(false)
    const [MY_ID, setUser] = useState('');
    const [MY_NAME, setUserName] = useState('');

    async function loadDiscussions() {
        const data = await fetchDiscussions(MY_ID)
        setDiscussions(data)
    }

    useEffect(() => {
        loadDiscussions()
    }, [MY_ID])

    return (
        <MantineProvider theme={theme}>
            <AppShell header={{ height: 70 }} navbar={{ width: 300 }} padding="lg">
                <AppShell.Header className="flex items-center">
                    <ChatControls showContacts={showContacts} showLogin={showLogin} MY_NAME={MY_NAME}/>
                </AppShell.Header>

                <AppShell.Navbar className="p-4">
                    <ChatDiscussions selectDiscussion={selectDiscussion} selectedDiscussion={selectedDiscussion} discussions={discussions} />
                </AppShell.Navbar>

                <AppShell.Main>
                    <Modal size={350} opened={contactsAreVisible} onClose={hideContacts}>
                        <ChatContacts selectDiscussion={selectDiscussion} hideContacts={hideContacts} MY_ID={MY_ID} />
                    </Modal>
                    <Modal size={350} opened={loginIsVisible} onClose={hideLogin}>
                        <ChatLogin setUser={setUser} setUserName={setUserName} hideLogin={hideLogin}/>
                    </Modal>
                    <ChatMessages selectedDiscussion={selectedDiscussion} loadDiscussions={loadDiscussions} MY_ID={MY_ID}/>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    )
}
