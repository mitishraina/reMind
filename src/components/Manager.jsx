import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        console.log(passwords)
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast.success('Copied to clipboard', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/closed.png")) {
            ref.current.src = "icons/open.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/closed.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = ( async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("http://localhost:3000/", { method:"DELETE", headers:{"Content-Type": "application/json"}, body:JSON.stringify({ id: form.id })})
            toast.success('Password saved successfully!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            await fetch("http://localhost:3000/", { method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify({ ...form, id:uuidv4()})})
            // console.log([...passwordArray, form])
            setform(({ site: "", username: "", password: "" }))
        }
        else {
            toast.error('Error: Too short inputs!')
        }
    }
    )

    const deletePassword = ( async (id) => {
        let c = confirm("Do you really want to delete password?")
        if(c){
            setpasswordArray(passwordArray.filter(item => item.id!==id))
            toast.success('Deleted successfully!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                let res =await fetch("http://localhost:3000/", { method:"DELETE", headers:{"Content-Type": "application/json"}, body:JSON.stringify({ id })})
                // localStorage.setItem("passwords", JSON.stringify((passwordArray.filter(item => item.id!==id))))
        }
    }
    )

    const editPassword = ((id) => {
        setform({...passwordArray.filter(item => item.id === id)[0], id: id})
        setpasswordArray(passwordArray.filter(item => item.id!==id))
    }
    )

    const handleChange = ((e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    )

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-gray-400 bg-[linear-gradient(to_right,#8080800a_10px,transparent_5px),linear-gradient(to_bottom,#8080800a_4px,transparent_5px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-32 h-[710px] w-[610px] rounded-t-3xl bg-black opacity-70 blur-[100px]"></div></div>

            <div className="mycontainer bg-slate-700 w-[1365px] rounded-md">
                <h1 className='text-3xl font-semibold text-center text-white'>re<span className='text-red-400'>M</span>ind</h1>
                <p className='text-xl text-white text-center'>YOUR OWN PASSWORD MANAGER!</p>

                <div className='text-black flex flex-col p-4 gap-3 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website or domain name' className='rounded-full border-2 border-red-400 p-4 py-1 w-full' type="text" name="site" id='site'/>
                    <div className="flex gap-3 justify-between w-full">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full w-full border-2 border-red-400 p-4 py-1' type="text" name="username" id='username'/>
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full w-full border-2 border-red-400 p-4 py-1' type="password" name="password" id='password'/>
                            <span className='absolute right-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='px-1 py-2.5' width={30} src='icons/open.png' alt='open' />
                            </span>

                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center text-lg text-white bg-red-400 hover:bg-red-500 border-2 border-white rounded-full gap-2 px-4 py-1 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                        </lord-icon>
                        Save</button>
                </div>

                <div className="passwords bg-red-400 p-3 rounded-md border border-white">
                    <h2 className='text-white text-4xl font-bold'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='font-semibold text-lg p-7'><i> No passwords to show currently.</i></div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full bg-red-300 border border-white rounded-md overflow-hidden mb-10">
                            <thead className='bg-black text-white'>
                                <tr>
                                    <th className='py-1.5 border '>Site</th>
                                    <th className='py-1.5 border '>Username</th>
                                    <th className='py-1.5 border '>Password</th>
                                    <th className='py-1.5 border '>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-red-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center py-1.5'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <a href={item.site} target='_blank' rel='noopener noreferrer'>{item.site}</a>
                                                <div className='lordiconcopy size-6 cursor-pointer' onClick={() => copyText(item.site)}>
                                                    <lord-icon
                                                        style={{ width: "23px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='text-center border border-white'>
                                            <div className='flex justify-center items-center gap-2'>
                                                {item.username}
                                                <div className='lordiconcopy size-6 cursor-pointer' onClick={() => copyText(item.username)}>
                                                    <lord-icon
                                                        style={{ width: "23px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='text-center border border-white'>
                                            <div className='flex justify-center items-center gap-2'>
                                                {"*".repeat(item.password.length)}
                                                <div className='lordiconcopy size-6 cursor-pointer' onClick={() => copyText(item.password)}>
                                                    <lord-icon
                                                        style={{ width: "23px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='flex items-center justify-center py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => {editPassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer' onClick={() => {deletePassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                </div>
            </div >
            
        </>
    )
}

export default Manager
