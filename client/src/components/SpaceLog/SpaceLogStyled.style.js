import styled from "styled-components";

const SpaceLogStyled = styled.form`
  font-family: Roboto;
  margin-top: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .form--connection--mail, .form--connection--password {
    display: flex;
    flex-direction: column;
    margin-bottom: 5%;
  }
  .form--connection--button {
    input {
      margin-bottom: 10px;
    }
  }
    label {
      font-family: Gelasio;
      font-weight: bold;
    }
    input {
      background: #f5f6f7;
      padding: 9px 15px;
      border-radius: 6px;
      border: none;
    }
`

export default SpaceLogStyled