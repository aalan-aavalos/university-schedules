import React, { useState, FormEvent, ChangeEvent } from "react";

import { Button, TextField } from "@mui/material";
import { signIn, type SignInInput } from "aws-amplify/auth";

import { useRouter } from "next/navigation";

interface formProps {
  email: string;
  password: string;
}

const initialForm: formProps = { email: "", password: "" };

const SingInForm = () => {
  const [form, setForm] = useState<formProps>(initialForm);

  const router = useRouter();

  const singInFunction = async ({ username, password }: SignInInput) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log(isSignedIn, nextStep);
    } catch (error) {
      console.log("error signing in", error);
    } finally {
      setForm(initialForm);
      router.push("/dashboard");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("Datos obtenidos....", form);
    singInFunction({ username: form.email, password: form.password });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField
        required
        type="email"
        name="email"
        label="Email"
        variant="outlined"
        autoComplete="email"
        onChange={(e) => handleChange(e)}
        value={form.email}
      />
      <TextField
        required
        type="password"
        name="password"
        label="Password"
        variant="outlined"
        autoComplete="current-password"
        onChange={(e) => handleChange(e)}
        value={form.password}
      />
      <Button variant="contained" type="submit">
        Sing In
      </Button>
    </form>
  );
};

export { SingInForm };
