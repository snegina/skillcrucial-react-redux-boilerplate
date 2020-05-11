import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, useParams } from 'react-router-dom'
import Head from './head'

const Profile = () => {
  const [counter, setCounterNew] = useState(0)
  const { username } = useParams()

  return (
    <div>
      <Head title="Hello" />
      <button type="button" onClick={() => setCounterNew(counter + 1)}>
        <a href="https://google.com"> Menu</a>
      </button>

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

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
