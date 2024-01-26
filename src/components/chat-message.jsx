import { Avatar } from '@mantine/core'

export function ChatMessage({ value, userName, isMe }) {
    return (
        <div>
            {isMe ? (
                <div className="flex items-end mb-4">
                    <div className="flex items-end justify-end">
                        <div className="bg-blue-500 font-sans text-white px-3 py-1 rounded-xl max-w-xs">
                            {value}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-end mb-4">
                    <div className="flex items-end">
                        <Avatar size="md" radius="xl" style={{ fontSize: 20, marginRight: '10px' }}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className="bg-green-500 font-sans text-white px-3 py-1 rounded-xl max-w-xs">
                            {value}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}