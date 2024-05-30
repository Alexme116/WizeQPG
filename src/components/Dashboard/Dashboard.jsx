/* eslint-disable react-hooks/exhaustive-deps */
import PreviousChats from './PreviousChats'
import ChatInterface from './ChatInterface'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState([
        {
            id: 0,
            name: '',
            email: '',
            password: ''
        }
    ])
    const [chats, setChats] = useState([])
    const [chatSelected, setChatSelected] = useState(0)
    const [messages, setMessages] = useState([])
    const [isCharging, setIsCharging] = useState(false)

    const id = localStorage.getItem('id')
    const navigate = useNavigate()

    const init = async () => {
        const user = await getUser()
        const chats = await getChats()
        setUser(user)
        setChats(chats)
    }

    const getUser = async () => {
        const response = await fetch(`http://localhost:3000/users/${id}`)
        const data = await response.json()
        return data
    }

    const getChats = async () => {
        const response = await fetch(`http://localhost:3000/chats/${id}`)
        const data = await response.json()
        return data
    }

    useEffect (() => {
        if (!localStorage.getItem('id')) {
            navigate('/')
        }
        init()
    }, [refresh])

    return (
        <>
        {/* Main Container */}
        <div className='flex h-svh w-svw items-center bg-gradient-radial from-[#112a2d] via-[#112a2d] to-[#111A2D]'>
            {/* Previous Chats */}
            <PreviousChats refresh={refresh} setRefresh={setRefresh} user={user} chats={chats} setChatSelected={setChatSelected} setMessages={setMessages}/>

            {/* Chat Interface */}
            <ChatInterface refresh={refresh} setRefresh={setRefresh} chats={chats} chatSelected={chatSelected} messages={messages} setMessages={setMessages} setIsCharging={setIsCharging} />

            {/* Charging Spinner */}
            {isCharging ?
                <div className='absolute bg-black h-16 w-16 top-1/2 left-1/2 translate-x-20 -translate-y-1/2'>

                </div>
                :
                null
            }
        </div>
        </>
    )
}

export default Dashboard