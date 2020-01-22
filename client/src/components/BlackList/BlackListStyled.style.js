import styled from "styled-components";

const BlackListStyled = styled.section`
  font-family: Roboto;
  .parent--div {
    position: relative;
    display: flex;
    align-items: center;
    flex: auto;

    .parent--dot {
      margin-right: 4px;
      width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 0;
      flex-shrink: 0;
      min-height: calc(1.5em + 3px + 3px);
      padding-right: 2px;

        span {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: currentcolor;
          margin-top: 0.1em;
        }
      }
    .content--name:focus {
      outline: none;
    }

    .parent--div--close {
      position: absolute;
      left: -12px;
      display: none;
    }

    :hover > .parent--div--close {
      display: block;
    }
  }
`

export default BlackListStyled