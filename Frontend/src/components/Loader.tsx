import styled, { keyframes } from 'styled-components';

function Loader() {
  return (
    <DotLoader>
      <Dot delay='0s' />
      <Dot delay='0.2s' />
      <Dot delay='0.4s' />
    </DotLoader>
  );
}

// Анимация пульсации (для точек)
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Стилизованный компонент для точечного лоадера
const DotLoader = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const Dot = styled.div<{ delay: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffee00;
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
`;

export default Loader;
