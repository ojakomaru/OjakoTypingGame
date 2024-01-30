import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts";

type Props = {
  children: ReactNode;
};
export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return <>{children}</>;
};
