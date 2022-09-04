import { useChannelMessage } from '@onehop/react';
import { useState } from 'react';
 
export const channelId = 'channel_NTA3MzU3OTYwMjg3MzU1MDg';
 
export default function Messages() {
	const [chatMessages, setChatMessages] = useState([]);
 
	// in this example, USER_MESSAGE is an event that you'd send to the channel from your backend
	useChannelMessage(channelId, 'NEW_MESSAGE', (message) => {
		// this will be called every time the USER_MESSAGE event is sent to this channel
        setChatMessages(m => [...m, message]);
        console.log(message);
	});
 
	return (
		<ul>
			{chatMessages.map(m => (
				<li><b>{m.msg}</b></li>
			))}
		</ul>
	)
}