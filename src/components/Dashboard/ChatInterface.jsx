/* eslint-disable react/prop-types */
import sendIcon from '../../assets/send-icon.svg'
import hamburgerIcon from '../../assets/hamburger-icon.svg'

const ChatInterface = ({ setRefresh, user, chats, chatSelected }) => {

    const handleNewChat = async () => {
        if (chats.length > 0) {
            if (chats.find(chat => chat.title === "New Chat")) {
                return
            }
        }
        console.log("NEW USER")
        //const id = localStorage.getItem('id')
    }

    const prueba = () => {
        console.log(chats)
        console.log(chatSelected)
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
                <h1 className="text-3xl font-bold">
                    {chatSelected === 0 ? 'Bienvenido' : chats.find(chat => chat.id === chatSelected).title}
                </h1>

                {/* New Chat */}
                <button onClick={handleNewChat} className='h-12 w-28 rounded-full border-2'>
                    Nuevo Chat
                </button>
            </div>

            {/* Chat Interface */}
            <div className="h-[80%] w-full bg-[#F9FAFC] rounded-xl border-[1px]">
            </div>

                {/* Input Chat Container */}
            <div className="h-[10%] w-full flex justify-between items-center">
                {/* Input Chat */}
                <input type="text" className="border-2 h-14 w-[95%] rounded-3xl px-5 outline-none" placeholder="Escribe si ya sabes que preguntar..."/>

                {/* Send Button */}
                <button className="rounded-full h-14 w-14 flex justify-center items-center border-2">
                    <img src={sendIcon} alt="Send Icon" width={"50%"} className='ml-1'/>
                </button>
            </div>
        </div>
    )
}

export default ChatInterface