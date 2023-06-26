import React from 'react'
import Layout from '../Components/Layout/LayouSt'
import  {useAuth}  from '../context/AuthContext'

const Home = () => {
const  [auth,setAuth]=useAuth()

  return (
    <Layout><h1>home</h1>
    <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default Home