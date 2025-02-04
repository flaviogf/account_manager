import styled from 'styled-components'

export const Container = styled.div`
  padding: 16px;
`

export const Links = styled.div`
  justify-content: flex-end;
  max-width: 425px;
  margin: 0 auto;
  display: flex;

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
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: #482e5d;
  flex-direction: column;
  border-radius: 2px;
  max-width: 425px;
  margin: 0 auto;
  display: flex;
`

export const FormContent = styled.div`
  flex-direction: column;
  padding: 16px;
  display: flex;
`

export const FormFooter = styled.div`
  justify-content: flex-end;
  background-color: #3b264c;
  display: flex;
  padding: 16px;
`

export const Title = styled.h2`
  font-weight: bold;
`

export const Label = styled.label`
  margin: 16px 0px;
`

export const Input = styled.input`
  background-color: #5c3b77;
  border: 1px solid #9065b3;
  border-radius: 100px;
  padding: 0 16px;
  color: #ffffff;
  height: 45px;

  &::placeholder {
    color: #ffffff;
  }
`

export const Button = styled.button`
  background-color: #774c9a;
  border-radius: 100px;
  padding: 12px 16px;
  cursor: pointer;
  color: #ffffff;
  border: none;
`
