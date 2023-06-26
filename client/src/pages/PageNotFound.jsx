import React from 'react'
import Layout from '../Components/Layout/LayouSt'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout>
        <div className="pnf">
            <h1 className="pnf-title">404</h1>
            <h3>opps!page not found</h3>
            <button as={Link} to='/'  class="btn btn-light">Go Back</button>
        </div>
    </Layout>
  )
}

export default PageNotFound