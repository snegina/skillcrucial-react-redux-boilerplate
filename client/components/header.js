import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Header = () => {
  const { username } = useParams()

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div id="repository-name" className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to={`/${username}`} id="repository-name">{username}</Link>
        </div>
        <div id="go-back" className="block text-white">
          <Link to="/">Home</Link>
        </div>
      </nav>
    </div>
  )
}

export default Header
