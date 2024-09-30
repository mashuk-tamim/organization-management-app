import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='w-screen flex justify-center gap-4 font-medium py-4'>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/transaction">Transaction</Link>
    </nav>
  )
}
