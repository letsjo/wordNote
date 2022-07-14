import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function getWords() {
  return async (dispatch) => {
    try {
      dispatch({ type: "WORD/REQUEST" });
      const word_data = await getDocs(collection(db, "mydic"));
      let wordData = [];
      word_data.forEach((data) => {
        wordData.push({ id: data.id, ...data.data() });
      });
      dispatch({
        type: "WORD/GET_WORD",
        payload: { wordData },
      });
    } catch (errer) {
      // 에러 핸들링 받는 곳
      dispatch({ type: "WORD/FAILURE" });
    }
  };
}

function addWords(wordData) {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, "mydic"), wordData);
    const new_word = { id: docRef.id, ...wordData.data() };
    dispatch({ type: "WORD/ADD_WORD", payload: new_word });
  };
}

function editWords(wordData) {
  return async (dispatch) => {
    const docRef = doc(db, "mydic", wordData.id);
    updateDoc(docRef, wordData);
    dispatch({ type: "WORD/EDIT_WORD", payload: { wordData } });
  };
}

function doneWords(id,completed) {
  return async (dispatch) => {
    const docRef = doc(db, "mydic", id);
    updateDoc(docRef, completed?{completed:false}:{completed:true});
    dispatch({ type: "WORD/DONE_WORD", payload: { id, completed } });
  };
}

function delWords(id) {
  return async (dispatch) => {
    const docRef = doc(db, "mydic", id);
    deleteDoc(docRef);
    dispatch({ type: "WORD/DEL_WORD", payload: { id } });
  };
}

// const decrypt_PBKDF2 = (text) => {
//   cryptoJs.PBKDF2(text, {words:[process.env.REACT_APP_SALT1,process.env.REACT_APP_SALT2,process.env.REACT_APP_SALT3,process.env.REACT_APP_SALT4]}, {
//     keySize: 512 / 32,
//     // 해시 함수 암호화 과정 1000번 반복
//     iterations: 1000
// }
// }

export const wordAction = {
  getWords,
  addWords,
  editWords,
  doneWords,
  delWords,
};
// useEffect( async() => {
//   // 데이터 가져오기 [ getDocs , getDoc ]
//   // const query = await getDocs(collection(db, "mydic"));
//   // query.forEach((doc)=>{
//   //   console.log(doc.id,doc.data());
// 1  //   buckets.push({...doc.data()});
// 2  //   buckets = [...buckets, {...b.data()}];
//   // });

//   // 데이터 추가하기 [ addDoc ]
//   // addDoc(collection(db,"voca"),{text:"new", completed:false})

//   // 데이터 수정하기 [ updateDoc , doc ]
//   // const docRef = doc(db, "voca", "Ei9ujjYiLmST4dtHBYTg"); // doc 정보 가져오기
//   // updateDoc(docRef, {completed:true});

//   // 데이터 삭제하기 [ deleteDoc , doc ]
//   // const docRef = doc(db, "voca", "Ei9ujjYiLmST4dtHBYTg");
//   // deleteDoc(docRef);

//   // 컬렉션 추가
//   // addDoc(collection(db, "buckets"), {text: "new", completed: true});
// },[]);
