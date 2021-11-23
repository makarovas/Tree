import axios from "axios";
import { FETCH_DATA, FETCH_DATA_ERROR, IS_DATA_LOADING } from "./types";
import { alert } from "./../Story/alert";

export const fetchData = () => (dispatch) => {
  dispatch({ type: IS_DATA_LOADING });
  axios
    .get("http://localhost:3002/api/tree")
    .then((response) => {
      dispatch({ type: FETCH_DATA, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) alert(error.response.data, "error");
      dispatch({ type: FETCH_DATA_ERROR });
    });
};
