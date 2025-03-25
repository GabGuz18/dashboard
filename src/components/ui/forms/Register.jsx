'use client'

import Link from 'next/link'
import { Button, Input } from '@/components';
import { toast } from 'sonner';

export const Register = () => {
  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registro</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuario</label>
          <Input
            type="text"
            id="user"
            placeholder="Usuario"
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
          <Input
            type="email"
            id="email"
            placeholder="Correo"
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <Input
            type="password"
            id="password"
            placeholder="Contraseña"
            className="mt-1"
          />
        </div>

        <Button type="submit"
          className="w-full mt-4 bg-azul-toka border-2 border-azul-toka hover:bg-white hover:text-azul-toka" 
          onClick={() => { toast.error('Error al iniciar sesion') }}
        >
          Registrarse
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Ya tienes una cuenta?
        <Link href="/auth/login" className="text-blue-600 hover:underline"> Iniciar sesion</Link>
      </p>
    </div>
  );
}
