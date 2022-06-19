import React from 'react'
import logoPath from '../images/logo1.svg'
import { Link } from 'react-router-dom'

// function Header({linkPuth, linkText}) {
function Header({loggedIn, headerLinkPath, headerLinkText, email, buttonText, signOut}) {
  return (
    <header className='header'>
      
      <div className='header__with-logo'>
        <img src={logoPath} alt="Логотип проекта Место" className="header__logo"/>
        {loggedIn ? <button type="button" onClick={signOut} className='header__button'>{buttonText}</button> : <Link className="header__link" to={headerLinkPath}>{headerLinkText}</Link>}
      </div>

      {loggedIn && (
        <div className='header__context-container'>
          <p className='header__email'>{email}</p>
          {loggedIn ? <button type="button" onClick={signOut} className='header__button'>{buttonText}</button> : <Link className="header__link" to={headerLinkPath}>{headerLinkText}</Link>}
        </div>
      )}

      {/* {loggedIn ? <button type="button" onClick={signOut} className='header__button'>{buttonText}</button> : <Link className="header__link" to={headerLinkPath}>{headerLinkText}</Link>} */}

    </header>
  )
}
  
export default Header;