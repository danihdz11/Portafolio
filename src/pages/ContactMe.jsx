import { Link } from "react-router";
import Recat, { useState } from "react";



export default function ContactMe() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSendEmail = async (e) => {
        e.preventDefault();
        const data = await fetch('api/server', {
            method: "POST",
            headers: {},
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                message: form.message,
            }),
        });
        const res = await data.json();
        console.log(res);
    }


    return (
        <div>
            <h1>Contact Me</h1>
            <div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <input name="name" type="text" value={form.name} onChange={handleOnChange} />
                    <input name="email" type="email" value={form.email} onChange={handleOnChange} />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <textarea name="message" rows="10" cols="50" value={form.message} onChange={handleOnChange}>Write something here</textarea>
                </div>
                <button onClick={handleSendEmail} style={{ width: '140px', height: '40px' }}>Contact Me</button>
            </div>
        </div>
    )
}