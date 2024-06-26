import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth";
import { AsyncTaskStatusEnum } from "../../constants/asyncTask";

const SessionHandler = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const refreshSession = async () => {
      try {
        dispatch({ type: "auth/refresh/pending" });
        const response = await axios.get("http://localhost:5000/refresh", {
          withCredentials: true,
        });
        console.log(response);
        dispatch(
          setUser({
            username: "",
            id: null,
            email: response.data.user.email,
          })
        );
      } catch (error) {
        console.log("Session refresh failed", error);
        // navigate("/login", { replace: true });
      } finally {
        dispatch({
          type: "auth/refresh/fulfilled",
        });
        setLoading(false);
      }
    };
    refreshSession();
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return status === AsyncTaskStatusEnum.Loading ? (
    <div>Loading</div>
  ) : (
    <Outlet />
  ); // This component does not render anything
};

export default SessionHandler;
