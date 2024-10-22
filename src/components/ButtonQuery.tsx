"use client";

import React from "react";

import Padoru from "@/public/gifs/padoru.gif";

import { generateClient } from "aws-amplify/api";
import { listTodos } from "@/graphql/queries";

import { Button } from "@mui/material";

import { enqueueSnackbar } from "notistack";
// import { useConfirm } from "materi/*  */al-ui-confirm";
import Image from "next/image";

const client = generateClient();

const ButtonQuery = () => {
  // const confirm = useConfirm();

  const query_data = async (name: string = "Invitado") => {
    /* confirm({ description: "This action is permanent!" })
      .then(async () => { */
    const allTodos = await client.graphql({
      query: listTodos,
    });

    console.log("Bienvenido,", name);
    console.log("consultando....");
    console.log(allTodos);

    enqueueSnackbar("That was easy!");
    /* })
      .catch(() => {
        enqueueSnackbar("That wasn't easy!");
      }); */
  };
  return (
    <>
      <Button variant="contained" onClick={() => query_data()}>
        Consultar datos
      </Button>

      <Image
        src={Padoru.src}
        alt="Descripción de la imagen"
        className="w-[10%] h-[10%] object-cover"
        width={100}
        height={100}
        priority
        unoptimized
      />

      <div className="p-2 bg-blue-500 ">Hola</div>
    </>
  );
};

export { ButtonQuery };
