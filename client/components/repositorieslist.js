import React from 'react'
import { Link } from 'react-router-dom'
import Header from './header'

const RepositoriesList = (props) => {
  return (
    <div>
      <Header />
      <div>Список репозиториев {props.username}</div>
      <div>
        <div>
          {props.reposytorieslist.map((item) => {
            return (
              <div key={item.name}>
                <div>
                  <Link to={`/${props.username}/${item.name}`}>{item.name}</Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

RepositoriesList.propTypes = {}

export default RepositoriesList
