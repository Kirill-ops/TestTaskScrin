import styled from 'styled-components';
import { IScrinTaskFull } from '../models';
import { useState } from 'react';
import { DeleteTaskModal, UpdateTaskModal } from '../modals';

type ModalVariant = 'edit' | 'delete' | 'none';

interface IProps {
  task: IScrinTaskFull;
}

function CardTask(props: IProps) {
  const [modal, setModal] = useState<ModalVariant>('none');

  return (
    <CardContentDiv $isComplete={props.task.isComplete}>
      {modal === 'edit' && (
        <UpdateTaskModal
          taskId={props.task.id}
          onClose={() => {
            setModal('none');
          }}
        />
      )}
      {modal === 'delete' && (
        <DeleteTaskModal
          taskId={props.task.id}
          onClose={() => {
            setModal('none');
          }}
        />
      )}
      <HeaderDiv>
        {props.task.isComplete ? 'Задача выполнена' : 'Задача не выполнена'}
      </HeaderDiv>
      <TextDiv>{props.task.description}</TextDiv>
      <ButtonsDiv>
        <CardButton
          $color='red'
          onClick={() => {
            setModal('delete');
          }}
        >
          Удалить
        </CardButton>
        <CardButton
          $color='green'
          onClick={() => {
            setModal('edit');
          }}
        >
          Изменить
        </CardButton>
      </ButtonsDiv>
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
  $color: 'green' | 'red';
}

function getICardButtonPropsBackgroundColor(props: ICardButtonProps): string {
  switch (props.$color) {
    case 'green':
      return '#2e74b1';
    case 'red':
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
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
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
`;

export default CardTask;
