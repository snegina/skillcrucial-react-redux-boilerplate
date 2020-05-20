import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
import Header from './header'

const RepositoriesList = (props) => {
  // const { username } = useParams()
  // const [userName, setUserName] = useState([])
  // useEffect(() => {
  //   if (typeof userName !== 'undefined') {
  //     axios.get(`https://api.github.com/users/${userName}/repos`).then(({ data }) => {
  //       setUserName(data)
  //     })
  //   }
  // }, [userName])

  return (
    <div>
      <Header username={props.username} />
      <div>здесь должны быть репозитории {props.username}</div>
      {/* <div>
        {props.username.map((item) => {
          return (
            <div key={item.name}>
              <div>
                <Link to={`/${username}/${item.name}`}>{item.name}</Link>
              </div>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

RepositoriesList.propTypes = {}

export default RepositoriesList
