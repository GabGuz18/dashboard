'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import { Menu, User, FileText, Users } from "lucide-react";
import { Avatar, AvatarFallback, Button, Separator, Sheet, SheetContent, SheetTitle, SheetTrigger } from '..';

import logo from '../../../public/img/logo.png'
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

export const TopBar = () => {

  const { user } = useContext(AuthContext);

  return (
    <header className="w-full bg-azul-toka shadow-xl fixed z-50">
      <div className=" mx-auto px-4 sm:px-6 flex justify-between items-center h-[8vh]">
        {/* Logo */}
        <Image src={logo} alt='Logo' width={150} height={150} />

        {/* Desktop View: Avatar & Email */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          {user && (
            <div className='flex items-center'>
              <span className="text-white mr-5">
                { user.email }
              </span>
              <Avatar>
                <AvatarFallback>
                  <User className="h-5 w-5 " />
                </AvatarFallback>
              </Avatar>
            </div>
          )} 
        </div>

        {/* Mobile View: Menu Icon */}
        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className='bg-azul-toka hover:bg-azul-toka cursor-pointer'>
                <Menu className="h-6 w-6" color='white' />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-gray-100">
              <SheetTitle side='center'></SheetTitle>

              {/* User Info at the top */}
              { user && (
                <div className="flex items-center space-x-3 p-4 mt-5">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">
                    { user.email }
                  </span>
                </div>
              )}

              <Separator className="" />

              {/* REPORTES Section */}
              <div className="px-4 text-xs font-semibold text-gray-500 uppercase">Reportes</div>
              <nav className="flex flex-col space-y-2 p-4 pt-2">
                <Link href="/reports" className="flex items-center text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">
                  <FileText className="w-4 h-4 mr-2" /> Reports
                </Link>
                <Link href="/reports-comercial" className="flex items-center text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">
                  <FileText className="w-4 h-4 mr-2" /> Reports Comercial
                </Link>
              </nav>

              <Separator className="my-2" />

              {/* USERS Section */}
              <div className="px-4 text-xs font-semibold text-gray-500 uppercase">Users</div>
              <nav className="flex flex-col space-y-2 p-4 pt-2">
                <Link href="/users" className="flex items-center text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">
                  <Users className="w-4 h-4 mr-2" /> Users
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
