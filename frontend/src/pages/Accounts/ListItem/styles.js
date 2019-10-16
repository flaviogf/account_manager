import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${(props) => {
    if (props.danger) {
      return '#ba4155'
    }

    if (props.info) {
      return '#774c9a'
    }

    if (props.warning) {
      return '#FFBC5D'
    }

    return '#2e9e83'
  }};
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  min-width: 75px;
  padding: 6px;
  border: none;
  color: white;
  flex: 1;

  &:last-child {
    margin-right: 0px;
  }
`
