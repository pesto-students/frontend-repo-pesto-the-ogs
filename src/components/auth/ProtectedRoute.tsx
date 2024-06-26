import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { AsyncTaskStatusEnum } from "../../constants/asyncTask";
import { useEffect } from "react";
import Layout from "../layout";

const ProtectedRoute = () => {
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log("User in ProtectedRoute:", auth.user);
  }, [auth]);

  if (auth.status === AsyncTaskStatusEnum.Loading) {
    return <div>Loading...</div>;
  }

  return auth.user?.email ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
