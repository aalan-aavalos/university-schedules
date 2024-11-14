import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

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

import { getAllCareersWihtAPIKey } from "@/custom-graphql/queries";

import { createOneStudentWithAPIKey } from "@/custom-graphql/mutations";

interface FormProps {
  id?: string;
  email: string;
  password: string;
  preferred_username: string;
  careerID: string;
  four_month_period: string;
  rol: string;
  verificationCode?: string;
}

const initialForm: FormProps = {
  id: "",
  email: "",
  password: "",
  preferred_username: "",
  careerID: "",
  four_month_period: "",
  rol: "student",
  verificationCode: "",
};

interface CareerProps {
  areaID: string;
  career_name: string;
  createdAt: string;
  four_month_periods: number;
  id: string;
  level: string;
  updatedAt: string;
  __typename: string;
}

const SingUpForm = () => {
  const [form, setForm] = useState<FormProps>(initialForm);
  const [careers, setCareers] = useState<Array<CareerProps>>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerificationStep, setIsVerificationStep] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const executeQueries = async () => {
      const res_careers = await getAllCareersWihtAPIKey();
      setCareers(res_careers);
    };

    executeQueries();
  }, []);

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
            "custom:career": form.careerID,
            "custom:four_month_period": form.four_month_period,
            preferred_username: form.preferred_username,
          },
        },
      });
      console.log("Sign-up successful: ", userId);
      setForm((prevForm) => ({ ...prevForm, id: userId }));
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
    const id = form.id as string;
    try {
      setIsLoading(true);
      await confirmSignUp({ username: email, confirmationCode: code });
      await createOneStudentWithAPIKey({
        id,
        student_name: form.preferred_username,
        student_email: form.email,
        four_month_period: +form.four_month_period,
        careerID: form.careerID,
      });
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

  const handleChangeCareer = (e: SyntheticEvent, value: CareerProps | null) => {
    if (!value) {
      setForm((prevForm) => ({ ...prevForm, careerID: "" }));
      return;
    }

    const { id } = value as CareerProps;
    setForm((prevForm) => ({ ...prevForm, careerID: id }));
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (isVerificationStep) {
      verificationCode(form.email, form.verificationCode ?? "");
    } else {
      signUpFunction(form);
    }
  };

  console.log(form);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 2000 }} open={isLoading}>
        Cargando...
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          width: 600,
          margin: "auto",
          mt: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {isVerificationStep ? "Verificación de Código" : "Registro"}
        </Typography>

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
              fullWidth
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
              fullWidth
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
            <Autocomplete
              disablePortal
              fullWidth
              options={careers}
              getOptionLabel={(option) => option.career_name}
              renderInput={(params) => (
                <TextField required {...params} label="Carrera" />
              )}
              onChange={(e: SyntheticEvent, value: CareerProps | null) =>
                handleChangeCareer(e, value)
              }
            />
            <TextField
              required
              type="number"
              slotProps={{ htmlInput: { min: 1, max: 6 } }}
              name="four_month_period"
              label="Cuatrimestre"
              variant="outlined"
              onChange={(e) => handleChange(e)}
              value={form.four_month_period}
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
              Registrarse
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
              fullWidth
            />
            <Button variant="contained" type="submit">
              Verify
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export { SingUpForm };
