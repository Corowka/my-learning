import { getUsersAction } from "../userReducer";

export const fetchUsers = () => {
  return (dispatch) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => dispatch(getUsersAction(data)));
  };
};
