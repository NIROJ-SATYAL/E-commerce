import React from 'react'
import Layout from '../Components/Layout/LayouSt'
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/AuthContext'


const AdminDashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout>
          <div className="container-fluid p-3 m-3">
            <div className="row">
              <div className="col-md-3">
                <AdminMenu/>
              </div>
              <div className="col-md-9">
                <div className="card w-75 p-3">
                  <h1> Admin Name:{auth?.user?.name}</h1>
                  <h1> Admin Email:{auth?.user?.email}</h1>
                  <h1> Admin Contact:{auth?.user?.phone}</h1>
                </div>
              </div>
            </div>
          </div>
    </Layout>
  
  )
}

export default AdminDashboard