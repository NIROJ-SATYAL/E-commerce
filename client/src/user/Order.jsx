import React from 'react'
import Layout from '../Components/Layout/LayouSt'
import UserMenu from './UserMenu'

const Order = () => {
  return (
    <Layout>
    <div className="container-fluid p-3 m-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
                
            </div>
            <div className="col-md-9">
                    Order
                </div>
        </div>
    </div>
   </Layout>
  )
}

export default Order