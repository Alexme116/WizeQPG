/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import LogoutIcon from "../../assets/logout-icon.svg"
import ChatIcon from "../../assets/chat-icon.svg"
import TrashIcon from "../../assets/trash-icon.svg"

const PreviousChats = ({ refresh, setRefresh, user, chats, setChatSelected, setMessages }) => {
    const handleProfileOptions = () => {
        const profileOptions = document.getElementById('profile_Options')
        const profileNameContainer = document.getElementById('profile_Name_Container')
        if (profileOptions.hidden) {
            profileOptions.hidden = false
            profileNameContainer.style.backgroundColor = '#111A2D'
        } else {
            profileOptions.hidden = true
            profileNameContainer.style.backgroundColor = 'transparent'
        }
    }

    const handleProfileContainerBackgroundOver = () => {
        const profileNameContainer = document.getElementById('profile_Name_Container')
        profileNameContainer.style.backgroundColor = '#00000033'
    }

    const handleProfileContainerBackgroundOut = () => {
        const profileOptions = document.getElementById('profile_Options')
        if (profileOptions.hidden) {
            const profileNameContainer = document.getElementById('profile_Name_Container')
            profileNameContainer.style.backgroundColor = 'transparent'
        } else {
            const profileNameContainer = document.getElementById('profile_Name_Container')
            profileNameContainer.style.backgroundColor = '#111A2D'
        }
    }

    const navigate = useNavigate()

    const handleLogOut = () => {
        navigate('/')
    }

    const handleChatSelected = async (id) => {
        const messages = await getMessages(id)
        setChatSelected(id)
        setMessages(messages)
        setRefresh(!refresh)
    }

    const handleDeleteChat = (id) => {
        deleteMessages(id)
        deleteChat(id)
        setRefresh(!refresh)
    }

    const deleteMessages = async (id) => {
        await fetch(`http://localhost:3000/messages/${id}`, {
            method: 'DELETE'
        })
    }

    const deleteChat = async (id) => {
        await fetch(`http://localhost:3000/chats/${id}`, {
            method: 'DELETE'
        })
    }

    const getMessages = async (id) => {
        const response = await fetch(`http://localhost:3000/messages/${id}`)
        const data = await response.json()
        return data
    }

    return (
        <div className="w-[15%] mx-2 h-[98%] text-[#DFEFF0]">
            {/* Logo & Name */}
            <div className='h-[10%] flex justify-center items-center'>
                <div className="w-[22%]">
                    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEhW3Qhlyehpsjbk9ZiFBoylpJNUNPTeyWBtNBqMiMEfpBAXGZVr62CNfsZkmFJijgQ1JF3IxX4nhaaJYK0ssyleT_AMR4BhNXSS-C64N50Iz-hnBOaesBCsyqX9ZfQ6asj6ElqYRF2_0a6HEp0l3VEgEa6Uqa8lnXyc3RWO3W7K2K8wMk7kWP3rWfi2cKs"
                        alt="Logo"
                    />
                </div>
                
                <h1 className='text-4xl font-bold ml-2'>WIZEQ</h1>
            </div>

            {/* Title */}
            <div className="h-[5%] w-full flex justify-center items-center">
                <h1 className="font-bold">CHATS ANTERIORES</h1>
            </div>

            {/* Chats */}
            <div className="h-[75%] scroll-p overflow-y-auto">
                <div className="flex flex-wrap">
                    {chats.map((chat, index) => {
                        return (
                            <div key={index} onClick={() => {handleChatSelected(chat.id)}} className="h-8 rounded-full border-[1px] border-transparent flex items-center hover:bg-gradient-to-br hover:from-[#2b3d6665] hover:to-[#020a1b69] hover:border-[#27dfff54] hover:cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-between mx-4 w-[90%] h-8 relative overflow-hidden">
                                        <img src={ChatIcon} alt="Chat Icon" className="w-[13%]"/>
                                        <p className="ml-2 absolute top-[3px] right-0 w-[83%]">
                                            {chat.title}
                                        </p>
                                    </div>
                                    <div onClick={() => {handleDeleteChat(chat.id)}} className="flex items-center mr-3 w-[10%]">
                                        <img src={TrashIcon} alt="Trash Icon"/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Profile */}
            <div className="h-[10%] flex items-center relative">
                {/* Profile Container */}
                <button id="profile_Name_Container" onMouseOver={handleProfileContainerBackgroundOver} onMouseOut={handleProfileContainerBackgroundOut} onClick={handleProfileOptions} className="flex w-full h-4/6 rounded-xl hover:bg-[#00000033] items-center">
                    <div className="flex items-center">
                        <div className="h-8 w-8 ml-5 rounded-full bg-blue-950 flex justify-center items-center font-bold">
                            {user.name ? user.name.charAt(0).toUpperCase() : null}
                        </div>
                        <h1 className=" ml-2">{user.name}</h1>
                    </div>
                </button>

                {/* Profile Options */}
                <div className="flex flex-col absolute w-full bottom-[75%] bg-[#111A2D] rounded-t-xl">
                    {/* Profile Options Container */}
                    <div id="profile_Options" hidden className="m-2">
                        {/* Email */}
                        <div className="p-4">
                            <span>
                                {user.email}
                            </span>
                        </div>

                        <hr className=" border-[#4B808C] my-2" />

                        {/* LogOut */}
                        <div onClick={handleLogOut} className="p-4 rounded-xl hover:bg-[#00000033] hover:cursor-pointer flex items-center">
                            <img src={LogoutIcon} alt="LogOut" className="h-5"/>
                            <span className="ml-2">
                                Log out
                            </span>
                        </div>

                        <hr className=" border-[#4B808C] my-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviousChats