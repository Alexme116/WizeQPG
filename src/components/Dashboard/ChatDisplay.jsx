/* eslint-disable react/prop-types */
import { useState } from 'react'
import UserFlow from "./UserFlow"
import getApiAIResponse from '../ApiAI/ApiAI'

let ChatDisplay = ({ messages, chatSelected, flowQuestion, setFlowQuestion }) => {
    const [flowStep, setFlowStep] = useState(0)

    const handleFlowSelection = async (e) => {
        const option = e.target.textContent
        setFlowQuestion([...flowQuestion, option])
        await changeOptions(option)
        setFlowStep(flowStep + 1)
    }

    const handleElseEnter = async (e) => {
        if (e.key === 'Enter') {
            const option = e.target.value
            e.target.value = ''
            setFlowQuestion([...flowQuestion, option])
            await changeOptions(option)
            setFlowStep(flowStep + 1)
        }
    }

    const changeOptions = async (question) => {
        const step = flowStep + 1
        const flow = UserFlow.find(userFlow => userFlow.step === step)
        const qresp = await prepareQuestion(question, step)
        const newOptions = [
            {
                "option": qresp[0],
            },
            {
                "option": qresp[1],
            },
            {
                "option": qresp[2],
            },
            {
                "option": qresp[3],
            },
            {
                "option": qresp[4],
            },
            {
                "option": qresp[5],
            }
        ]
        flow.options = newOptions
    }

    const prepareQuestion = async (question, step) => {
        if (step === 1) {
            const newQuestion = `Dime 6 subtemas más importantes de ${question} separadas por comas sin espacios unicamente entre respuestas`
            const response = await getApiAIResponse(newQuestion)
            const options = response.split(',').map(option => option.replace(' \n', ''))
            return options
        }
    }

    return (
        <>
            <div className="w-full h-full p-5 overflow-auto flex flex-col gap-5">
                    {chatSelected == 0 ?

                        // Default Chat Display
                        <div className='flex justify-center items-center h-full'>
                            <div className='flex flex-col items-center'>
                                <img src="https://blogger.googleusercontent.com/img/a/AVvXsEhW3Qhlyehpsjbk9ZiFBoylpJNUNPTeyWBtNBqMiMEfpBAXGZVr62CNfsZkmFJijgQ1JF3IxX4nhaaJYK0ssyleT_AMR4BhNXSS-C64N50Iz-hnBOaesBCsyqX9ZfQ6asj6ElqYRF2_0a6HEp0l3VEgEa6Uqa8lnXyc3RWO3W7K2K8wMk7kWP3rWfi2cKs"
                                    alt="Logo"
                                    width={"200rem"}
                                    className='invert grayscale opacity-75'
                                />
                                <h1 className="text-3xl font-bold text-center text-[#9c9c9c]">¡Bienvenido a WizeQ!</h1>
                                <p className="text-center text-[#9c9c9c]">Crea un nuevo chat para comenzar</p>
                            </div>
                        </div>

                        : messages.length > 0 ?

                        // Chat Display
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

                        // User Flow Display
                        <div className="flex justify-start">
                            <div className="w-full h-fit rounded bg-neutral-400 overflow-hidden">
                                <h1 className="font-bold p-2 text-center">{UserFlow[flowStep].description}</h1>

                                {/* Slection Section */}
                                <div className='grid grid-cols-3 gap-1 m-1'>
                                    {UserFlow[flowStep].options.map((option, index) => {
                                        return (
                                            <button key={index} className="w-full p-2 text-center bg-neutral-300 rounded" onClick={handleFlowSelection}>
                                                {option.option}
                                            </button>
                                        )
                                    })}
                                </div>

                                {/* Input */}
                                <input
                                    type="text"
                                    onKeyDown={handleElseEnter}
                                    className="w-full p-2 text-center bg-neutral-300 rounded rounded-t-none border-4 border-t-0 border-neutral-400 placeholder:text-neutral-600"
                                    placeholder="Otro..."
                                />
                            </div>
                        </div>
                    }
            </div>
        </>
    )
}

export default ChatDisplay