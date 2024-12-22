import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/asyncActions/getUsers";

function App() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const getUsers = () => {
    dispatch(fetchUsers());
  };

  return (
    <div>
      {users.length ? (
        users.map((u) => <div>{u.name}</div>)
      ) : (
        <div>Список пользователей пуст</div>
      )}
      <button onClick={getUsers}>Получить пользователей</button>
    </div>
  );
}

export default App;
