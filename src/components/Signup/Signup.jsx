/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Signup = () => {
    const [users, setUsers] = useState()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    })

    const navigate = useNavigate()

    const handleChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = () => {
        const errorPopup = document.getElementById('login-error')
        const errorMessage = document.getElementById('login-error-message')

        if (form.name === '' || form.email === '' || form.password === '' || form.re_password === '') {
            errorMessage.textContent = 'All fields are required'
            errorPopup.hidden = false
        } else if (form.name.length < 3 || form.email.length < 3 || form.password.length < 3 || form.re_password.length < 3) {
            errorMessage.textContent = 'All fields must be at least 3 characters long'
            errorPopup.hidden = false
        } else if (form.email.split('@').length - 1 !== 1  || !form.email.includes('.')) {
            errorMessage.textContent = 'Invalid email'
            errorPopup.hidden = false
        } else if (form.password !== form.re_password) {
            errorMessage.textContent = 'Passwords do not match'
            errorPopup.hidden = false
        } else {
            if (users.filter(user => user.email === form.email).length > 0) {
                errorMessage.textContent = 'Email is already in use'
                errorPopup.hidden = false
                return
            }
            createUser()
        }
    }

    const LogInOver = () => {
        document.getElementById('SignUp').style.borderBottom = 'none'
    }

    const LogInLeave = () => {
        document.getElementById('SignUp').style.borderBottom = '2px solid black'
    }

    const handleSwitch = () => {
        navigate('/')
    }

    const handleCloseError = () => {
        document.getElementById('login-error').hidden = true
    }

    const init = async () => {
        const users = await getUsers()
        setUsers(users)
    }

    const getUsers = async () => {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        return data
    }

    const createUser = async () => {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                password: form.password
            })
        })
        const data = await response.json()
        localStorage.setItem('id', data.id)
        navigate('/dashboard')
    }

    useEffect(() => {
        localStorage.removeItem('id')
        init()
    }, [])

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

                {/* Switch Log | Reg Container */}
                <div className="flex justify-evenly mt-6 text-lg font-bold text-black">
                    {/* Log In */}
                    <button onMouseLeave={LogInLeave} onMouseOver={LogInOver} onClick={handleSwitch} className="border-black hover:border-b-2">Log In</button>

                    {/* Sign Up */}
                    <button id="SignUp" className="border-black border-b-2">Sign Up</button>
                </div>

                {/* Form Container */}
                <div className="flex flex-col mt-6 text-black">
                    {/* Email */}
                    <div className="border-[1px] flex justify-center rounded-md bg-white ">
                        <input onChange={handleChangeForm} autoFocus type="text" name="name" placeholder="name..."
                        className="w-[90%] outline-none bg-transparent text-xs h-7 text-blackplaceholder:text-xs" />
                    </div>

                    {/* Email */}
                    <div className="border-[1px] flex justify-center rounded-md mt-4 bg-white ">
                        <input onChange={handleChangeForm} type="email" name="email" placeholder="email..."
                        className="w-[90%] outline-none bg-transparent text-xs h-7 text-blackplaceholder:text-xs" />
                    </div>

                    {/* Password */}
                    <div className="border-[1px] flex justify-center rounded-md mt-4 bg-white">
                        <input onChange={handleChangeForm} type="password" name="password" placeholder="password..."
                        className="w-[90%] outline-none bg-transparent text-xs h-7 text-black placeholder:text-xs" />
                    </div>

                    {/* Repeat Password */}
                    <div className="border-[1px] flex justify-center rounded-md mt-4 bg-white">
                        <input onChange={handleChangeForm} type="password" name="re_password" placeholder="repeat password..."
                        className="w-[90%] outline-none bg-transparent text-xs h-7 text-black placeholder:text-xs" />
                    </div>
                </div>

                {/* Login Methods Container */}
                <div className="mt-6 flex justify-evenly">
                    {/* Google */}
                    <button className="w-9">
                        <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" />
                    </button>

                    {/* Facebook */}
                    <button className="w-9">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/640px-Facebook_Logo_%282019%29.png" alt="Facebook" />
                    </button>

                    {/* GitHub */}
                    <button className="w-9">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
                    </button>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button onClick={handleSignup} className="text-xs rounded-md w-full py-2 bg-black">Sign up</button>
                </div>

                {/* Conditions Text */}
                <div className="text-[#828282] text-xs text-center mt-6">
                    <p>By clicking continue, you agree to our <span className="text-black">Terms of Service</span> and <span className="text-black">Privacy Policy</span></p>
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

export default Signup