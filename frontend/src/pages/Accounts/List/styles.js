import styled from 'styled-components'

export const Container = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: #482e5d;
  border-radius: 2px;
  margin: 16px auto;
  max-width: 768px;
  overflow: hidden;
  width: 100%;
`

export const Header = styled.div`
  padding: 16px;
`

export const Input = styled.input`
  border: 1px solid #9065b3;
  background-color: #5c3b77;
  border-radius: 100px;
  padding: 12px 16px;
  color: #ffffff;
  height: 45px;
  width: 100%;

  &::placeholder {
    color: #ffffff;
  }
`

export const Content = styled.div`
  overflow: auto;
`

export const Table = styled.table`
  margin: 8px 0 16px 0;
  width: 100%;

  th,
  td {
    min-width: 200px;
    padding: 8px 0;
  }

  th:first-child,
  th:last-child,
  td:first-child,
  td:last-child {
    padding-right: 16px;
    padding-left: 16px;
  }

  th:last-child {
    text-align: right;
  }

  td:last-child {
    justify-content: space-around;
    display: flex;
  }
`

export const Footer = styled.div`
  background-color: #3b264c;
  position: relative;
  padding: 16px;

  &::before {
    background-color: rgba(200, 169, 255, 0.2);
    position: absolute;
    width: 100%;
    content: '';
    height: 1px;
    left: 0;
    top: 0;
  }
`

export const LoadMoreButton = styled.button`
  background-color: #774c9a;
  border-radius: 100px;
  cursor: pointer;
  margin: 0 auto;
  color: #ffffff;
  padding: 16px;
  border: none;
  width: 100%;
`
