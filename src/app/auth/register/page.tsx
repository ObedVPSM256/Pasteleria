"use client";
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Sidebar from '@/components/form/sidebar';

import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();


    const onSubmit = handleSubmit(async (data) => {
        
        if (data.password !== data.confirmPassword) {
            return alert('Passwords do not match');
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!res.ok) {
            const error = await res.json();
            return alert(error.message || 'Something went wrong');
        }

        if (res.ok)
        {
            router.push('/auth/login')
        }

        const resJSON = await res.json();
        console.log(resJSON);
    });

    return (
        <div className='flex'>
            <Sidebar/>
            <div className="flex-1 flex items-center justify-center">
                <form onSubmit={onSubmit} className='w-96 p-8 rounded-lg text-white flex flex-col border border-white/90 shadow-md bg-white backdrop-blur-xs hover:border-rose-500 hover:scale-105 transition-all'>
                <div className="flex justify-center space-x-4 mb-8">
                    <a href="/auth/register" className="p-4 text-xl font-bold text-rose-700  text-center border-b-2 border-rose-500">Register</a>
                    <a href="/auth/login" className="p-4 text-xl font-bold text-center  text-rose-400 hover:text-rose-700 hover:border-b-2 hover:border-rose-500 transition-all">Login</a>
                </div>
                
                    <Label htmlFor='username'>Username</Label>
                    <Input
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: {
                                value: true,
                                message: 'Username is required'
                            }
                        })}
                    />
                    {errors.username && (
                        <span className='text-red-500 text-sm'>
                            {typeof errors.username?.message === 'string' && errors.username.message}
                        </span>
                    )}

                    <Label htmlFor='email'>Email</Label>
                    <Input
                        type="email"
                        placeholder="user@gmail.com"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            }
                        })}
                    />
                    {errors.email && (
                        <span className='text-red-500 text-sm'>
                            {typeof errors.email?.message === 'string' && errors.email.message}
                        </span>
                    )}

                    <Label htmlFor='password'>Password</Label>
                    <Input
                        type="password"
                        placeholder="********"
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'Password is required'
                            }
                        })}
                    />
                    {errors.password && (
                        <span className='text-red-500 text-sm'>
                            {typeof errors.password?.message === 'string' && errors.password.message}
                        </span>
                    )}

                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                        type="password"
                        placeholder="********"
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: 'Confirm Password is required'
                            }
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className='text-red-500 text-sm'>
                            {typeof errors.confirmPassword?.message === 'string' && errors.confirmPassword.message}
                        </span>
                    )}

                    <Button type="submit">
                        Register
                    </Button>
                </form>
                <Image  src="/login.svg"   
                alt="Logo de la repostería"  
                className="fixed w-4/8 -z-10 rounded-4xl"/>
            </div>    
        </div>
    );
}