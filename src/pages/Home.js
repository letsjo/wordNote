import React, { useEffect } from "react";
import styled from "styled-components";
import WordCard from "../components/WordCard";
import { wordAction } from "../redux/actions/wordAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { wordData, loading } = useSelector((state) => state.wordReducer);

  useEffect(() => {
    dispatch(wordAction.getWords());
  }, []);

  if (loading) {
    return <SpinnerWrap><ClipLoader color="#ffff" loading={loading} size={150}/></SpinnerWrap>;
  } else
  return (
    <HomeWrap>
      <Cards>
        {wordData &&
          wordData.map((data, index) => (
            <WordCard
              key={index}
              word={data.word}
              IPA={data.IPA}
              mean={data.mean}
              exEn={data.exEn}
              exKo={data.exKo}
              completed={data.completed}
              id={data.id}
            />
          ))}
      </Cards>
      <BtZone to="/word/add">
        <Plus icon={faCirclePlus} />
      </BtZone>
    </HomeWrap>
  );
};

const HomeWrap = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;

  @media screen and (min-width: 1024px) {
    max-width: 1400px;
    margin: 0px auto;
  }

  @media screen and (min-width: 768px) {
    margin-top: 0px;
    padding: 0px 20px;
  }
`;

const SpinnerWrap = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
  width: 100%;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1024px) {
    max-width: 1400px;
    margin: 60px auto 0px;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
  padding: 4rem 0;
`;

const BtZone = styled(Link)`
  position: fixed;
  bottom: 15px;
  right: 15px;
  border-radius: 50px;
`;

const Plus = styled(FontAwesomeIcon)`
  color: #c4c8ff;
  background-color: transparent;
  border-radius: 50px;
  font-size: 75px;
  transition: transform 300ms ease-in-out;
  &:hover {
    transform: rotate(180deg);
    box-shadow: #c4c8ff 0px 5px 25px 0px;
  }
`;

export default Home;
