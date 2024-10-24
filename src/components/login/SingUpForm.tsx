import React, { ChangeEvent, FormEvent, useState } from "react";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import {
  signUp,
  confirmSignUp,
  type SignInInput,
  signIn,
  type FetchUserAttributesOutput,
  fetchUserAttributes,
  signOut,
} from "aws-amplify/auth";
import { enqueueSnackbar } from "notistack";

import { useRouter } from "next/navigation";

interface FormProps {
  email: string;
  password: string;
  preferred_username: string;
  rol: string;
  verificationCode?: string;
}

const initialForm: FormProps = {
  email: "",
  password: "",
  preferred_username: "",
  rol: "student",
  verificationCode: "",
};

const SingUpForm = () => {
  const [form, setForm] = useState<FormProps>(initialForm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerificationStep, setIsVerificationStep] = useState<boolean>(false);

  const router = useRouter();

  const signUpFunction = async ({ email, password }: FormProps) => {
    try {
      setIsLoading(true);

      const { userId } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            "custom:rol": "student",
            preferred_username: form.preferred_username,
          },
        },
      });
      console.log("Sign-up successful: ", userId);
      setIsVerificationStep(true);
      enqueueSnackbar(
        "Sign-up successful, please check your email for the verification code.",
        { variant: "success" }
      );
    } catch (error) {
      console.error("Error signing up: ", error);
      enqueueSnackbar("Error signing up, please try again.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verificationCode = async (email: string, code: string) => {
    try {
      setIsLoading(true);
      await confirmSignUp({ username: email, confirmationCode: code });
      await singInFunction({ username: form.email, password: form.password });
      enqueueSnackbar("Verification successful! You can now log in.", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error verifying sign-up: ", error);
      enqueueSnackbar("Error verifying code, please try again.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const singInFunction = async ({ username, password }: SignInInput) => {
    try {
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
    if (isVerificationStep) {
      verificationCode(form.email, form.verificationCode ?? "");
    } else {
      signUpFunction(form);
    }
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 2000 }} open={isLoading}>
        Cargando...
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>

      <form onSubmit={(e) => onSubmit(e)}>
        {!isVerificationStep ? (
          <>
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
            <TextField
              required
              type="text"
              name="preferred_username"
              label="Preferred Username"
              autoComplete="username"
              variant="outlined"
              onChange={(e) => handleChange(e)}
              value={form.preferred_username}
            />
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <TextField
              required
              type="text"
              name="verificationCode"
              label="Verification Code"
              variant="outlined"
              onChange={(e) => handleChange(e)}
              value={form.verificationCode}
            />
            <Button variant="contained" type="submit">
              Verify
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export { SingUpForm };
