import * as React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { ReactComponent as Menu } from '../assets/icons/navbar/menu.svg'
import { ReactComponent as Dmenu } from '../assets/icons/navbar/dmenu.svg'
import { ReactComponent as Pay } from '../assets/icons/navbar/pay.svg'
import { ReactComponent as Dpay } from '../assets/icons/navbar/dpay.svg'
import { ReactComponent as Home } from '../assets/icons/navbar/home.svg'
import { ReactComponent as Dhome } from '../assets/icons/navbar/dhome.svg'
import { ReactComponent as Together } from '../assets/icons/navbar/together.svg'
import { ReactComponent as Dtogether } from '../assets/icons/navbar/dtogether.svg'
import { ReactComponent as Challenge } from '../assets/icons/navbar/challenge.svg'
import { ReactComponent as Dchallenge } from '../assets/icons/navbar/dchallenge.svg'

import { setFlexStyles } from '../styles/Mixin'

function NavBar() {
  const location = useLocation()
  console.log("로케이션", location)
  
  if (window.location.pathname === '/login') return null

  if (window.location.pathname === '/menu') return null

  const navStyle = (isActive) => {}
  return (
    <NavBars>
      <NavLink
        to="/menu"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#4675F0' : '#999999',
          // fontWeight: isActive ? '800' : '400',
        })}
      >
        <Component>
          <Dmenu style={{ width: '24px', height: '24px' }} />
          {/* <MenuIcon>z</MenuIcon> */}
          <MenuText>메뉴</MenuText>
        </Component>
      </NavLink>
      <NavLink
        to="/onedaybuza"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#4675F0' : '#999999',
          // fontWeight: isActive ? '800' : '400',
        })}
      >
        <Component>
          {location.pathname === '/onedaybuza' ? (
            <Pay style={{ width: '24px', height: '24px' }} />
          ) : (
            <Dpay style={{ width: '24px', height: '24px' }} />
          )}
          {/* <Pay style={{ width: '24px', height: '24px' }} /> */}

          <MenuText>하루부자</MenuText>
        </Component>
      </NavLink>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#4675F0' : '#999999',
          // fontWeight: isActive ? '800' : '400',
        })}
      >
        <Component>
          {location.pathname === '/' ? (
            <Home style={{ width: '24px', height: '24px' }} />
          ) : (
            <Dhome style={{ width: '24px', height: '24px' }} />
          )}

          <MenuText>홈</MenuText>
        </Component>
      </NavLink>

      <NavLink
        to="/groupbuza"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#4675F0' : '#999999',
          // fontWeight: isActive ? '800' : '400',
        })}
      >
        <Component>
          {location.pathname === '/groupbuza' ? (
            <Together style={{ width: '24px', height: '24px' }} />
          ) : (
            <Dtogether style={{ width: '24px', height: '24px' }} />
          )}

          <MenuText>같이해부자</MenuText>
        </Component>
      </NavLink>
      <NavLink
        to="/challengebuza"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#4675F0' : '#999999',
          // fontWeight: isActive ? '800' : '400',
        })}
      >
        <Component>
          {location.pathname === '/challengebuza' ? (
            <Challenge style={{ width: '24px', height: '24px' }} />
          ) : (
            <Dchallenge style={{ width: '24px', height: '24px' }} />
          )}

          <MenuText>도전해부자</MenuText>
        </Component>
      </NavLink>
    </NavBars>
  )
}
const NavBars = styled.div`
  position: fixed;
  bottom: -20px;
  width: 100%;
  max-width: 360px;
  height: 11.4vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`
const Component = styled.div`
  ${setFlexStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  })}
`
const MenuIcon = styled.div`
  background-color: gray;
  width: 24px;
  height: 24px;
`
const MenuText = styled.div`
  font-style: normal;
  /* font-weight: normal; */
  font-size: 10px;
  line-height: 14px;
  text-align: center;
`
export default NavBar
