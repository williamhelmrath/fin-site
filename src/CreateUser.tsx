import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import keys from "./keys";

interface FormData {
  email: string;
  password: string;
}

interface AirtableResponse {
  records: object[];
}

interface Props {
  goBack: () => void;
}

const CreateUser = ({ goBack }: Props) => {
  const [needPassword, setNeedPassword] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const { register, handleSubmit } = useForm<FormData>();

  const checkEmail = async (email: string) => {
    const info = await fetch(
      `https://api.airtable.com/v0/${keys.airtable.baseId}/${keys.airtable.tableName}?api_key=${keys.airtable.key}&fields%5B%5D=Email&filterByFormula=Email%3D%22${email}%22`
    );
    const json: AirtableResponse = await info.json();

    if (json.records.length === 0) {
      setError(true);
      console.error("email does not exist");
    } else {
      setNeedPassword(true);
      setEmail(email);
    }
  };

  const createUser = (password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((err) => {
        const errorCode = err.code;
        if (errorCode === "auth/weak-password")
          alert("Password must be at least 6 characters");
        else alert(err.message);
      });
  };

  const onSubmit = async (data: FormData) => {
    if (!needPassword) await checkEmail(data.email);
    else createUser(data.password);
  };

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
        <input type="email" disabled={needPassword} {...register("email")} />
        <input
          type="password"
          disabled={!needPassword}
          {...register("password")}
        />

        <button type="submit">Create Account</button>
      </form>
      <button onClick={goBack}>Go back</button>
    </div>
  );
};

export default CreateUser;
