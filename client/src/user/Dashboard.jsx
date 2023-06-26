import React from 'react'
import Layout from '../Components/Layout/LayouSt'
import { useAuth } from '../context/AuthContext'
import UserMenu from './UserMenu'

const Dashboard = () => {
  const [auth,setAuth]=useAuth()
  return (
    <Layout>
    <div className="container-fluid p-3 m-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h1> User Name:{auth?.user?.name}</h1>
            <h1> User Email:{auth?.user?.email}</h1>
            <h1> User Contact:{auth?.user?.phone}</h1>
          </div>
        </div>
      </div>
    </div>
</Layout>
  
  )
}

export default Dashboard