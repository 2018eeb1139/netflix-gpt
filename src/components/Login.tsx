import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { signInSchema, type FormValues } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppDispatch } from "@/hooks/useRedux";
import { addUser } from "@/features/users/userSlice";

const Login = () => {
  const [isRemember, setIsRemember] = useState(false);
  const [isSignInForm, setIsSignInForm] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      passwrord: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (isSignInForm) {
        await signInWithEmailAndPassword(auth, data.email, data.passwrord);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.passwrord,
        );
        const user = userCredential.user;
        console.log(user);
        await updateProfile(user, {
          displayName: data.fullName || "Jane Query",
          photoURL: "https://github.com/shadcn.png",
        });
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
      }
      navigate("/browse");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          setError("root", {
            type: "firebase",
            message: "Invalid Email or Password",
          });
          return;
        }
        if (error.code === "auth/email-already-in-use") {
          setError("root", {
            type: "firebase",
            message: "Email already exists",
          });
          return;
        }
      }
      setError("root", {
        type: "firebase",
        message: "Something went wrong. Please try again!",
      });
    }
  };

  const handleSign = () => {
    setIsSignInForm((prev) => !prev);
    reset();
  };

  return (
    <div className="bg-black">
      <div className="bg-[url('src/assets/bg-image.jpg')] bg-cover bg-center w-full min-h-screen flex justify-center items-center relative opacity-80">
        <Header />

        <form
          className="bg-black/80 text-white flex flex-col p-12 rounded-lg gap-4 w-full max-w-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <Input
              {...register("fullName")}
              placeholder="Full Name"
              className="bg-gray-700 py-6 px-4 rounded-sm placeholder:text-white/60 outline-none border-none active:outline-none active:border-none focus-visible::outline-none focus-visible:ring-0"
            />
          )}
          {!isSignInForm && errors?.fullName && (
            <p className="text-[#c11119] text-sm">{errors.fullName.message}</p>
          )}

          <Input
            {...register("email")}
            placeholder="Email or phone number"
            className="bg-gray-700 py-6 px-4 rounded-sm placeholder:text-white/60 outline-none border-none active:outline-none active:border-none focus-visible::outline-none focus-visible:ring-0"
          />
          {errors?.email && (
            <p className="text-[#c11119] text-sm">{errors.email.message}</p>
          )}

          <Input
            {...register("passwrord")}
            placeholder="Password"
            className="bg-gray-700 py-6 px-4 rounded-sm placeholder:text-white/60 outline-none border-none active:outline-none active:border-none focus-visible::outline-none focus-visible:ring-0"
          />
          {errors?.passwrord && (
            <p className="text-[#c11119] text-sm">{errors.passwrord.message}</p>
          )}

          <Button
            type="submit"
            className="bg-[#c11119] font-semibold py-6 hover:bg-[#c11119] cursor-pointer rounded-sm mt-6"
            disabled={isSubmitting}
          >
            {isSignInForm
              ? isSubmitting
                ? "Signing In... "
                : "Sign In"
              : isSubmitting
                ? "Signing Up... "
                : "Sign Up"}
            {isSubmitting && <Loader className="animate-spin" />}
          </Button>
          {errors?.root && (
            <p className="text-[#c11119] text-sm">{errors.root.message}</p>
          )}
          {isSignInForm && (
            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox"
                name="terms-checkbox"
                onCheckedChange={setIsRemember}
                className="data-checked:bg-[#c11119] data-checked:border-[#C11119]"
              />
              <Label htmlFor="terms-checkbox">Remember Me</Label>
            </Field>
          )}

          <div className="mt-18">
            <h1 className="text-sm">
              {isSignInForm ? "New to Netflix?" : "Already Signed In?"}{" "}
              <span
                className="text-lg font-bold cursor-pointer"
                onClick={handleSign}
              >
                {isSignInForm ? "Sign Up Now" : "Sign In"}
              </span>
            </h1>
            <p className="text-xs my-4">
              This Page is protected by Google reCAPTCHA to ensure that you are
              not a bot.{" "}
              <span className="text-blue-400 cursor-pointer">Learn More</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
