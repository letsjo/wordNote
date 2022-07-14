let initialState = {
  wordData: [],
  loading: true,
};

function wordReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "WORD/REQUEST":
      return { ...state, loading: true };
    case "WORD/GET_WORD":
      state.wordData = payload.wordData;
      return { ...state, loading: false };
    case "WORD/ADD_WORD":
      // state.wordData.push(payload);
      return { ...state };
    case "WORD/EDIT_WORD":
      state.wordData.find((word) => {
        if (word.id === payload.wordData.id) {
          word.word = payload.wordData.word;
          word.IPA = payload.wordData.IPA;
          word.mean = payload.wordData.mean;
          word.exEn = payload.wordData.exEn;
          word.exKo = payload.wordData.exKo;
          return
        }
      });
      return { ...state };
    case "WORD/DONE_WORD":
      state.wordData.find((word) => {
        if (word.id === payload.id) {
          return payload.completed
            ? (word.completed = false)
            : (word.completed = true);
        }
      });
      return { ...state };
    case "WORD/DEL_WORD":
      state.wordData = state.wordData.filter((word) => word.id !== payload.id);
      return { ...state };
    case "WORD/FAILURE":
      return { ...state, loading: false };
    default:
      return { ...state };
  }
}

export default wordReducer;
