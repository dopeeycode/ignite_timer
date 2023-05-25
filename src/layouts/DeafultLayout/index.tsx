import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import { LayoutContainer } from './styles'

export default function DeafultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
