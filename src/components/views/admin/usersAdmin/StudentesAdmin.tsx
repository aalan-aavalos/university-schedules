import React, { useEffect, useState } from "react";

/* Custom GraphQL */
import { getAllStudents } from "@/custom-graphql/queries";

/* MaterialUI */
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

/* Hooks */
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";

// import { useDisclosure } from "@/hooks/useDisclousure";

interface StudentProps {
  id: string;
  student_name: string;
  student_email: string;
  four_month_period: number;
  careerID: string;
}

const StudentesAdmin = () => {
  const [students, setStudents] = useState<Array<StudentProps>>([]);

  const { LoadingBackdrop, hideLoading, showLoading } = useLoadingBackdrop();

  useEffect(() => {
    const excuteQueries = async () => {
      try {
        showLoading();
        const res_students = await getAllStudents();
        setStudents(res_students);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    excuteQueries();
  }, [hideLoading, showLoading]);

  const columns: GridColDef[] = [
    {
      field: "student_name",
      headerName: "Nombre del Estudiante",
      flex: 1,
    },
    {
      field: "student_email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "four_month_period",
      headerName: "Cuatrimestre",
      flex: 1,
    },
    {
      field: "careerID",
      headerName: "Carrera",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: ({ row }) =>
        row.id ? (
          <div>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => onOpenUpdate(row)}
              style={{ marginRight: 8 }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              // onClick={() => deleteArea(row)}
            >
              Eliminar
            </Button>
          </div>
        ) : null,
    },
  ];
  return (
    <div>
      {LoadingBackdrop}
      <Box>
        <Box sx={{ paddingBottom: 1, display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="success"
            /* onClick={() => {
              setForm(initialForm);
              setFormUpdate(false);
              onOpen();
            }} */
          >
            Crear
          </Button>
          <Button variant="contained" /* onClick={queryArea} */>
            Consultar
          </Button>
        </Box>

        {/* El condiconal es porque da error al borrar todas las areas */}

        {students.length > 0 ? (
          <DataGrid columns={columns} rows={students} />
        ) : (
          <div>No hay datos disponibles</div> // Renderizamos un mensaje si no hay datos
        )}
      </Box>
    </div>
  );
};

export { StudentesAdmin };
