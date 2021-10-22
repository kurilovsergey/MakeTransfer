import { Avatar, Button } from "antd"
import TextArea from "rc-textarea"
import { useEffect, useState } from "react"

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
    <Chat/>
    </div>

}

export default ChatPage


const Chat: React.FC = () => {

    return <div>
    <Messages/>
    <AddMessageForm/>
    </div>

}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(()=>{
        
        ws.addEventListener('message', e => {
        let newMessage = JSON.parse(e.data)
        setMessages((prevMessage)=>[...prevMessage, ...newMessage])})
    },[])

    

    return <div style={{height: '500px', overflowY: 'auto'}}>
    {messages.map((m, index) => <Message key={index} message={m}/>)}

    </div>

}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    

    return <div>
    <img src={message.photo}/> <b>{message.userName}</b>
    <br/>
    {message.message}
    <hr/>
    </div>

}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) {
            return
        }
    ws.send(message)
    setMessage('');
    }
    return <div>
    <TextArea onChange={e=>setMessage(e.currentTarget.value)}></TextArea>
    <Button onClick={sendMessage}>Send</Button>
    </div>

}