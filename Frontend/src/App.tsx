import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { AddTaskModal } from './modals';
import { IScrinTaskFull } from './models';
import { useEffect } from 'react';
import { ApiError, ApiTasks } from './api';
import { ListTasks, Loader } from './components';

type ModalVariant = 'add';
type PageVariant = 'tasks' | 'error' | 'load';
type FilterComplete = 'complete' | 'notСomplete' | 'all';

interface IState {
  modalVariant?: ModalVariant;
  pageVariant: PageVariant;
  tasks: IScrinTaskFull[];
  errorMessage?: string;
  filterComplete: FilterComplete;
}

function App() {
  const [state, updateState] = useImmer<IState>({
    pageVariant: 'load',
    tasks: [],
    filterComplete: 'all',
  });

  const loadTasks = async () => {
    updateState((x) => {
      x.pageVariant = 'load';
    });
    try {
      let filter: boolean | undefined = undefined;

      if (state.filterComplete === 'complete') filter = true;
      else if (state.filterComplete === 'notСomplete') filter = false;

      const tasks = await ApiTasks.getInstance().getAll(filter);
      updateState((x) => {
        x.tasks = tasks;
        x.pageVariant = 'tasks';
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

  useEffect(() => {
    loadTasks();
  }, [state.filterComplete]);

  return (
    <AppDiv>
      {state.modalVariant === 'add' && (
        <AddTaskModal
          onClose={() => {
            updateState((x) => {
              x.modalVariant = undefined;
            });
          }}
        />
      )}

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
          <HeaderDiv>
            <HeaderH1>Задачи</HeaderH1>
            <AppButton
              onClick={() => {
                updateState((x) => {
                  x.modalVariant = 'add';
                });
              }}
            >
              <div>Добавить</div>
              <div>
                <i className='bi bi-plus-lg' />
              </div>
            </AppButton>
          </HeaderDiv>
          <FilterInputsDiv>
            <InputCheckBoxDiv>
              <CheckBoxDiv
                $color={state.filterComplete === 'all' ? 'green' : 'red'}
                onClick={() => {
                  updateState((x) => {
                    x.filterComplete = 'all';
                  });
                }}
              >
                <i
                  className={
                    state.filterComplete === 'all'
                      ? 'bi bi-check-square-fill'
                      : 'bi bi-x-square-fill'
                  }
                />
              </CheckBoxDiv>
              <LabelDiv>Все</LabelDiv>
            </InputCheckBoxDiv>
            <InputCheckBoxDiv>
              <CheckBoxDiv
                $color={state.filterComplete === 'complete' ? 'green' : 'red'}
                onClick={() => {
                  updateState((x) => {
                    x.filterComplete = 'complete';
                  });
                }}
              >
                <i
                  className={
                    state.filterComplete === 'complete'
                      ? 'bi bi-check-square-fill'
                      : 'bi bi-x-square-fill'
                  }
                />
              </CheckBoxDiv>
              <LabelDiv>Только выполненные</LabelDiv>
            </InputCheckBoxDiv>
            <InputCheckBoxDiv>
              <CheckBoxDiv
                $color={
                  state.filterComplete === 'notСomplete' ? 'green' : 'red'
                }
                onClick={() => {
                  updateState((x) => {
                    x.filterComplete = 'notСomplete';
                  });
                }}
              >
                <i
                  className={
                    state.filterComplete === 'notСomplete'
                      ? 'bi bi-check-square-fill'
                      : 'bi bi-x-square-fill'
                  }
                />
              </CheckBoxDiv>
              <LabelDiv>Только невыполненные</LabelDiv>
            </InputCheckBoxDiv>
          </FilterInputsDiv>
          <ListTasks tasks={state.tasks} />
        </ContentDiv>
      )}
      <FillerDiv />
    </AppDiv>
  );
}

interface IInputCheckBoxDivProps {
  $color: 'red' | 'green';
}

const InputCheckBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  background-color: aliceblue;
  padding: 5px;
  border-radius: 3px;
`;

const CheckBoxDiv = styled.div<IInputCheckBoxDivProps>`
  font-size: 16px;
  > i {
    font-size: 20px;
    color: ${(p) => p.$color};
  }
`;

const LabelDiv = styled.div`
  color: black;
  font-size: 14px;
`;

const FilterInputsDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
`;

const AppButton = styled.button`
  display: flex;
  flex-direction: row;
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
