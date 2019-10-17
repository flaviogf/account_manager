import styled from 'styled-components'

export const Container = styled.form`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: #482e5d;
  border-radius: 2px;
  max-width: 768px;
  margin: 0 auto;
`

export const Header = styled.div`
  position: relative;
  padding: 16px;

  ::after {
    background-color: rgba(200, 169, 255, 0.2);
    position: absolute;
    display: block;
    height: 1px;
    width: 100%;
    content: '';
    bottom: 0;
    left: 0;
  }
`

export const Content = styled.div`
  padding: 16px;
`

export const Footer = styled.div`
  justify-content: flex-end;
  position: relative;
  display: flex;
  padding: 16px;

  ::before {
    background-color: rgba(200, 169, 255, 0.2);
    position: absolute;
    display: block;
    height: 1px;
    width: 100%;
    content: '';
    left: 0;
    top: 0;
  }
`

export const Title = styled.div`
  text-transform: uppercase;
  color: #f3a746;
`

export const Label = styled.div`
  margin: 5px 0;
`

export const Input = styled.input`
  border: 1px solid #9065b3;
  background-color: #5c3b77;
  border-radius: 100px;
  padding: 0 16px;
  color: #ffffff;
  margin: 5px 0;
  height: 45px;
  width: 100%;

  &::placeholder {
    color: #ffffff;
  }
`

export const Button = styled.button`
  background-color: ${(props) => {
    if (props.info) {
      return '#774c9a'
    }

    return '#2e9e83'
  }};
  border-radius: 100px;
  padding: 12px 16px;
  cursor: pointer;
  color: #ffffff;
  margin: 0 5px;
  border: none;
  width: 100px;
`
