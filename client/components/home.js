import React, { useState, useEffect } from 'react'
import { Route, useParams } from 'react-router-dom'
import axios from 'axios'
import RepositoriesList from './repositorieslist'
import InputView from './inputview'
import ProjectInfo from './projectinfo'

const Home = () => {
  const { username, projectinfo } = useParams()
  const [reposytorieslist, setReposytoriesList] = useState([])
  const [projectDescription, setProjectDescription] = useState('')

  useEffect(() => {
    if (typeof username !== 'undefined') {
      axios(`https://api.github.com/users/${username}/repos`).then(({ data }) => {
        setReposytoriesList(data)
      })
    }
  }, [username])

  useEffect(() => {
    if (typeof projectinfo !== 'undefined') {
      axios
        .get(`https://raw.githubusercontent.com/${username}/${projectinfo}/master/README.md`)
        .then(({ data }) => {
          setProjectDescription(data)
        })
    }
  }, [username, projectinfo])

  return (
    <div>
      <Route exact path="/" component={() => <InputView />} />
      <Route
        exact
        path="/:username"
        component={() => (
          <RepositoriesList username={username} reposytorieslist={reposytorieslist} />
        )}
      />
      <Route
        exact
        path="/:username/:projectinfo"
        component={() => <ProjectInfo description={projectDescription} />}
      />
    </div>
  )
}

Home.propTypes = {}

export default Home
