import cryptoJs from "crypto-js";
import React from 'react';
import styled, {css} from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpellCheck, faPenToSquare, faX, } from "@fortawesome/free-solid-svg-icons";
import { wordAction } from "../redux/actions/wordAction";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { salt, password } from "../App";

const WordCard = ({word, IPA, mean, exEn, exKo, completed, id}) => {
  const dispatch = useDispatch();
  const completedBt = (event,id,now_completed) => {
    event.preventDefault();
    dispatch(wordAction.doneWords(id,now_completed))
  }

  const _auth = (text) =>{
    return cryptoJs.PBKDF2(text, salt, {
      keySize: 128 / 32,
    }).words;
  }

  const delBt = (event,id) => {
    event.preventDefault();
    const answer = window.prompt("정말 삭제하시겠습니까? (암호:개발자 생년월일) 카드 삭제하면 치킨 - 선착순 1명")
    if(id && answer && (password == _auth(answer).join(""))){
      dispatch(wordAction.delWords(id));
      alert("카드가 삭제되었습니다.");
    } else {
      alert("비밀번호가 틀립니다.");
    }
  }

  return (
    <Card completed={completed}>
      <WordSet completed={completed}>
        <h4>{word}</h4>
        <span>[ {IPA} ]</span>
        <p>{mean}</p>
        <div>{exEn}</div>
        <div>{exKo}</div>
      </WordSet>
      <BtBox completed={completed}>
        {/* <button className="btCompleted" onClick={() => {dispatch({ type: "WORD/DONE_WORD", payload: {id}})}}> */}
        <button className="btCompleted" onClick={completed?(event) => completedBt(event,id,true): (event) => completedBt(event,id,false)}>
          <FontAwesomeIcon icon={faSpellCheck} />
        </button>
        <Link to={`/word/${id}/edit`}>
          <button className="btEdit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </Link>
        <button className="bnX" onClick={(event) => delBt(event,id)}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </BtBox>
    </Card>
  )
}

const Card = styled.span`
  ${({ completed }) => {
    return css`
      position: relative;
      width: 100%;
      padding: 20px;
      border: 2px solid white;
      border-radius: 10px;
      color: ${completed?"white;":"white;"};
      background-color: ${completed?"rgba(234, 234, 234, 0.603);":"rgba(0, 0, 0, 0.4);"};
      transition: box-shadow 300ms ease-in-out;

      @media screen and (min-width: 768px) {
        width: calc((100% - 110px) / 2);
      }

      @media screen and (min-width: 1024px) {
        width: calc((100% - (90px * 2)) / 3);
      }

      &:hover {
        border-color: rgb(105, 191, 249, 0.5);
        box-shadow: rgb(105, 191, 249, 0.5) 0px 5px 15px 0px;
        color: rgb(124, 200, 250);
        ${WordSet} div{
            color: #c4c8ff;
        }
      }
    `;
  }}
`;

const WordSet = styled.div`
${({ completed }) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    word-break: break-all;

    h4 {
      text-decoration: ${completed?"line-through;":"none;"};
      width:80%;
      margin: auto;
      margin-left: 0px;
      font-size: 24px;
      font-weight: 600;
    }

    span {
      font-size: 14px;
    }

    p {
      margin-bottom: 5px;
      font-size: 16px;
    }

    div {
      font-size: 14px;
    }
  `}
}`;

const BtBox = styled.div`
  ${({ completed }) => {
    return css`
      position: absolute;
      top: 15px;
      right: 15px;
      display: flex;
      align-items: center;

      & button {
        background: transparent;
        border: none;
        font-size: 1.2rem;
        padding: 5px;
        color: ${completed?"rgb(0, 0, 0);":"white;"};
      }

      & > button.btCompleted {
        color: ${completed?"rgb(105, 247, 162);":"white;"};
      }

      
      & > button.btCompleted:hover{
        color: rgb(231, 248, 148);
      }

      & button.btEdit:hover{
        color: rgb(231, 248, 148);
      }

      & > button.bnX:hover{
        color: rgb(250, 124, 124);
      }
    `;
  }}
`;

export default WordCard