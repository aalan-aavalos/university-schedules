"use client";

import React from "react";

import { generateClient } from "aws-amplify/api";
import { listTodos } from "@/graphql/queries";

import { Button } from "@mui/material";

import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";

const client = generateClient();

const ButtonQuery = () => {
  const confirm = useConfirm();

  const query_data = async (name: string = "Invitado") => {
    confirm({ description: "This action is permanent!" })
      .then(async () => {
        const allTodos = await client.graphql({
          query: listTodos,
        });

        console.log("Bienvenido,", name);
        console.log("consultando....");
        console.log(allTodos);

        enqueueSnackbar("That was easy!");
      })
      .catch(() => {
        enqueueSnackbar("That wasn't easy!");
      });
  };
  return (
    <>
      <Button variant="contained" onClick={() => query_data()}>
        Consultar datos
      </Button>

      <div className="p-2 bg-blue-500 ">Hola</div>
    </>
  );
};

export { ButtonQuery };
