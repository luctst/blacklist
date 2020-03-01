import styled from "styled-components";
import React from "react";

const TitleStyled = styled.header`
  h1 {
    text-align: center;
    margin: 3% 0;
    font-family: Gelasio;
  }
  @media screen and (max-width: 500px) {
    h1 {
      margin-bottom: 10%;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    h1 {
      margin-bottom: 6%;
      font-size: 3em;
    }
  }
`

export default function Header() {
  return(
    <TitleStyled>
      <h1 className="header--title">BlackList</h1>
    </TitleStyled>
  )
}