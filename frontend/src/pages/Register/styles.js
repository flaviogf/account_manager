import styled from 'styled-components'

export const Container = styled.div`
  padding: 16px;
`

export const Links = styled.div`
  justify-content: flex-end;
  margin: 0 auto;
  display: flex;
  width: 100%;
  max-width: 425px;

  a {
    margin-right: 5px;
    padding: 8px 6px;
    cursor: pointer;
    color: #f3a746;
  }

  a:last-child {
    margin-right: 0px;
  }
`

export const Form = styled.form`
  background-color: #482e5d;
  margin: 0 auto;
  width: 100%;
  max-width: 425px;
`

export const Title = styled.div`
  font-weight: bold;
`

export const FormContent = styled.div`
  flex-direction: column;
  padding: 16px;
  display: flex;
`

export const Label = styled.label`
  margin: 16px 0;
`

export const Input = styled.input`
  background-color: #5c3b77;
  border: 1px solid #9065b3;
  border-radius: 100px;
  padding: 12px 16px;
  color: #ffffff;
  height: 45px;

  &::placeholder {
    color: #ffffff;
  }
`

export const FormFooter = styled.div`
  justify-content: flex-end;
  background-color: #3b264c;
  position: relative;
  display: flex;
  padding: 16px;

  &::before {
    background-color: rgba(200, 169, 255, 0.2);
    position: absolute;
    content: '';
    width: 100%;
    height: 1px;
    left: 0;
    top: 0;
  }
`

export const Button = styled.button`
  background-color: #774c9a;
  border-radius: 100px;
  cursor: pointer;
  color: #ffffff;
  padding: 16px;
  border: none;
`
