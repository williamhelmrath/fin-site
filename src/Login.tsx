import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CreateUser from "./CreateUser";
import { Button, FormField, Main, Text, TextInput } from "grommet";
import { auth } from "./firebase";

interface FormData {
  email: string;
  password: string;
}

interface Props {
  logIn: () => void;
}

export default function Login({ logIn }: Props) {
  const [creatingAccount, setCreatingAccount] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logging in...");
        logIn();
      })
      .catch((err) => {
        console.log(err.message);
        alert("User not found.");
      });
  };

  if (creatingAccount)
    return (
      <CreateUser goBack={() => setCreatingAccount(false)} logIn={logIn} />
    );

  return (
    <Main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
      }}
      pad="small"
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 300,
          padding: "1.5rem",
          border: "1px solid black",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField>
          <TextInput
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
        </FormField>
        <FormField>
          <TextInput
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
        </FormField>
        <Button primary label="Log In" type="submit" />
      </form>
      <Text margin={{ top: "1rem" }}>
        If you are part of Forge's Internal Networking Community but haven't
        visited this site before, please create an account.
      </Text>
      <Button
        secondary
        label="Create Account"
        onClick={() => setCreatingAccount(true)}
        margin={{ top: "0.5rem" }}
      />
    </Main>
  );
}
