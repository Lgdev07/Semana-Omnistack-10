import React from 'react'

import './styles.css'

export default function DevItem({ dev }) {
    return(
        <li className='dev-item'>
        <header>
          <img src={dev.avatar_url} alt={dev.name}/>
          <div className="user-info">
            <strong>{dev.name || dev.github_username}</strong>
            <span>{dev.techs.join(', ')}</span> 
          </div>
        </header>
        <p>{dev.bio || 'User does not have a Bio'}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil do Github</a>
      </li>
    )
}