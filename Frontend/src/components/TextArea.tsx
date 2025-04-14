import styled from 'styled-components';

interface IProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

function TextArea(props: IProps) {
  return (
    <InputTextArea
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
    />
  );
}

const InputTextArea = styled.textarea`
  resize: vertical;
  min-height: 40px;
  flex-grow: 1;

  border: none;
  background-color: fffef0;
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

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default TextArea;
