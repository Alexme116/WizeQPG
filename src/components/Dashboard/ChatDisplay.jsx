/* eslint-disable react/prop-types */
import { useState } from 'react'
import UserFlow from "./UserFlow"

let ChatDisplay = ({ messages, chatSelected }) => {
    const [flowStep, setFlowStep] = useState(0)
    return (
        <>
            <div className="w-full h-full p-5 overflow-auto flex flex-col gap-5">
                    {
                        chatSelected == 0 ?

                        <div className='flex justify-center items-center h-full'>
                            <div className='border-2 border-red-500'>
                                <img src="https://blogger.googleusercontent.com/img/a/AVvXsEhW3Qhlyehpsjbk9ZiFBoylpJNUNPTeyWBtNBqMiMEfpBAXGZVr62CNfsZkmFJijgQ1JF3IxX4nhaaJYK0ssyleT_AMR4BhNXSS-C64N50Iz-hnBOaesBCsyqX9ZfQ6asj6ElqYRF2_0a6HEp0l3VEgEa6Uqa8lnXyc3RWO3W7K2K8wMk7kWP3rWfi2cKs"
                                    alt="Logo"
                                    width={"200rem"}
                                    className='bg-blend-color-dodge'
                                />
                            </div>
                        </div>

                        :

                        messages.length > 0 ?

                        messages.map((message, index) => {
                            return (
                                <div key={index} className={message.is_from == 'User' ? 'flex justify-end' : 'flex justify-start'}>
                                    <div className="w-[49%] h-fit rounded bg-neutral-400 overflow-hidden">
                                        <h1 className="font-bold p-2">{message.is_from == 'User' ? 'You:' : 'Chatbot:'}</h1>
                                        <hr className="border-black" />

                                        {/* Response Section */}
                                        <p className="px-2 py-4 bg-neutral-300 flex justify-center">{message.message}</p>
                                    </div>
                                </div>
                            )
                        })

                        :

                        
                        <div className="flex justify-start">
                            <div className="w-full h-fit rounded bg-neutral-400 overflow-hidden">
                                <h1 className="font-bold p-2 text-center">{UserFlow[flowStep].description}</h1>
                                <hr className="border-black" />

                                {/* Slection Section */}
                                <div className='border-2 border-red-500'>

                                </div>
                            </div>
                        </div>
                    }
            </div>
        </>
    )
}

export default ChatDisplay