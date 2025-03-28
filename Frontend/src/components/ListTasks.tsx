import styled from 'styled-components';
import { IScrinTaskFull } from '../models';
import { CardTask } from '.';

interface IProps {
  tasks: IScrinTaskFull[];
}

function ListTasks(props: IProps) {
  return (
    <ListTasksContentDiv>
      {props.tasks.map((x, i) => (
        <CardTask
          task={x}
          key={i}
        />
      ))}
    </ListTasksContentDiv>
  );
}

const ListTasksContentDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  align-items: center;

  width: 100%;

  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ListTasks;
