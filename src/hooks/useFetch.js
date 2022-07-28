import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      isLoading: true,
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      isLoading: false,
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      isLoading: false,
    };
  }

  return state;
}

function useFetch(requestFunction) {
  const [fetchState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
    isLoading: null,
  });

  const sendRequest = useCallback(
    async function (...callData) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(...callData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Fetching has failed on useFetch!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...fetchState,
  };
}

export default useFetch;