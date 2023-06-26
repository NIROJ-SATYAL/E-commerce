import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h4 >All Right Received &copy; ganguprabesh</h4>
        <p>
            <Link to="/about"> About</Link>
            |
            <Link to="/contact"> Contact</Link>
            |
            <Link to="/privacy"> Privacy</Link>
        </p>
    </div>
  )
}

export default Footer