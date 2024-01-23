import { Avatar } from '@mantine/core'

export function ChatMessage({ value, userName, isMe }) {
    return (
        <div>
            {isMe ? (
                <div class="flex items-end mb-4">
                    <div class="flex items-end justify-end">
                        <div class="bg-blue-500 font-sans text-white px-3 py-1 rounded-xl max-w-xs">
                            {value}
                        </div>
                    </div>
                </div>
            ) : (
                <div class="flex items-end mb-4">
                    <div class="flex items-end">
                        <Avatar size="md" radius="xl" style={{ fontSize: 20, marginRight: '10px' }}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                        <div class="bg-green-500 font-sans text-white px-3 py-1 rounded-xl max-w-xs">
                            {value}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}