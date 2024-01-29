import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts";

type Props = {
  children: ReactNode;
};
export const AuthGuard = ({ children }: Props) => {
  const { user, isAuthLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isAuthLoading) {
      navigate("/");
    }
  }, [user]);

  return <>{children}</>;
};
