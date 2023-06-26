import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
 <div className="text-center">
    <h1>User Pannel</h1>
<div className="list-group">

<NavLink to="/user-dashboard" className="list-group-item list-group-item-action">DashBoard</NavLink>
<NavLink to="/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
<NavLink to="/user/order" className="list-group-item list-group-item-action">Oders</NavLink>

</div>
</div>
  )
}

export default UserMenu