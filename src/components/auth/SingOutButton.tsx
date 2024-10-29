import React from "react";

import { Button } from "@mui/material";

import { signOut } from "aws-amplify/auth";

import { useRouter } from "next/navigation";

const SingOutButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        router.push("/");
        signOut();
      }}
    >
      Sign out
    </Button>
  );
};

export { SingOutButton };
