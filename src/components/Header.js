import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrap>
      <a href="/">
        <h1>영 단어장</h1>
      </a>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #121212;
  border-bottom: 2px solid white;
  
  a {
    text-decoration: none;
    color: #f1f3f5;
    
  }

  a:hover {
    color: rgb(124, 200, 250);
    h1 {
      text-shadow: 2px 2px 2px rgb(105, 191, 249, 0.5);
    }
  }
`;

export default Header;
