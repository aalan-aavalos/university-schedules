import React, { useEffect, useState } from "react";

/* Custom GraphQL */
import { getAllCoordinators } from "@/custom-graphql/queries";

/* MaterialUI */
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

/* Hooks */
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
// import { useDisclosure } from "@/hooks/useDisclousure";

interface CoordinatorProps {
  id: string;
  coordinator_name: string;
  coordinator_email: string;
  areaID: string;
}

const CoordinatorAdmin = () => {
  const [coordinators, setCoordinators] = useState<Array<CoordinatorProps>>([]);

  const { LoadingBackdrop, hideLoading, showLoading } = useLoadingBackdrop();

  useEffect(() => {
    const excuteQueries = async () => {
      try {
        showLoading();
        const res_coordinators = await getAllCoordinators();
        setCoordinators(res_coordinators);
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
      field: "coordinator_name",
      headerName: "Nombre del Coordinador",
      flex: 1,
    },
    {
      field: "coordinator_email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "areaID",
      headerName: "ID de Area",
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

        {coordinators.length > 0 ? (
          <DataGrid columns={columns} rows={coordinators} />
        ) : (
          <div>No hay datos disponibles</div> // Renderizamos un mensaje si no hay datos
        )}
      </Box>
    </div>
  );
};

export { CoordinatorAdmin };
