import Login from "./Login";
import Browse from "./Browse";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch } from "@/hooks/useRedux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { addUser, removeUser } from "@/features/users/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);

const Body = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        dispatch(
          addUser({
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
          }),
        );
      } else {
        dispatch(removeUser());
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Body;
