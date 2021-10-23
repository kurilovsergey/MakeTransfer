import { Avatar, Button } from "antd"
import TextArea from "rc-textarea"
import { useEffect, useState } from "react"

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
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)


   useEffect(() => {
       let ws: WebSocket;

       const closeHandler =  () => {
        setTimeout(createChannel, 3000); 
       }

       function createChannel() {
        if (ws!==null) {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
        }
        ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.addEventListener('close', closeHandler)
        setWsChannel(ws);
  }  
  createChannel()
  return () => {
    ws.removeEventListener('close', closeHandler)
    ws?.close();
  }
    },[]);



    return <div>
    <Messages wsChannel={wsChannel}/>
    <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    

    useEffect(()=>{
        let messageHandler = (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prevMessage)=>[...prevMessage, ...newMessage])
        }
        wsChannel?.addEventListener('message', messageHandler)
        return ()=>wsChannel?.removeEventListener('message', messageHandler)
    },[wsChannel])

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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'panding' | 'ready'>('panding')
    
    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => wsChannel?.removeEventListener('open', openHandler)
        
    },[wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
    wsChannel?.send(message)
    setMessage('');
    }
    return <div>
    <TextArea onChange={e=>setMessage(e.currentTarget.value)}></TextArea>
    <Button disabled={readyStatus!=='ready'} onClick={sendMessage}>Send</Button>
    </div>

}