/* eslint-disable react/prop-types */
import sendIcon from '../../assets/send-icon.svg'
import hamburgerIcon from '../../assets/hamburger-icon.svg'
import { useState } from 'react'
import ChatDisplay from './ChatDisplay'
import getApiAIResponse from '../ApiAI/ApiAI'

const ChatInterface = ({ refresh, setRefresh, chats, chatSelected, messages, setMessages, setIsCharging }) => {
    const [input, setInput] = useState('')
    const [flowQuestion, setFlowQuestion] = useState([])
    const [flowStep, setFlowStep] = useState(0)
    const [isSecondInputVisible, setIsSecondInputVisible] = useState(false) // state to show or hide the second input
    const [buttonText, setbuttonText] = useState('Modelo RAG') // state to store the text of the button [Modelo RAG, Gemini]
    const [secondInput, setSecondInput] = useState('') // state to store the value of the second input
    const id = localStorage.getItem('id')


    const toggleSecondInput = () => {
        setIsSecondInputVisible(!isSecondInputVisible);

        if (buttonText === 'Modelo RAG') {
            setbuttonText('WizeQ');
        } else {
            setbuttonText('Modelo RAG');
        }
    }
    
    const handleSecondSubmit = async () => {
        if (secondInput === '' || chatSelected === 0) {
            return;
        }
        // Logic for handling the second input
        setSecondInput('');
        await sendMessageFromUser(secondInput);
        await sendMessageFromAI(secondInput);
    }


    const handleNewChat = async () => {
        if (chats.length > 0) {
            if (chats.find(chat => chat.title === "New Chat")) {
                return
            }
        }

        await fetch(`http://localhost:3000/chats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: "New Chat",
                user_id: id
            })
        })
        setRefresh(!refresh)
    }

    const handleChangeInput = (e) => {
        setInput(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        if (input === '' || chatSelected === 0) {
            return
        }
        changeTitle()
        setInput('')
        setFlowQuestion([])
        await sendMessageFromUser(input)
        await sendMessageFromAI(input)
    }

    const changeTitle = async () => {
        if (chatSelected === 0) {
            return
        } else if (chats.find(chat => chat.id === chatSelected).title === "New Chat") {
            await fetch(`http://localhost:3000/chats/${chatSelected}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: input
                })
            })
            setRefresh(!refresh)
        }
    }

    const sendMessageFromUser = async (message) => {
        sendMessage(message, 'User')
        setIsCharging(true)
    }

    const sendMessageFromAI = async (message) => {
        let newMessage = `Sin ningun tipo de formato solamente texto, responde a la siguiente pregunta: ${message}`
        if (messages.length > 1) {
            // obtener todos los mensajes y juntarlos en un solo string
            let lastMessage = ''
            messages.forEach(message => {
                if (message.is_from === 'AI') {
                    lastMessage += message.message + '| '
                }
            })
            newMessage = `Utiliza el siguiente string como informacion de tus ultimas respuestas las cuales estan separadas por el simbolo "|": "${lastMessage}". Ahora in ningun tipo de formato solamente texto, responde a la siguiente pregunta: ${message}`
        }
        const response = await getApiAIResponse(newMessage)
        setIsCharging(false)
        sendMessage(response, 'AI')
    }

    const sendMessage = async (message, is_from) => {
        await fetch(`http://localhost:3000/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_from: is_from,
                message: message,
                chat_id: chatSelected
            })
        })
        const messages = await getMessages(chatSelected)
        setMessages(messages)
        setRefresh(!refresh)
    }

    const getMessages = async (id) => {
        const response = await fetch(`http://localhost:3000/messages/${id}`)
        const data = await response.json()
        return data
    }

    const prueba = async () => {
        console.log(chats)
    }

    return (
        <div className="flex flex-col items-center w-[83%] h-[95%] rounded-3xl bg-white p-5 text-black">
            {/* Chat Options */}
            <div className=" flex items-center justify-between h-[10%] w-full">
                {/* Options Button */}
                <button onClick={prueba} className='flex items-center justify-center h-14 w-14 rounded-full border-2'>
                    <img src={hamburgerIcon} alt="Hamburger Icon" width={"48%"}/>
                </button>

                {/* Chat Title */}
                <h1 className="text-3xl font-bold w-[80%] h-10 text-center overflow-hidden">
                    {chatSelected === 0 || chats.length === 0  ? 'Welcome' : chats.find(chat => chat.id === chatSelected) ? chats.find(chat => chat.id === chatSelected).title : 'Welcome'}
                </h1>

                {/* New Chat */}
                <button onClick={handleNewChat} className='h-12 w-28 rounded-full border-2'>
                    New Chat
                </button>
            </div>

            {/* Chat Display */}
            <div className="h-[80%] w-full bg-[#F9FAFC] rounded-xl border-[1px]">
                <ChatDisplay messages={messages} chatSelected={chatSelected} flowQuestion={flowQuestion} setFlowQuestion={setFlowQuestion} flowStep={flowStep} setFlowStep={setFlowStep}
                    sendMessageFromUser={sendMessageFromUser} sendMessageFromAI={sendMessageFromAI} refresh={refresh} setRefresh={setRefresh} setIsCharging={setIsCharging}
                />
            </div>


            {/* Input Chat Container */}
            <div className={chatSelected === 0 ? "hidden" : "h-[10%] w-full flex justify-between items-center"}>
                {/* Toggle Second Input Button */}
                <div className={chatSelected === 0 ? "hidden" : "h-[5%] flex justify-center items-center"}>
                    <button onClick={toggleSecondInput} className="rounded-full h-16 w-16 flex justify-center items-center border-2 p-4">
                        {buttonText}
                    </button>
                </div>
                {/* Input Chat */}
                {!isSecondInputVisible && (
                    <div className={chatSelected === 0 ? "hidden": "h-[5%] w-full flex justify-between items-center"}>
                        <input onChange={handleChangeInput} onKeyDown={handleEnter} value={input} type="text" className="border-2 h-14 w-[95%] rounded-3xl px-5 outline-none" placeholder="Escribe si ya sabes que preguntar..."/>
                        {/*Send Button */}
                        <button onClick={handleSubmit} className="rounded-full h-14 w-14 flex justify-center items-center border-2">
                            <img src={sendIcon} alt="Send Icon" width={"50%"} className='ml-1'/>
                        </button>
                    </div>
                )}
                {/* Second Input Chat Container */}
                {isSecondInputVisible && (
                    <div className={chatSelected === 0 ? "hidden" : "h-[10%] w-full flex justify-between items-center mt-2"}>
                        {/* Second Input Chat */}
                        <input onChange={(e) => setSecondInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleSecondSubmit(); } }} value={secondInput} type="text" className="border-2 h-14 w-[95%] rounded-3xl px-5 outline-none" placeholder="Consulta nuestra modelo de Rag.." />
                        {/* Second Send Button */}
                        <button onClick={handleSecondSubmit} className="rounded-full h-14 w-14 flex justify-center items-center border-2">
                            <img src={sendIcon} alt="Send Icon" width={"50%"} className='ml-1' />
                        </button>
                    </div>
            )}
            </div>
        </div>
    )
}

export default ChatInterface