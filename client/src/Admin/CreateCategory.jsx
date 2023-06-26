import React from 'react'
import Layout from '../Components/Layout/LayouSt'
import AdminMenu from './AdminMenu'

const CreateCategory = () => {
  return (
    <Layout title={"Admin-Dashboard create category"}>

        <div className="container-fluid p-3 m-3">
            <div className="row">
            <div className="col-md-3"><AdminMenu/></div>
            <div className="col-md-9">
                create category
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory