import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import keys from "./keys";
import { Button, FormField, Main, Text, TextInput } from "grommet";

interface FormData {
  email: string;
  password: string;
}

interface AirtableResponse {
  records: object[];
}

interface Props {
  goBack: () => void;
  logIn: () => void;
}

const CreateUser = ({ goBack, logIn }: Props) => {
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
      setError(false);
    }
  };

  const createUser = (password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        logIn();
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
    <Main margin={{ top: "20px" }} pad="small">
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 1100,
            margin: "auto",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Text>
            First, we need to verify your email to confirm that you're a part of
            our community.
          </Text>
          <FormField
            label="Email"
            error={error && "That email is not part of our network"}
          >
            <TextInput
              type="email"
              disabled={needPassword}
              {...register("email")}
            />
          </FormField>
          <Button
            secondary
            label="Validate Email"
            type="submit"
            disabled={needPassword}
          />
          {needPassword && (
            <Text>Now, you can choose a password for your account.</Text>
          )}
          <FormField label="Password">
            <TextInput
              type="password"
              disabled={!needPassword}
              {...register("password")}
            />
          </FormField>
          <Button
            primary
            label="Create Account"
            type="submit"
            disabled={!needPassword}
          />
        </form>
        <Button secondary label="Go Back" onClick={goBack} />
      </div>
    </Main>
  );
};

export default CreateUser;
