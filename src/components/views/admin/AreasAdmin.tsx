import React, { useEffect, useState } from "react";

/* Material UI */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

/* Custom Queries */
import { getAllAreas } from "@/custom-graphql/queries";
import { deleteOneArea } from "@/custom-graphql/mutations";

/* Hooks */
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
import { useDisclosure } from "@/hooks/useDisclousure";

/* Feedback */
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";

interface Areas {
  id: string;
  area_name: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

const AreasAdmin = () => {
  const [areas, setAreas] = useState<Array<Areas>>([]);

  const { showLoading, hideLoading, LoadingBackdrop } = useLoadingBackdrop();
  const { isOpen, onClose, onOpen } = useDisclosure(false);

  const confirm = useConfirm();

  useEffect(() => {
    const executeQueries = async () => {
      try {
        showLoading();
        const res_areas = await getAllAreas();
        setAreas(res_areas);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    executeQueries();
  }, [hideLoading, showLoading]);

  const handleEdit = (id: string) => {
    console.log(`Editando área con ID: ${id}`);
  };

  const handleDelete = async (row: Areas) => {
    const { id, area_name } = row;
    console.log(`Eliminando área con ID: ${id}`);

    confirm({
      title: "Confirmar eliminación",
      description: `¿Seguro que deseas eliminar el área "${area_name}"? Esta acción no se puede deshacer.`,
    })
      .then(async () => {
        try {
          showLoading();
          const res_data = await deleteOneArea(id);
          if (res_data) {
            // setAreas((prev) => prev.filter((area) => area.id !== id));
            setAreas(res_data);
          }
          const message = "Area eliminada correctamente";
          enqueueSnackbar(message, { variant: "success" });
        } catch (err) {
          const message = "Algo salio mal al eliminar el area";
          enqueueSnackbar(message, { variant: "error" });
          console.error(err);
        } finally {
          hideLoading();
        }
      })
      .catch(() => {});
  };

  const handleQuery = async () => {
    try {
      showLoading();
      const res_area = await getAllAreas();
      setAreas(res_area);
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  const handleCreate = () => {
    onOpen();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "area_name",
      headerName: "Nombre de Area",
      flex: 2,
      editable: true,
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
              onClick={() => handleEdit(row.id)}
              style={{ marginRight: 8 }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(row)}
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
      <Box sx={{ height: 400, width: "75vw" }}>
        <Box sx={{ paddingY: 1, display: "flex", gap: 1 }}>
          <Button variant="contained" color="success" onClick={handleCreate}>
            Crear
          </Button>
          <Button variant="contained" onClick={handleQuery}>
            Consultar
          </Button>
        </Box>

        {/* El condiconal es porque da error al borrar todas las areas */}

        {areas.length > 0 ? (
          <DataGrid columns={columns} rows={areas} />
        ) : (
          <div>No hay áreas disponibles</div> // Renderizamos un mensaje si no hay datos
        )}
      </Box>

      <Dialog
        open={isOpen}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            onClose();
          },
        }}
      >
        <DialogTitle>Crear una asignación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los datos requeridos para crear la asignación
          </DialogContentText>
          <TextField
            autoFocus
            required
            name="area_name"
            label="Nombre de area"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Crear</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { AreasAdmin };
