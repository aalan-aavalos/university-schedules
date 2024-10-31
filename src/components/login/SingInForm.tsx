import React, { useState, FormEvent, ChangeEvent } from "react";

import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";

import {
  signIn,
  type SignInInput,
  signOut,
  fetchUserAttributes,
  type FetchUserAttributesOutput,
} from "aws-amplify/auth";

import { enqueueSnackbar } from "notistack";

import { useRouter } from "next/navigation";

interface FormProps {
  email: string;
  password: string;
}

const initialForm: FormProps = { email: "", password: "" };

const SingInForm = () => {
  const [form, setForm] = useState<FormProps>(initialForm);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const singInFunction = async ({ username, password }: SignInInput) => {
    try {
      setIsLoading(true);

      /* await signOut(); */
      const { isSignedIn } = await signIn({ username, password });

      /* En caso de que la sessión no este activa termina todo */
      if (!isSignedIn) {
        console.error("Error al iniciar sesión");
        enqueueSnackbar("Error al iniciar sesión", { variant: "error" });
        return;
      }

      const { "custom:rol": rol }: FetchUserAttributesOutput =
        await fetchUserAttributes();

      if (!rol) {
        await signOut();
        console.error(
          "La cuenta no tiene un rol definido o no exisite el rol, rol:",
          rol
        );
        enqueueSnackbar(
          "La cuenta no tiene un rol definido o no exisite el rol",
          { variant: "error" }
        );
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log("error signing in", error);
    } finally {
      setForm(initialForm);
      setIsLoading(false);
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
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 2000 }} open={isLoading}>
        Cargando...
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>

      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          required
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          autoComplete="email"
          onChange={handleChange}
          value={form.email}
        />
        <TextField
          required
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          autoComplete="current-password"
          onChange={handleChange}
          value={form.password}
        />
        <Button variant="contained" type="submit">
          Sing In
        </Button>
      </form>
    </>
  );
};

export { SingInForm };
