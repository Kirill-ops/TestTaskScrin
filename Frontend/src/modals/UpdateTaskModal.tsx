import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useOutsideClickHandler } from '../hooks';
import { ApiError, ApiTasks } from '../api';
import { useImmer } from 'use-immer';
import { Loader } from '../components';

interface IProps {
  taskId: string;
  onClose?: () => void;
}

type Stage = 'load' | 'success' | 'error' | 'errorLoad' | 'edit';

interface IState {
  description: string;
  isComplete: boolean;
  errorMessage?: string;
  stage: Stage;
}

function UpdateTaskModal(props: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(ref, props.onClose);

  const [state, updateState] = useImmer<IState>({
    description: '',
    isComplete: false,
    stage: 'load',
  });

  const loadTask = async () => {
    updateState((x) => {
      x.stage = 'load';
    });
    try {
      const task = await ApiTasks.getInstance().getById(props.taskId);
      updateState((x) => {
        x.description = task.description;
        x.isComplete = task.isComplete;
        x.stage = 'edit';
      });
    } catch (e) {
      let errorMessage: string | undefined = undefined;
      if (e instanceof ApiError) {
        errorMessage = e.message;
      }
      updateState((x) => {
        x.stage = 'errorLoad';
        x.errorMessage = errorMessage;
      });
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      props.onClose?.();
    }
  };

  const handleUpdateClick = async () => {
    updateState((x) => {
      x.stage = 'load';
    });
    try {
      await ApiTasks.getInstance().update(
        props.taskId,
        state.description,
        state.isComplete
      );
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

  const disableAddButton = state.description === '';

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
          <MessageDiv $colour='success'>Задача успешно обновлена</MessageDiv>
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
          <MessageDiv $colour='error'>
            <div>Ошибка во время обновления задачи</div>
            <div>Сообщение: {state.errorMessage ?? '-'}</div>
          </MessageDiv>

          <ModalButton onClick={props.onClose}>Закрыть</ModalButton>
        </ModalContentDiv>
      )}

      {state.stage === 'errorLoad' && (
        <ModalContentDiv ref={ref}>
          <MessageDiv $colour='error'>
            <div>Ошибка во время загрузки задачи</div>
            <div>Сообщение: {state.errorMessage ?? '-'}</div>
          </MessageDiv>

          <ModalButton onClick={props.onClose}>Закрыть</ModalButton>
        </ModalContentDiv>
      )}

      {state.stage === 'edit' && (
        <ModalContentDiv ref={ref}>
          <InputsDiv>
            <InputDiv>
              <LabelDiv>Описание задачи</LabelDiv>
              <InputTextArea
                placeholder='Введите описание задачи'
                value={state.description}
                onChange={(e) => {
                  updateState((x) => {
                    x.description = e.target.value;
                  });
                }}
              />
            </InputDiv>
            <InputCheckBoxDiv>
              <CheckBoxDiv
                $color={state.isComplete ? 'green' : 'red'}
                onClick={() => {
                  updateState((x) => {
                    x.isComplete = !x.isComplete;
                  });
                }}
              >
                <i
                  className={
                    state.isComplete
                      ? 'bi bi-check-square-fill'
                      : 'bi bi-x-square-fill'
                  }
                />
              </CheckBoxDiv>
              <LabelDiv>
                {state.isComplete ? 'Задача выполнена' : 'Задача не выполнена'}
              </LabelDiv>
            </InputCheckBoxDiv>
          </InputsDiv>
          <ButtonsDiv>
            <ModalButton
              $disabled={disableAddButton}
              onClick={disableAddButton ? undefined : handleUpdateClick}
            >
              Обновить
            </ModalButton>
            {disableAddButton && (
              <MessageDiv $colour='warning'>
                Пожалуйста, введите описание задачи
              </MessageDiv>
            )}
          </ButtonsDiv>
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

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

interface IInputCheckBoxDivProps {
  $color: 'red' | 'green';
}

const InputCheckBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const CheckBoxDiv = styled.div<IInputCheckBoxDivProps>`
  > i {
    font-size: 20px;
    color: ${(p) => p.$color};
  }
`;

const InputTextArea = styled.textarea`
  min-height: 100px;
  min-width: 400px;
  max-width: 400px;

  @media (max-width: 1000px) {
    min-width: 280px;
    max-width: 280px;
  }

  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  height: 19px;

  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.2) inset;

  cursor: text;

  &[type='text'] {
    cursor: text;
  }
  &[type='password'] {
    cursor: text;
  }
`;

const LabelDiv = styled.div`
  color: black;
  font-size: 14px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export default UpdateTaskModal;
