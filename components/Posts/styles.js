import styled from 'styled-components';

export const Grid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1.5rem;
  align-content: center;
`;

export const LayoutModeToggle = styled.button`
  border: 1px solid #000;
  outline: none;
  background-color: white; 
  color: #000;
  cursor: pointer;
  padding: 8px 12px;

  &:hover {
    background-color: #f2f2f2;
  }
`;