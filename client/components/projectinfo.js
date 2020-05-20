import React from 'react'
import Header from './header'

const ProjectInfo = (props) => {
  return (
    <div>
      <Header />
      <div>здесь должен быть файл readme.md</div>
      <div>{props.readme}</div>
    </div>
  )
}

ProjectInfo.propTypes = {}

export default ProjectInfo
