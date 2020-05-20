import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import Header from './header'

const ProjectInfo = () => {
  // const [userName] = useState()
  // const [repoName] = useState()

  // useEffect(() => {
  //   const headers = { Accept: 'application/vnd.github.VERSION.html' }
  //   axios.get(`https://api.github.com/repos/${userName}/${repoName}/readme`, { param: {}, headers })
  // }, [])

  return (
    <div>
      <Header />
      <Link to="/">Home</Link>
    </div>
  )
}

ProjectInfo.propTypes = {}

export default ProjectInfo
