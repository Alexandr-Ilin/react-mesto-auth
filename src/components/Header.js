import React from 'react'
import logoPath from '../images/logo1.svg'

function Header() {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип проекта Место" className="header__logo"/>
    </header>
  )
}
  
export default Header;