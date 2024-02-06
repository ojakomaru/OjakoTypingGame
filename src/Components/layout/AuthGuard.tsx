import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext, TypingDataContext } from '../../Contexts';
import LoadingSpiner from './LoadingSpiner';

type Props = {
  children: ReactNode;
};
export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext();
  const { loading } = useContext(TypingDataContext);
  const navigate = useNavigate();

  // ユーザーObjectが取得できなかったらログイン画面に戻す
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // タイピングデータを読み込み中はローディングアニメーションを表示
  if (loading) return <LoadingSpiner />;
  return <>{children}</>;
};
