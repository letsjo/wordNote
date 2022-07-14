import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import EditInput from "../components/EditInput";
import { wordAction } from "../redux/actions/wordAction";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Edit = () => {
  const { wordData } = useSelector((state) => state.wordReducer);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (params.id)
   var arr_data = wordData.find((word) => {
      if (word.id == params.id) return word; 
    });

  useEffect(() => {
    if (arr_data == undefined) navigate("/word/add");
  }, [params.id]);
  
  const wordRef = useRef(null);
  const IPARef = useRef(null);
  const meanRef = useRef(null);
  const exEnRef = useRef(null);
  const exKoRef = useRef(null);

  const validation = () => {
    const word = wordRef.current.value.trim();
    const IPA = IPARef.current.value.trim();
    const mean = meanRef.current.value.trim();
    const ex_En = exEnRef.current.value.trim();
    const ex_ko = exKoRef.current.value.trim();

    if (!word || !IPA || !mean || !ex_En || !ex_ko) {
      return false;
    }

    const wordInfo = {
      word: word,
      IPA: IPA,
      mean: mean,
      exEn: ex_En,
      exKo: ex_ko,
    };

    return wordInfo;
  };

  const updateWord = (event) => {
    event.preventDefault();
    const EditWordData = validation();
    if (EditWordData) {
      const wordData = { ...EditWordData, id: params.id };
      // dispatch({ type: "WORD/EDIT_WORD", payload: { wordData } });
      dispatch(wordAction.editWords(wordData));
      navigate("/");
    } else {
      alert("아직 입력하지 않은 항목이 있습니다.");
    }
  };


  const addWord = (event) => {
    event.preventDefault();
    const newWordData = validation();
    if (newWordData) {
      const wordData = { ...newWordData, date: Date.now(), completed: false };
      dispatch(wordAction.addWords(wordData));
      navigate("/");
    } else {
      alert("아직 입력하지 않은 항목이 있습니다.");
    }
  };

  return (
    <Container>
      <Subtitle>단어 {arr_data ? "수정하기" : "추가하기"}</Subtitle>
      <Form
        onSubmit={(event) => (arr_data ? updateWord(event) : addWord(event))}
      >
        <EditInput
          title="단어"
          id="input-word"
          ref={wordRef}
          currentValue={arr_data && arr_data.word}
          limit={8}
        />
        <EditInput
          title="발음"
          id="input-IPA"
          ref={IPARef}
          currentValue={arr_data && arr_data.IPA}
          limit={16}
        />
        <EditInput
          title="의미"
          id="input-mean"
          ref={meanRef}
          currentValue={arr_data && arr_data.mean}
          limit={1000}
        />
        <EditInput
          title="예문"
          id="input-exEn"
          ref={exEnRef}
          currentValue={arr_data && arr_data.exEn}
          limit={50}
        />
        <EditInput
          title="해석"
          id="input-exKo"
          ref={exKoRef}
          currentValue={arr_data && arr_data.exKo}
          limit={50}
        />
        <SaveBtn>{arr_data ? "수정하기" : "저장하기"}</SaveBtn>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 50px auto;

  @media screen and (min-width: 768px) {
    margin: 80px auto;
  }
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgb(124, 200, 250);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SaveBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgb(47, 128, 181);
  width: 200px;
  height: 40px;
  font-size: 16px;
  align-self: center;
  cursor: pointer;
  &:focus {
    background-color: rgb(51, 120, 232);
  }
  &:hover {
    background-color: rgb(51, 120, 232);
  }
`;

export default Edit;
