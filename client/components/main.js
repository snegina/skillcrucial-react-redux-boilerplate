import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Header from './headers'

const Main = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <div id="title"> Main </div>
          <Link to="/dashboard/profile/8cea9b3b-6342-4330-bb7b-f85683547fa6"> Go To Profile</Link>
          <Link to="/dashboard"> Go To Root</Link>
        </div>
      </div>
    </div>
  )
}
Main.propTypes = {}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)