import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CreateUser from "./CreateUser";
import { auth } from "./firebase";

interface FormData {
  email: string;
  password: string;
}

interface Props {
  setLoggedIn: React.Dispatch<boolean>;
}

export default function Login({ setLoggedIn }: Props) {
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (creatingAccount)
    return <CreateUser goBack={() => setCreatingAccount(false)} />;

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="email" {...register("email", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setCreatingAccount(true)}>Create account</button>
    </div>
  );
}
