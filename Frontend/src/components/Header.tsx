import styled from 'styled-components';

interface IProps {
  fonstSize?: number;
  icon?: React.ReactNode;
  value?: string;
}

function Header(props: IProps) {
  return (
    <HeaderDiv>
      {props.icon}
      {props.value}
    </HeaderDiv>
  );
}

interface IHeaderDivProps {
  $fontSize?: number;
}

const HeaderDiv = styled.div<IHeaderDivProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  font-size: ${(p) => (p.$fontSize ? '16px' : p.$fontSize + 'px')};
  font-weight: bold;

  gap: 5px;

  width: 100%;
`;

export default Header;
