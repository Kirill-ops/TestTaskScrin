import styled from 'styled-components';

interface IProps {
  onClick: () => void;
  label?: string;
  value: boolean;
}

function CheckBox(props: IProps) {
  return (
    <InputCheckBoxDiv onClick={props.onClick}>
      <CheckBoxDiv $color={props.value ? 'green' : 'red'}>
        <i
          className={
            props.value ? 'bi bi-check-square-fill' : 'bi bi-x-square-fill'
          }
        />
      </CheckBoxDiv>
      <LabelDiv>{props.label}</LabelDiv>
    </InputCheckBoxDiv>
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
  background-color: #fffef0;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
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

export default CheckBox;
