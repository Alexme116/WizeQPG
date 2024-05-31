/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const NewUser = () => {
    const [form, setForm] = useState({
        password: '',
        rePassword: ''
    })

    const id = localStorage.getItem('id')
    const navigate = useNavigate()

    const handleChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const getUserById = async () => {
        const response = await fetch(`http://localhost:3000/users/${id}`)
        const data = await response.json()
        return data
    }

    const handleSetPassword = async () => {
        const user = await getUserById()
        await changePassword(user)
        navigate('/dashboard')
    }

    const changePassword = async (user) => {
        const errorMessage = document.getElementById('login-error-message')

        if (form.password === '' || form.rePassword === '') {
            errorMessage.innerText = 'Password cannot be empty'
            document.getElementById('login-error').hidden = false
        } else {
            if (form.password !== form.rePassword) {
                errorMessage.innerText = 'Passwords do not match'
                document.getElementById('login-error').hidden = false
            } else {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: user.email,
                        password: form.password,
                        name: user.name
                    })
                })
                const data = await response.json()
                if (data.error) {
                    errorMessage.innerText = 'An error occurred, please try again later'
                    document.getElementById('login-error').hidden = false
                } else {
                    navigate('/dashboard')
                }
            }
        }
    }

    const handleCloseError = () => {
        document.getElementById('login-error').hidden = true
    }

    return (
        <>
        {/* Main Container */}
        <div className="h-svh text-white flex justify-center items-center">
            {/* Box Container */}
            <div className="flex flex-col p-5 rounded-xl sm:scale-125 w-80">
                {/* Logo Container */}
                <div className="flex justify-center">
                    {/* Logo */}
                    <div className="w-32">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEhW3Qhlyehpsjbk9ZiFBoylpJNUNPTeyWBtNBqMiMEfpBAXGZVr62CNfsZkmFJijgQ1JF3IxX4nhaaJYK0ssyleT_AMR4BhNXSS-C64N50Iz-hnBOaesBCsyqX9ZfQ6asj6ElqYRF2_0a6HEp0l3VEgEa6Uqa8lnXyc3RWO3W7K2K8wMk7kWP3rWfi2cKs" alt="Logo" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold mt-4 text-black">Set your password</h1>
                </div>

                {/* Form Container */}
                <div className="flex flex-col mt-6 text-black">
                    {/* Email */}
                    <div className="border-[1px] flex justify-center rounded-md bg-white">
                        <input onChange={handleChangeForm} type="password" name="password" placeholder="password..."
                        className="w-[90%] outline-none bg-transparent text-xs h-7 text-black placeholder:text-xs" />
                    </div>

                    {/* Password */}
                    <div className="border-[1px] flex justify-center rounded-md mt-4 bg-white">
                        <input onChange={handleChangeForm} type="password" name="rePassword" placeholder="Repeat password..."
                        className="w-[90%] outline-none bg-transparent text-xs h-7 text-black placeholder:text-xs" />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button onClick={handleSetPassword} className="text-xs rounded-md w-full py-2 bg-black">Set password</button>
                </div>

                {/* Conditions Text */}
                <div className="text-[#828282] text-xs text-center mt-6">
                    <p>By clicking set password, you agree to our <span className="text-black">Terms of Service</span> and <span className="text-black">Privacy Policy</span></p>
                </div>
            </div>

            {/* Error Notification */}
            <div id="login-error" hidden className="border-2 absolute rounded-xl bg-gradient-to-b from-[#141414] via-[#272727] to-[#141414] p-5">
                {/* Top Container */}
                <div className="flex justify-between items-center">
                    {/* Title */}
                    <div>
                        <h1 className="text-xl font-bold">Error</h1>
                    </div>

                    {/* Close Button */}
                    <button onClick={handleCloseError}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#FFF" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 01-1.41 0L12 13.41 9.11 16.3a.996.996 0 11-1.41-1.41L10.59 12 7.7 9.11A.996.996 0 119.11 7.7L12 10.59l2.89-2.89a.996.996 0 111.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"></path></svg>
                    </button>
                </div>

                {/* Message */}
                <div className="mt-5">
                    <p id="login-error-message" className="text-lg font-bold">Email or password incorrect</p>
                </div>

                {/* Try Again Button */}
                <button onClick={handleCloseError} className="w-full font-bold text-lg rounded-full bg-[#3b3b3b] mt-10">Try Again</button>
            </div>
        </div>
        </>
    )
}

export default NewUser