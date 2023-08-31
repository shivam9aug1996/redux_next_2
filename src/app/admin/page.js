"use client"
import withMounted from '@/components/withMounted';
import dynamic from 'next/dynamic';
import React from 'react'
// const withAdminAuth = dynamic(
//   () => import("./withAdminAuth"),
//   { ssr: false }
// );
import withAdminAuth from './withAdminAuth'

const Admin = () => {
  return (
    <div>Admin</div>
  )
}

export default Admin