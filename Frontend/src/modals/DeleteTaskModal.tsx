import { useRef } from 'react';
import styled, { css } from 'styled-components';
import { useOutsideClickHandler } from '../hooks';
import { ApiError, ApiTasks } from '../api';
import { useImmer } from 'use-immer';
import { Loader } from '../components';

interface IProps {
  taskId: string;
  onClose?: () => void;
}

type Stage = 'load' | 'success' | 'error' | 'add';

interface IState {
  errorMessage?: string;
  stage: Stage;
}

function DeleteTaskModal(props: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(ref, props.onClose);

  const [state, updateState] = useImmer<IState>({
    stage: 'add',
  });

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      props.onClose?.();
    }
  };

  const handleDeleteClick = async () => {
    updateState((x) => {
      x.stage = 'load';
    });
    try {
      await ApiTasks.getInstance().delete(props.taskId);
      updateState((x) => {
        x.stage = 'success';
      });
    } catch (e) {
      let errorMessage: string | undefined = undefined;
      if (e instanceof ApiError) {
        errorMessage = e.message;
      }
      updateState((x) => {
        x.stage = 'error';
        x.errorMessage = errorMessage;
      });
    }
  };

  return (
    <ModalDiv
      tabIndex={0}
      role='button'
      onKeyDown={handleKeyDown}
    >
      {state.stage === 'load' && (
        <ModalContentDiv ref={ref}>
          <MessageDiv>Загрузка</MessageDiv>
          <Loader />
        </ModalContentDiv>
      )}

      {state.stage === 'success' && (
        <ModalContentDiv ref={ref}>
          <MessageDiv $color='success'>Задача удалена</MessageDiv>
          <ModalButton
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Закрыть
          </ModalButton>
        </ModalContentDiv>
      )}

      {state.stage === 'error' && (
        <ModalContentDiv ref={ref}>
          <MessageDiv $color='error'>
            <div>Ошибка во время удаления задачи</div>
            <div>Сообщение: {state.errorMessage ?? '-'}</div>
          </MessageDiv>

          <ModalButton onClick={props.onClose}>Закрыть</ModalButton>
        </ModalContentDiv>
      )}

      {state.stage === 'add' && (
        <ModalContentDiv ref={ref}>
          <LabelDiv>Вы действительно хотите удалить задачу?</LabelDiv>

          <ButtonsDiv>
            <ModalButton
              $color={'red'}
              onClick={handleDeleteClick}
            >
              Удалить
            </ModalButton>
            <ModalButton
              $color={'green'}
              onClick={props.onClose}
            >
              Отмена
            </ModalButton>
          </ButtonsDiv>
        </ModalContentDiv>
      )}
    </ModalDiv>
  );
}

interface IMessageDivProps {
  $color?: 'success' | 'warning' | 'error';
}

function getStyledPropsColor(props: IMessageDivProps): string {
  switch (props.$color) {
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
  color: ${getStyledPropsColor};
  padding: 10px;
  box-sizing: border-box;
  border: 1px dashed ${getStyledPropsColor};
  > div {
    color: ${getStyledPropsColor};
  }
`;

interface IButtonStyleProps {
  $disabled?: boolean;
  $color?: 'red' | 'green';
}

const ModalButton = styled.button<IButtonStyleProps>`
  padding: 10px;
  font-size: 16px;
  background-color: ${(p) => p.$color ?? 'green'};
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

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const LabelDiv = styled.div`
  color: black;
  font-size: 16px;
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

export default DeleteTaskModal;
