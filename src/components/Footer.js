import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useDispatch } from 'react-redux';
import styled from "styled-components";

import { logout } from "../redux/actions/auth"


//        ICONS
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineLogout,
  AiOutlineFlag,
  AiFillFlag,
  AiOutlineProfile,
  AiFillProfile
} from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import { IconContext } from "react-icons";
// import { BsChatText, BsChatTextFill, BsFileX } from "react-icons/bs";


const Footer = ({ toggleTheme, theme }) => {
  const dispatch = useDispatch();

  let themeLabel;
  
  if (theme === "light") {
    themeLabel = "dark";
  } else{
    themeLabel = "light";
  }

  function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    
    let active_color;
    if (match) {
      active_color = props.active_icon.props.color;
    }
    
    return (
      <div>

        <StyledLink to={to} active={match} {...props}>
          {match ? props.active_icon : props.passive_icon}
          <span style={{ color: active_color }} >{children}</span>  
        </StyledLink>

      </div>
    );
  }

  return (
    <IconContext.Provider value={{ color: "var(--icons)" }}>

        <Page>

            <CustomLink to="/" 
            active_icon={<AiFillHome color="var(--active)" />} 
            passive_icon={<AiOutlineHome />} 
            ><span>Home</span>
            </CustomLink>

            <CustomLink to="/profile"
            active_icon={<AiFillProfile color="var(--active)" />} 
            passive_icon={<AiOutlineProfile />}
            ><span>Profile</span>
            </CustomLink>

            <CustomLink to="/match"
            active_icon={<AiFillFlag color="var(--active)"/>} 
            passive_icon={<AiOutlineFlag  />}
            ><span>Match</span>
            </CustomLink>

            <CustomLink to="#"
            onClick={toggleTheme}
            active_icon={<CgDarkMode />}
            ><span>{themeLabel}</span>
            </CustomLink>

            <CustomLink to="#"
            onClick={() => dispatch(logout())}
            active_icon={<AiOutlineLogout />}
            ><span>Logout</span>
            </CustomLink>

        </Page>

    </IconContext.Provider>
  );
};


const Page = styled.div`

  position: fixed;
  bottom: 0;
  width: 100vw;

  border-top: 1px solid var(--background);
  background-color: var(--card-bg);

  display: flex;
  align-items: center;
  justify-content: space-around;

  font-size: 1.5rem;

`;


const StyledLink = styled(Link)`

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.6rem 0 0.4rem;
  text-decoration: none;
  color: var(--text-primary);
  gap: 3px;

  &:hover {
    cursor: pointer;
  }

  span {
    font-size: 0.7rem;
    font-weight: 300;
  }

`;


export default Footer;