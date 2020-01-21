import styled from "styled-components";

const BlackListStyled = styled.div`
  font-family: Roboto;
    label {
      font-family: Gelasio;
      font-weight: bold;
    }
    input {
      width: 20%;
      padding: 9px 15px;
      border: none;
        :focus {
          box-shadow: none;
          background-color: #f5f6f7;
        }
    }
    #avatar {
      width: 30%;
    }
    button, button:hover {
      background: #333;
      border: none;
      margin: 20px 10px;
        :focus {
          box-shadow: none;
          background-color: #333;
          border: none;
        }
    }
`

export default BlackListStyled