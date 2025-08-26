import "./style.css"
import io from "socket.io-client"
import { useForm, } from 'react-hook-form'
import { useEffect, useState } from "react"

const socket = io("http://localhost:3000/")


export const Form = () => {
    const [listMsg, setListMsg] = useState<string[]>([]);
    const { register,
        handleSubmit, reset } = useForm()
    const onSubmit = (data: any) => {
        const cleanMsg = data.msg.trim()
        console.log(cleanMsg)
        setListMsg(prev => [...prev, cleanMsg]);
        socket.emit("message", cleanMsg)
        reset()
    }
    useEffect(() => {
        socket.on('message', message => {
            console.log(`from backend ${message}`)
            setListMsg(prev => [...prev, message]);
        })
    }, [])
    return (
        <div className="chat">
            <div className="msg-area">
                <ul>
                    {listMsg.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input autoComplete="false" className="input-msg" {...register("msg")} />
                <button type="submit"> Enviar</button>
            </form>
        </div>
    )
}

