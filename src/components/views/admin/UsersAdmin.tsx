import React, { useEffect, useState } from "react";

/* Custom GraphQL */
import { getAllTeachers } from "@/custom-graphql/queries";
import {
  createOneTeacher,
  deleteOneTeacher,
  updateOneTeacher,
} from "@/custom-graphql/mutations";

/* Material UI */
import { Button } from "@mui/material";

interface Teachers {
  id: string;
  teacher_name: string;
}

const UsersAdmin = () => {
  const [teachers, setTeachers] = useState<Array<Teachers>>([]);

  useEffect(() => {
    const excuteQueries = async () => {
      const res_teachears = await getAllTeachers();
      setTeachers(res_teachears);
    };

    excuteQueries();
  }, []);

  return (
    <div>
      UsersAdmin
      <Button onClick={() => console.log("tus maestros son:", teachers)}>
        Ver maestros
      </Button>
      <Button onClick={() => createOneTeacher("Josue 2")}>Crear maestro</Button>
      <Button
        onClick={() => deleteOneTeacher("3d9f707c-b0d4-4774-9557-8ad830bb6e45")}
      >
        Elminar maestro
      </Button>
      <Button
        onClick={() =>
          updateOneTeacher(
            "d93873ab-8164-4295-9c57-24d10f0dccff",
            "Josue Miguel Ortiz Meza Y Hidalgo Y Costilla"
          )
        }
      >
        Actualizar maestro
      </Button>
    </div>
  );
};

export { UsersAdmin };
