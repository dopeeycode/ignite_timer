import { logo } from "../../assets/directory";
import { Timer, Scroll } from 'phosphor-react'

import { NavLink } from 'react-router-dom'

import { HeaderContainer } from "./styles";

export default function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={28}/>
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={28}/>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
