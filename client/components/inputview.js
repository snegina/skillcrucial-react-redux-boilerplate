import React, { useState } from 'react'
import { history } from '../redux'
import Header from './header'

const InputView = () => {
  const [username, setUserName] = useState('')

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-800 text-white font-bold rounded-lg border shadow-lg p-5">
          <input
            id="input-field"
            className="text-black"
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
          <button
            id="search-button"
            type="button"
            className="text-white"
            onClick={() => {
              history.push(`/${username}`)
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

InputView.propTypes = {}

export default InputView
