import React, { useState } from 'react';
import { useGetUsersQuery } from '../redux/RegisterApi';
import { style } from '../utilits/styles';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const { data, error, isLoading, isSuccess } = useGetUsersQuery();
    const navigate = useNavigate()
    const inputs = document.querySelectorAll('input');
    const handleLogin = async (e) => {
        e.preventDefault();
        const userLogin = isSuccess && data.find(user => user.name === name && user.phone === phone);
        if (userLogin) {
            localStorage.setItem('login', userLogin.id);
            if (inputs.length >= 2) {
                inputs[0].style.border = '4px solid green'
                inputs[1].style.border = '4px solid green'
            }
            setTimeout(() => {
                navigate('/add-product')
            }, 1000)
        } else {
            localStorage.removeItem('login');
            if (inputs.length >= 2) {
                inputs[0].style.border = '2px solid red';
                inputs[1].style.border = '2px solid red';
            }
            // alert('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form className='flex flex-col w-[500px] m-auto mt-[100px]' onSubmit={handleLogin}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${style.input} mb-[10px]`}
                    type="text"
                    placeholder='Name'
                    required
                />
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${style.input} mb-[10px]`}
                    type="text"
                    placeholder='Phone number'
                    required
                />
                <button
                    type="submit"
                    className={`${style.button}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                
                {error && <p>Error: {error.message}</p>}
            </form>
                

        </div>
    );
}
