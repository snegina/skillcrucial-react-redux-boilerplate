import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from './header'

const Profile = () => {
  const { username } = useParams()
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <Link to="/dashboard"> Go To Root</Link>
          <Link to="/dashboard/main"> Go To Main</Link>
          <div id="title"> Profile </div>
          <div id="username"> {username}</div>
        </div>
      </div>
    </div>
  )
}
Profile.propTypes = {}

export default Profile
