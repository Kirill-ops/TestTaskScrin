import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { MessageModal } from './modals';
import { IScrinTaskFull } from './models';
import { useEffect } from 'react';
import { ApiError, ApiTasks } from './api';
import { CheckBox, ListTasks, Loader, TextArea } from './components';

type ModalVariant = 'load' | 'success' | 'error';
type PageVariant = 'tasks' | 'error' | 'load';
type FilterComplete = 'complete' | 'notСomplete' | 'all';
type Stage = 'load' | 'tasks';

interface IState {
  modalVariant?: ModalVariant;
  description: string;
  pageVariant: PageVariant;
  stage: Stage;
  tasks: IScrinTaskFull[];
  errorMessage?: string;
  filterComplete: FilterComplete;
}

function App() {
  const [state, updateState] = useImmer<IState>({
    pageVariant: 'load',
    stage: 'load',
    tasks: [],
    description: '',
    filterComplete: 'all',
  });

  const loadTasks = async () => {
    updateState((x) => {
      x.stage = 'load';
    });
    try {
      let filter: boolean | undefined = undefined;

      if (state.filterComplete === 'complete') filter = true;
      else if (state.filterComplete === 'notСomplete') filter = false;

      const tasks = await ApiTasks.getInstance().getAll(filter);
      updateState((x) => {
        x.tasks = tasks;
        x.pageVariant = 'tasks';
        x.stage = 'tasks';
      });
    } catch (e) {
      let errorMessage: string | undefined = undefined;
      if (e instanceof ApiError) {
        errorMessage = e.message;
      }
      updateState((x) => {
        x.pageVariant = 'error';
        x.errorMessage = errorMessage;
      });
    }
  };

  const handleAddClick = async () => {
    updateState((x) => {
      x.modalVariant = 'load';
    });
    try {
      await ApiTasks.getInstance().create(state.description);
      updateState((x) => {
        x.modalVariant = 'success';
      });
    } catch (e) {
      let errorMessage: string | undefined = undefined;
      if (e instanceof ApiError) {
        errorMessage = e.message;
      }
      updateState((x) => {
        x.modalVariant = 'error';
        x.errorMessage = errorMessage;
      });
    }
  };

  useEffect(() => {
    loadTasks();
  }, [state.filterComplete]);

  const disableAddButton = state.description === '';

  return (
    <AppDiv>
      <FillerDiv />

      {state.pageVariant === 'load' && (
        <LoadContainerDiv>
          <HeaderH1>Загрузка задач</HeaderH1>
          <Loader />
        </LoadContainerDiv>
      )}

      {state.pageVariant === 'error' && (
        <ErrorContentDiv>
          <HeaderH1>Упс, похоже произошла ошибка</HeaderH1>
          <div>
            {state.errorMessage ??
              'Здесь должно было быть сообщение, но его нет'}
          </div>
          <div>
            Пожалуйста, обратитесь в службу поддерж... ах да, её ведь нет, пу пу
            пу, тогда обратитесь к нему
          </div>
          <i
            className='bi bi-telegram'
            onClick={() => {
              window.location.href = 'https://t.me/I_am_so_damn_happy';
            }}
          ></i>
        </ErrorContentDiv>
      )}

      {state.pageVariant === 'tasks' && (
        <ContentDiv>
          {state.modalVariant === 'load' && (
            <MessageModal
              type='load'
              onClose={() => {
                updateState((x) => {
                  x.modalVariant = undefined;
                });
              }}
            />
          )}
          {state.modalVariant === 'success' && (
            <MessageModal
              type='success'
              message='Операция выполнена успешно!'
              onClose={() => {
                window.location.href = '/';
              }}
            />
          )}
          {state.modalVariant === 'error' && (
            <MessageModal
              type='error'
              message={`Ошибка во время выполнения операции. Сообщение: ${state.errorMessage}`}
              onClose={() => {
                updateState((x) => {
                  x.modalVariant = undefined;
                });
              }}
            />
          )}

          <HeaderDiv>
            <HeaderH1>Задачи</HeaderH1>
          </HeaderDiv>
          <AddInputContentDiv>
            <TextArea
              value={state.description}
              placeholder='Введите текст задачи'
              onChange={(e) => {
                updateState((x) => {
                  x.description = e.target.value;
                });
              }}
              onBlur={() => {
                updateState((x) => {
                  x.description = x.description.trim();
                });
              }}
            />
            <AppButton
              onClick={handleAddClick}
              disabled={disableAddButton}
            >
              <div>Добавить</div>
              <div>
                <i className='bi bi-plus-lg' />
              </div>
            </AppButton>
          </AddInputContentDiv>
          <FilterTasksDiv>
            <CheckBox
              value={state.filterComplete === 'all'}
              label='Все'
              onClick={() => {
                updateState((x) => {
                  x.filterComplete = 'all';
                });
              }}
            />
            <CheckBox
              value={state.filterComplete === 'complete'}
              label='Только выполненные'
              onClick={() => {
                updateState((x) => {
                  x.filterComplete = 'complete';
                });
              }}
            />
            <CheckBox
              value={state.filterComplete === 'notСomplete'}
              label='Только невыполненные'
              onClick={() => {
                updateState((x) => {
                  x.filterComplete = 'notСomplete';
                });
              }}
            />
          </FilterTasksDiv>
          {state.stage === 'tasks' && <ListTasks tasks={state.tasks} />}
          {state.stage === 'load' && (
            <LoadContainerDiv>
              <HeaderH1>Загрузка задач</HeaderH1>
              <Loader />
            </LoadContainerDiv>
          )}
        </ContentDiv>
      )}
      <FillerDiv />
    </AppDiv>
  );
}

const AddInputContentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const FilterTasksDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
`;

const AppButton = styled.button`
  display: flex;
  flex-direction: row;
  height: 40px;
  gap: 5px;
  padding: 10px;
  font-size: 14px;
  background-color: #ef931c;
  align-items: center;
  border: none;

  border-radius: 3px;

  > i {
    font-size: 14px;
    color: #2c2c2c;
  }

  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const HeaderH1 = styled.h1`
  color: aliceblue;
  font-size: 24px;
  margin: 0;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const FillerDiv = styled.div`
  display: flex;
  flex-grow: 1;
`;

const LoadContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 10px;
  width: 100%;
  color: aliceblue;
  font-size: 16px;
`;

const ErrorContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 10px;
  padding: 20px;

  color: aliceblue;
  font-size: 16px;
  > i {
    font-size: 100px;
    color: #39bdff;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 0.5;
    }
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  align-items: start;
  gap: 20px;
`;

const AppDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #383838;
  align-items: center;
`;

export default App;
