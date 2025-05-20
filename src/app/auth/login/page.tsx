"use client";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/form/sidebar";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      router.push("/dulcesdelicias");
      router.refresh();
    }
  });

  return (
    <div className="flex">
      {/* Barra lateral fija a la izquierda */}
      <Sidebar />

      {/* Contenido del login con margen para no estar sobre la barra */}
      <div className="flex-1 flex items-center justify-center">
        <form 
          onSubmit={onSubmit}  
          className="w-96 p-8 rounded-lg text-white flex flex-col border border-white/90 shadow-xl bg-white/100 backdrop-blur-xs hover:border-rose-500 hover:scale-105 transition-all"
        >
          <div className="flex justify-center space-x-4 mb-8">
            <a href="/auth/register" className="p-4 text-xl font-bold text-center text-rose-400 hover:text-rose-700 hover:border-b-2 hover:border-rose-500 transition-all">Register</a>
            <a href="/auth/login" className="p-4 text-xl font-bold text-rose-700 text-center border-b-2 border-rose-500">Login</a>
          </div>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="user@gmail.com" {...register("email", { required: "Email is required" })} />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}

          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="********" {...register("password", { required: "Password is required" })} />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}

          <a href="/auth/forgot-password" className="text-rose-700 mb-2 block text-sm hover:text-rose-500 transition-all mt-2">Forgot password?</a>

          <Button type="submit">Iniciar sesión</Button>

          
        </form>
      </div>
    </div>
  );
}
