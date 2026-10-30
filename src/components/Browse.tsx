import { User } from "lucide-react";
import Header from "./Header";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUser } from "@/features/users/userSlice";

const Browse = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-end items-center">
      <Header />
      <div className="flex items-center justify-between gap-x-1">
        <img
          src={user?.photoURL ?? undefined}
          alt="user_profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <Button className="my-4" onClick={handleLogout}>
          <User className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default Browse;
