const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const unicafeReducer = (state = initialState, action) => {
  //console.log(action)
  switch (action.type) {
    case "GOOD":
      //initialState={...initialState,good:initialState.good+1}
      return { ...state, good: state.good + 1 };
    case "OK":
      //initialState={...initialState,ok:initialState.ok+1}
      return { ...state, ok: state.ok + 1 };
    case "BAD":
      //initialState={...initialState,bad:initialState.bad+1}
      return { ...state, bad: state.bad + 1 };
    case "ZERO":
      state = initialState;
      return state;
  }
  return state;
};

export default unicafeReducer;
