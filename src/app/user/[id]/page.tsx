"use client";

import Sidebar from '@/components/form/sidebar';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Page() {
  const params = useParams();
  const { id } = params;

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`https://reposteriajs.vercel.app/api/profile/${id}`);
        const data = res.data;

        setUserData({
          username: data.username || '',
          email: data.email || '',
          password: data.password || '',
          profilePicture: data.profilePicture || '',
        });
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar solo si se escribió algo en confirmar contraseña
    if (confirmPassword && confirmPassword !== userData.password) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);

      if (file) {
        formData.append('profilePicture', file);
      }

      const res = await axios.post(`http://localhost:3000/api/profile/${id}`, formData);
      console.log("Datos actualizados correctamente", res.data);
    } catch (err) {
      console.error("Error al guardar los datos", err);
    }
  };

  return (
    <div className='flex'>
      <Sidebar />

      <div className='flex-1 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-10 bg-white p-8 rounded-xl shadow-md mb-30'>
          <h2 className='pt-4 font-bold text-2xl text-rose-600'>Perfil del Usuario</h2>

          <form onSubmit={handleSubmit} className="flex flex-row items-center gap-10 bg-white p-8 rounded-xl shadow-md">
            <div className="flex flex-col justify-center items-center">
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Imagen de perfil"
                  width={40}
                  height={40}
                  className="h-40 w-40 object-cover rounded-full border border-rose-300"
                />
              ) : userData.profilePicture ? (
                <Image
                  src={userData.profilePicture}
                  alt="Imagen de perfil"
                  width={40}
                  height={40}
                  className="h-40 w-40 object-cover rounded-full border border-rose-300"
                />
              ) : (
                <CircleUserRound className="h-40 w-40" strokeWidth={0.4} color="#f43f5e" />
              )}

              <label htmlFor="" className="block mt-2 text-rose-600">Deliconis:</label>
              <input type="text" className='w-15 text-center' placeholder='0' />
            </div>

            <div className="flex flex-col p-4 rounded-xl">
              <label className='block text-sm font-bold text-rose-500'>Nombre de usuario</label>
              <input
                name="username"
                type="text"
                className='mb-4 mt-2 w-96 border-1 border-rose-200 rounded-lg p-2'
                value={userData.username}
                onChange={handleChange}
              />

              <label className='block text-sm font-bold text-rose-500'>Correo Electrónico</label>
              <input
                name="email"
                type="email"
                className='mb-4 mt-2 w-96 border-1 border-rose-200 rounded-lg p-2'
                value={userData.email}
                onChange={handleChange}
              />

              <label className='block text-sm font-bold text-rose-500'>Contraseña</label>
              <input
                name="password"
                type="password"
                placeholder='********'
                className='mb-4 mt-2 w-96 border-1 border-rose-200 rounded-lg p-2'
                value={userData.password}
                onChange={handleChange}
              />

              <label className='block text-sm font-bold text-rose-500'>Confirmar Contraseña</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder='********'
                className={`mb-1 mt-2 w-96 border-1 rounded-lg p-2 ${
                  passwordError ? 'border-red-500' : 'border-rose-200'
                }`}
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);
                  if (value && value !== userData.password) {
                    setPasswordError('Las contraseñas no coinciden');
                  } else {
                    setPasswordError('');
                  }
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mb-2">{passwordError}</p>
              )}

              <label className='block text-sm font-bold text-rose-500'>Imagen de perfil</label>
              <input 
                type="file" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                className='mb-4 mt-2 w-96 border-1 border-rose-200 rounded-lg p-2' 
              />
            </div>

            <div className=''>
              <Button type='submit'>Guardar Cambios</Button>
            </div>
          </form>

          <div className='flex-col inline-block items-center justify-center'>
            <h2 className='font-bold text-2xl text-rose-500 '>Reseñas</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
