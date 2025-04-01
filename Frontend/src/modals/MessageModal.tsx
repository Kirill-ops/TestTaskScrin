import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { useOutsideClickHandler } from '../hooks';
import { Loader } from '../components';

type TypeModal = 'load' | 'success' | 'error';

interface IProps {
  message?: string;
  type: TypeModal;
  onClose?: () => void;
}

function MessageModal(props: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(ref, props.onClose);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      props.onClose?.();
    }
  };

  return (
    <ModalDiv
      tabIndex={0}
      role='button'
      onKeyDown={handleKeyDown}
    >
      {props.type === 'load' && (
        <ModalContentDiv ref={ref}>
          <MessageDiv>Загрузка</MessageDiv>
          <Loader />
          <ModalButton onClick={props.onClose}>Закрыть</ModalButton>
        </ModalContentDiv>
      )}

      {props.type === 'success' && (
        <ModalContentDiv ref={ref}>
          <MessageDiv $colour='success'>{props.message}</MessageDiv>
          <ModalButton onClick={props.onClose}>Закрыть</ModalButton>
        </ModalContentDiv>
      )}

      {props.type === 'error' && (
        <ModalContentDiv ref={ref}>
          <MessageDiv $colour='error'>{props.message}</MessageDiv>

          <ModalButton onClick={props.onClose}>Закрыть</ModalButton>
        </ModalContentDiv>
      )}
    </ModalDiv>
  );
}

interface IMessageDivProps {
  $colour?: 'success' | 'warning' | 'error';
}

function getStyledPropsColour(props: IMessageDivProps): string {
  switch (props.$colour) {
    case 'warning':
      return '#e29b18';
    case 'success':
      return '#1e6922';
    case 'error':
      return '#b1312d';
    default:
      return 'black';
  }
}

const MessageDiv = styled.div<IMessageDivProps>`
  color: ${getStyledPropsColour};
  padding: 10px;
  box-sizing: border-box;
  border: 1px dashed ${getStyledPropsColour};
  > div {
    color: ${getStyledPropsColour};
  }
`;

interface IButtonStyleProps {
  $disabled?: boolean;
}

const ModalButton = styled.button<IButtonStyleProps>`
  padding: 10px;
  font-size: 16px;
  background-color: #1e6922;
  color: aliceblue;
  border: none;
  border-radius: 3px;

  text-align: center;
  user-select: none;

  transition: opacity 0.1s;

  cursor: not-allowed;
  opacity: 0.5;

  ${(p) =>
    !p.$disabled &&
    css`
      cursor: pointer;
      opacity: 1;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.5;
      }
    `}
`;

const ModalContentDiv = styled.div`
  padding: 20px;
  background-color: white;
  width: 400px;

  @media (max-width: 1000px) {
    width: 300px; // На экранах уже 500px — занимает всю ширину
  }

  border-radius: 3px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const ModalDiv = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default MessageModal;
