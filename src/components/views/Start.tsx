import React from "react";
import { Box, Typography, Button } from "@mui/material";

import { type FetchUserAttributesOutput } from "aws-amplify/auth";
import { SingOutButton } from "@/components/auth/SingOutButton";
const Start = ({ user }: { user: FetchUserAttributesOutput | null }) => {
  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "0 auto",
        p: 4,
        textAlign: "center",
        borderRadius: 2,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h4" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
        Bienvenido, {user?.preferred_username}!
      </Typography>

      <Box sx={{ mt: 3, mb: 4, px: 1.5, bgcolor: "background.paper", borderRadius: 2 }}>
        <Typography variant="body1" color="textSecondary">
          <strong>Email:</strong> {user?.email}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Rol:</strong> {user?.["custom:rol"]}
        </Typography>
      </Box>

      <Button color="primary">
        <SingOutButton />
      </Button>
    </Box>
  );
};

export { Start };
