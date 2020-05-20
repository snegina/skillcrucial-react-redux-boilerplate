import React from 'react'
import { Route } from 'react-router-dom'
// import axios from 'axios'
import RepositoriesList from './repositorieslist'
import InputView from './inputview'
import ProjectInfo from './projectinfo'

const Home = () => {
  // const { username } = useParams()
  // const [repositoryList] = useState([])
  // const [projectDescription, setProjectDescription] = useState('')

  // useEffect(() => {
  //   if (typeof project !== 'undefined') {
  //     Axios(`https://api.github.com/users/${username}/${project}/readme`).then(({ data }) => {
  //       setProjectDescription(data.description)
  //     })
  //   }
  // }, [project])

  return (
    <div>
      <div>
        <div>
          <Route exact path="/" render={() => <InputView />} />
          <Route exact path="/:username" component={() => <RepositoriesList />} />
          <Route exact path="/:username/:projectinfo" component={() => <ProjectInfo />} />
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
