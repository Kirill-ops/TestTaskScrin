import styled from 'styled-components';
import { IScrinTaskFull } from '../models';
import CheckBox from './CheckBox';
import { useImmer } from 'use-immer';
import TextArea from './TextArea';
import { Header } from '.';
import { ApiError, ApiTasks } from '../api';
import { MessageModal } from '../modals';

type Stage = 'load' | 'success' | 'error';

interface IProps {
  task: IScrinTaskFull;
}

interface IState {
  isEdit: boolean;
  description: string;
  isComplete: boolean;
  errorMessage?: string;
  stage?: Stage;
}

function CardTask(props: IProps) {
  const [state, updateState] = useImmer<IState>({
    isEdit: false,
    description: props.task.description,
    isComplete: props.task.isComplete,
  });

  const handleUpdateClick = async () => {
    updateState((x) => {
      x.stage = 'load';
    });
    try {
      await ApiTasks.getInstance().update(
        props.task.id,
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
        x.isComplete = props.task.isComplete;
        x.description = props.task.description;
        x.errorMessage = errorMessage;
      });
    }
  };

  const handleDeleteClick = async () => {
    updateState((x) => {
      x.stage = 'load';
    });
    try {
      await ApiTasks.getInstance().delete(props.task.id);
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
        x.isComplete = props.task.isComplete;
        x.description = props.task.description;
        x.errorMessage = errorMessage;
      });
    }
  };

  let content: React.ReactNode = <div />;

  if (state.isEdit) {
    const disableAddButton = state.description === '';
    content = (
      <div>
        <HeaderDiv>
          <CheckBox
            value={state.isComplete}
            label={
              state.isComplete ? 'Задача выполнена' : 'Задача не выполнена'
            }
            onClick={() => {
              updateState((x) => {
                x.isComplete = !x.isComplete;
              });
            }}
          />
          <CardButton
            $color='cancel'
            onClick={() => {
              updateState((x) => {
                x.isEdit = false;
                x.isComplete = props.task.isComplete;
                x.description = props.task.description;
              });
            }}
          >
            Закрыть
          </CardButton>
        </HeaderDiv>
        <TextArea
          value={state.description}
          onChange={(e) => {
            updateState((x) => {
              x.description = e.target.value;
            });
          }}
          placeholder='Введите описание задачи'
        />
        <ButtonsDiv>
          <CardButton
            $color='cancel'
            onClick={handleDeleteClick}
          >
            Удалить
          </CardButton>
          <CardButton
            disabled={disableAddButton}
            $color='accept'
            onClick={handleUpdateClick}
          >
            Сохранить
          </CardButton>
        </ButtonsDiv>
      </div>
    );
  } else {
    content = (
      <div>
        <HeaderDiv>
          <Header
            icon={
              <i
                className={
                  state.isComplete
                    ? 'bi bi-check-square-fill'
                    : 'bi bi-x-square-fill'
                }
              />
            }
            value={
              state.isComplete ? 'Задача выполнена' : 'Задача не выполнена'
            }
          />
        </HeaderDiv>
        <TextDiv>{state.description}</TextDiv>
      </div>
    );
  }

  return (
    <CardContentDiv
      $isComplete={state.isComplete}
      onClick={
        !state.isEdit
          ? () => {
              updateState((x) => {
                if (!x.isEdit) x.isEdit = true;
              });
            }
          : undefined
      }
    >
      {state.stage === 'load' && (
        <MessageModal
          type='load'
          onClose={() => {
            updateState((x) => {
              x.stage = undefined;
            });
          }}
        />
      )}
      {state.stage === 'success' && (
        <MessageModal
          type='success'
          message='Операция выполнена успешно!'
          onClose={() => {
            window.location.href = '/';
          }}
        />
      )}
      {state.stage === 'error' && (
        <MessageModal
          type='error'
          message={`Ошибка во время выполнения операции. Сообщение: ${state.errorMessage}`}
          onClose={() => {
            updateState((x) => {
              x.stage = undefined;
              x.isEdit = false;
            });
          }}
        />
      )}
      {content}
    </CardContentDiv>
  );
}

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: end;
`;

interface ICardButtonProps {
  $color: 'accept' | 'cancel';
}

function getICardButtonPropsBackgroundColor(props: ICardButtonProps): string {
  switch (props.$color) {
    case 'accept':
      return '#2e74b1';
    case 'cancel':
      return '#f7af4e';
    default:
      return 'black';
  }
}

const CardButton = styled.button<ICardButtonProps>`
  background-color: ${getICardButtonPropsBackgroundColor};
  padding: 5px;
  color: 'black';
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 3px;

  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const TextDiv = styled.div`
  font-size: 16px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  flex-grow: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-size: 16px;
  font-weight: bold;

  gap: 5px;

  width: 100%;
`;

interface ICardContentDivProps {
  $isComplete: boolean;
}

function getStyledPropsColor(props: ICardContentDivProps): string {
  if (props.$isComplete) return '#75a4cd';
  else return '#f5d782';
}

const CardContentDiv = styled.div<ICardContentDivProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: ${getStyledPropsColor};

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    height: 100%;
  }
`;

export default CardTask;
