import { Button, Group, Switch, Title } from '@mantine/core'

export function ChatControls({ showContacts, showLogin, MY_NAME }) {
    return (
        <Group className="flex items-center justify-between w-screen">
            <div className="flex items-center w-[30vh]">
                <div className="ml-[15px]">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                            showLogin(true)
                        }}>
                        Login
                        <div className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        </div>
                    </Button>
                </div>
                <div className="ml-[15px]">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                            showContacts(true)
                        }}>
                        New Chat
                        <div className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-brand-wechat"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M16.5 10c3.038 0 5.5 2.015 5.5 4.5c0 1.397 -.778 2.645 -2 3.47l0 2.03l-1.964 -1.178a6.649 6.649 0 0 1 -1.536 .178c-3.038 0 -5.5 -2.015 -5.5 -4.5s2.462 -4.5 5.5 -4.5z" />
                                <path d="M11.197 15.698c-.69 .196 -1.43 .302 -2.197 .302a8.008 8.008 0 0 1 -2.612 -.432l-2.388 1.432v-2.801c-1.237 -1.082 -2 -2.564 -2 -4.199c0 -3.314 3.134 -6 7 -6c3.782 0 6.863 2.57 7 5.785l0 .233" />
                                <path d="M10 8h.01" />
                                <path d="M7 8h.01" />
                                <path d="M15 14h.01" />
                                <path d="M18 14h.01" />
                            </svg>
                        </div>
                    </Button>
                </div>
            </div>

            <div>
                <Title order={2}>{MY_NAME ? `Hello, ${MY_NAME}` : 'Please log in...'}</Title>
            </div>

            <div className="flex items-center justify-end mr-[15px] w-[30vh]">
                <Switch
                    defaultChecked
                    size="md"
                    color="gray"
                />
            </div>
        </Group>
    )
}
