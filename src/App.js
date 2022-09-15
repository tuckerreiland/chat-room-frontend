import { useEffect, useState } from "react";
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

function App() {
	const [message, setMessage] = useState('');
	const [received, setReceived] = useState('');

	const sendMessage = () => {
		console.log(message)
		socket.emit('send-message', {message})
	}

	useEffect(() => {
		socket.on('receive-message', (data) => {
			setReceived(data.message)
		})
	}, [socket])

	return (
		<div className="App">
			<div>
				Message:{received}
			</div>
      		<input placeholder="message..." onChange={(e) => setMessage(e.target.value)}/>
      		<button onClick={sendMessage}>Send</button>
    	</div>
  	);
}

export default App;
