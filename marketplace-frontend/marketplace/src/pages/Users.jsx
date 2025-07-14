import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/authSlice';

const AllUsers = () => {
  const dispatch = useDispatch();
  const { allUsers, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>All Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {allUsers.map((user) => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
