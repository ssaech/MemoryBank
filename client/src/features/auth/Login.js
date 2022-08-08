import {Link, useNavigate} from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'


export default function LoginButton() {
    const navigate = useNavigate();
    const pic = window.location.origin + "/brain.jpeg"

    const st8 = useSelector(state => state)

    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')


    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ user, pwd }).unwrap()
            dispatch(setCredentials({ ...userData, user }))
            setUser('')
            setPwd('')
            navigate('/dashboard')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

   
    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="w-3/4">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
           

            {/* <form onSubmit={handleSubmit}> */}
            <div className="flex flex-col ">
            <label htmlFor="username"> Username </label>
                <input
                    className='p-2 bg-sky-100'
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />
                </div>

                <div className="flex flex-col py-1">
                <label htmlFor="password" className="p-2">Password: </label>
                <input
                    className='p-2 bg-sky-100'
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required

                />
                </div>

            {/* </form> */}

        </section>
    )

    return (
        <div className="flex justify-center w-full grid h-screen place-items-center ">
            <div className="flex flex-col w-3/4 max-w-xl">
                <div className="flex flex-col justify-center mb-10 place-items-center">
                    <img src={pic} className="max-h-24 max-w-min " alt="brain"/>
                    <h1 className="flex justify-center text-2xl mb-6">Welcome to<span className="text-sky-600 whitespace-pre"> MemoryBank!</span></h1>
                    <p>
                    MemoryBank is here to give you peace of mind by helping you keep track of what is important. 
                    </p>
                </div>
                <div className="flex flex-col mb-48">
                    <div className="flex flex-col items-center">
                        
                        {content}

                    </div>
                    <div className="flex flex-col items-center ">
                        <button
                            // onClick={() => testconn()}
                            onClick={(e) => handleSubmit(e)}
                            className="transition ease-in-out delay-150 bg-sky-400 hover:-translate-y-1 hover:scale-100 hover:bg-gradient-to-r from-sky-400 to-sky-600 duration-300
                            w-full my-5 py-2  inline-flex justify-center    rounded-2xl text-white flex-auto w-3/4 ">
                            Log In
                        </button>
                        <span className="hover:underline p-2">
                            <Link to="/register">Need an account?</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
};