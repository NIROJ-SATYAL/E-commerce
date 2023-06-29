import React from 'react'
import Layout from '../Components/Layout/LayouSt'
import AdminMenu from './AdminMenu'

const ProductList = () => {
  return (
    <Layout  title={"Admin-Dashboard product list"}>

    <div className="container-fluid p-3 m-3">
        <div className="row">
        <div className="col-md-3"><AdminMenu/></div>
        <div className="col-md-9">
            product list
        </div>
        </div>
    </div>
</Layout>
  )
}

export default ProductList