'use client'

import { authClient } from '@/app/lib/auth-client';
import {
    FieldError,
    Form,
    Input,
    Label,
    TextField
} from '@heroui/react';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaGooglePlusG } from 'react-icons/fa';

const Login = () => {

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const newUsers = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: newUsers.email,
            password: newUsers.password,
        })

        if (data) {
            router.push('/')
        } else if (error) {
            toast.error(error.message || "Login failed")
        }
    }

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: 'google'
        })
    }

    return (
        <div className='max-w-7xl mx-auto rounded-3xl flex flex-col justify-center items-center my-5 border border-amber-200 p-5 bg-gray-50'>

            <div className='py-5 flex flex-col items-center justify-center'>
                <h3 className='text-3xl'>Please Login</h3>
                <p className='text-xs text-gray-400'>Welcome again</p>
            </div>

            <Form onSubmit={onSubmit} className="w-80 flex flex-col gap-5">

                <TextField isRequired name="email" type="email">
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField isRequired name="password" type="password">
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <FieldError />
                </TextField>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white rounded-4xl py-2 cursor-pointer hover:bg-blue-700"
                >
                    Login
                </button>

            </Form>

            <div className="w-80 mt-3">
                <button type="button" onClick={handleGoogleLogin} className="w-full bg-white text-blue-700 border border-blue-500 rounded-4xl py-2 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100">
                    <FaGooglePlusG className='text-xl'/> Login With Google
                </button>
            </div>

            <p className='text-center text-sm text-gray-600 mt-4'>
                Dont have account?
                <Link
                    href="/register"
                    className='text-blue-500 hover:underline ml-1 font-medium'
                >
                    Register here
                </Link>
            </p>

        </div>
    );
};

export default Login;