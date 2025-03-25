'use client'

import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle, Button, Input } from '@/components';
import { useSearchParams } from 'next/navigation';
import { CircleCheckBig, CircleSlash } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';

const CheckRegistered = () => {
  const searchParams = useSearchParams();
  if (searchParams.get('registered') === 'true') {
    return (
      <Alert className='mb-5 border-2 border-green-500 bg-green-200'>
        <CircleCheckBig className="h-4 w-4" />
        <AlertTitle>Registro exitoso!</AlertTitle>
        <AlertDescription>
          Ahora puedes iniciar sesión.
        </AlertDescription>
      </Alert>
    )
  } else {
    return null;
  }
}

export const Login = () => {

  const { login, authLoading, authError } = useContext(AuthContext);

  const [form, setForm] = useState({
    'user': '',
    'password': ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value.trim()
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user && !form.password) {
      return;
    }

    try {
      await login(form.user, form.password);
    } catch (err) {
      console.log(err);
    }

    setForm({
      'user': '',
      'password': ''
    });

  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Inicio de sesión</h2>

        <CheckRegistered />

        {authError && (
          <Alert className='mb-5 border-2 border-red-500 bg-red-200'>
            <CircleSlash className="h-4 w-4" />
            <AlertTitle>Error al iniciar sesión!</AlertTitle>
            <AlertDescription>
              { authError }
            </AlertDescription>
          </Alert>
        )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuario</label>
          <Input
            type="text"
            id="user"
            name='user'
            placeholder="Usuario"
            className="mt-1"
            onChange={handleChange}
            value={form.user}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <Input
            type="password"
            id="password"
            name='password'
            placeholder="Contraseña"
            className="mt-1"
            onChange={handleChange}
            value={form.password}
          />
        </div>

        <Button type="submit" className="w-full mt-4 bg-azul-toka border-2 border-azul-toka hover:bg-white hover:text-azul-toka cursor-pointer" onClick={ handleSubmit }>Iniciar Sesión</Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        No tienes una cuenta?{" "}
        <Link href="/auth/register" className="text-blue-600 hover:underline">Registrate</Link>
      </p>
    </div>
  );
}