import React from 'react'
import Header from './header'

const ReactMarkdown = require('react-markdown')

const ProjectInfo = (props) => {
  return (
    <div>
      <Header id="go-repository-list"/>
      <div>README</div>
      <div>----------</div>
      <div id="description">
        <ReactMarkdown source={props.description} />
      </div>
    </div>
  )
}

ProjectInfo.propTypes = {}

export default ProjectInfo
