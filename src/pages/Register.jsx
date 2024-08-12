import React, { useState } from 'react';
import { style } from '../utilits/styles';
import { useRegisterUserMutation } from '../redux/RegisterApi';

export default function Register() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, phone }).unwrap();
            console.log('Registration successful');
        } catch (err) {
            console.error('Registration failed', err);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form className='flex flex-col w-[500px] m-auto mt-[100px]' onSubmit={handleRegister}>
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
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                {isSuccess && <p className='text-center py-[30px]'>Registration successful!</p>}
                {isError && <p>Error: {error.message}</p>}
            </form>
        </div>
    );
}
