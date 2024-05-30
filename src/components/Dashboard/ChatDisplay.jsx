/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import UserFlow from "./UserFlow"
import getApiAIResponse from '../ApiAI/ApiAI'

const ChatDisplay = ({ refresh, setRefresh, messages, chatSelected, flowQuestion, setFlowQuestion, flowStep, setFlowStep, sendMessageFromUser, sendMessageFromAI }) => {
    const messagesEndRef = useRef(null);

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
        if (step === 1) {
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
        } else if (step === 3) {
            const newOptions = [
                {
                    "option": `Sobre el tema de ${flowQuestion[0]} y con el subtema de ${flowQuestion[1]}, me gustaría obtener ${question} especificamente de:`,
                },
            ]
            flow.options = newOptions
        }
    }

    const prepareQuestion = async (question, step) => {
        if (step === 1) {
            const newQuestion = `Dime 6 subtemas más importantes de ${question} separadas por comas sin espacios unicamente entre respuestas`
            const response = await getApiAIResponse(newQuestion)
            const options = response.split(',').map(option => option.replace(' \n', ''))
            return options
        }
    }

    const handleFinalFlowEnter = async (e) => {
        if (e.key === 'Enter') {
            const option = e.target.value
            e.target.value = ''
            const question = `Sobre el tema de ${flowQuestion[0]} y con el subtema de ${flowQuestion[1]}, me gustaría obtener ${flowQuestion[2]} especificamente de ${option}.`
            const title = `${flowQuestion[0]}, ${flowQuestion[1]}, ${flowQuestion[2]}, ${option}`
            changeTitle(title)
            await sendMessageFromUser(question)
            await sendMessageFromAI(question)
            setFlowQuestion([])
            setFlowStep(0)
        }
    }

    const changeTitle = async (title) => {
        await fetch(`http://localhost:3000/chats/${chatSelected}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        })
        setRefresh(!refresh)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        console.log("MESSAGES END")
    }, [messages]);    

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
                        <div>
                            {messages.map((message, index) => {
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
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        :

                        // User Flow Display
                        <div className="flex justify-start">
                            <div className="w-full h-fit rounded bg-neutral-400 overflow-hidden">
                                <h1 className="font-bold p-2 text-center">{UserFlow[flowStep].description}</h1>

                                {/* Slection Section */}
                                <div className={flowStep == 3 ? 'm-1 mb-2' : 'grid grid-cols-3 gap-1 m-1'}>
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
                                    onKeyDown={flowStep == 3 ? handleFinalFlowEnter : handleElseEnter}
                                    className="w-full p-2 text-center bg-neutral-300 rounded rounded-t-none border-4 border-t-0 border-neutral-400 placeholder:text-neutral-600 outline-none"
                                    placeholder={flowStep == 3 ? "Termina la oracion..." : "Otro..."}
                                />
                            </div>
                        </div>
                    }
            </div>
        </>
    )
}

export default ChatDisplay