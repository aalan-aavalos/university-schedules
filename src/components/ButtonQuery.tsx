"use client";

import React from "react";

import Padoru from "@/public/gifs/padoru.gif";

import { Button } from "@mui/material";

import { enqueueSnackbar } from "notistack";
// import { useConfirm } from "materi/*  */al-ui-confirm";
import Image from "next/image";

const ButtonQuery = () => {
  // const confirm = useConfirm();s

  const query_data = async (name: string = "Invitado") => {
    /* confirm({ description: "This action is permanent!" })
      .then(async () => { */

    console.log("Bienvenido,", name);
    console.log("consultando....");

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
