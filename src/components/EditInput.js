import React, { forwardRef, useState } from "react";
import styled from "styled-components";

const EditInput = forwardRef(({ title, id, currentValue, limit=8 }, ref) => {

  const [value, setValue] = useState(currentValue ? currentValue : "");
  const inputChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <Container>
      <Label htmlFor={id}>{title}</Label>
      <Input
        type="text"
        ref={ref}
        onChange={(event) => inputChange(event)}
        value={value}
        maxLength={limit}
      />
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 28px;
  padding: 5px 0;
  color: rgb(124, 200, 250);
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid rgb(124, 200, 250);
  font-size: 16px;
  font-weight: 500;
  transition: border-color 300ms ease-in-out;

  &:focus {
    color: rgb(51, 120, 232);
    border-color: rgb(51, 120, 232);
  }
`;

export default EditInput;
