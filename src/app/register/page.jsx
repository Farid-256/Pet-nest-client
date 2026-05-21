'use client'
import { authClient } from '@/app/lib/auth-client';
import { Button, Checkbox, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Register = () => {

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const newUsers = Object.fromEntries(formData.entries())

        // Confirm Password Check
        if (newUsers.password !== newUsers.confirmPassword) {
            toast.error("Password & Confirm Password must be same!")
            return;
        }

        const { data, error } = await authClient.signUp.email({
            name: newUsers.name,
            email: newUsers.email,
            password: newUsers.password,
            image: newUsers.image,
        })

        console.log({ data, error })

        if (data) {
            toast.success('Account created successfully!')
            window.location.href = '/login'
        } else if (error) {
            toast.error(error.message || "Registration failed")
        }
    }

    return (
        <div className='max-w-7xl mx-auto rounded-3xl flex flex-col justify-center items-center mb-3'>
            <div className='py-5 flex flex-col items-center justify-center'>
                <h3 className='text-3xl'>Create Account</h3>
                <p className='text-xs text-gray-400'>Start your adventure with pet nest</p>
            </div>

            <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4 border bg-gray-50 border-amber-200 rounded-3xl p-5">

                <TextField isRequired name="name" type="text">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                    <FieldError />
                </TextField>

                <TextField name="image" type='url'>
                    <Label>Photo url</Label>
                    <Input placeholder="Enter your photo url" />
                    <FieldError />
                </TextField>

                <TextField isRequired name="email" type="email" validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                        return "Please enter a valid email address";
                    }
                    return null;
                }}>
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={6}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 6) {
                            return "Password must be at least 6 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 6 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>

                {/* New Confirm Password Field */}
                <TextField
                    isRequired
                    name="confirmPassword"
                    type="password"
                >
                    <Label>Confirm Password</Label>
                    <Input placeholder="Re-enter your password" />
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit">
                        <Checkbox />
                        Create Account
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>

                <p className='text-center text-sm text-gray-600'>
                    Already have an account?
                    <Link href="/login" className='text-blue-500 hover:underline ml-1 font-medium'>
                        Login here
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default Register;