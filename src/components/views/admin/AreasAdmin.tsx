import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

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
import {
  deleteOneArea,
  createOneArea,
  updateOneArea,
} from "@/custom-graphql/mutations";

/* Hooks */
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
import { useDisclosure } from "@/hooks/useDisclousure";

/* Feedback */
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";

interface AreaProps {
  id: string;
  area_name: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

const initialArea: AreaProps = {
  id: "",
  area_name: "",
  createdAt: "",
  updatedAt: "",
  __typename: "",
};

interface FormProps {
  area_name: string;
}

const initialForm: FormProps = {
  area_name: "",
};

const AreasAdmin = () => {
  const [areas, setAreas] = useState<Array<AreaProps>>([]);
  const [form, setForm] = useState<FormProps>(initialForm);
  const [row, setRow] = useState<AreaProps>(initialArea);

  const [formUpdate, setFormUpdate] = useState(false);

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onOpenUpdate = (row: AreaProps) => {
    const { area_name } = row;

    setRow(row);
    setFormUpdate(true);
    setForm((prevForm) => ({ ...prevForm, area_name }));

    onOpen();
  };

  const createArea = async () => {
    const { area_name } = form;

    setFormUpdate(false);

    try {
      showLoading();

      const res_areas = await createOneArea(area_name);

      if (res_areas) {
        setAreas(res_areas);
      }

      const message = "Area creada correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al crea el area";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }

    setForm(initialForm);
    onClose();
  };

  const queryArea = async () => {
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

  const updateArea = async () => {
    const { area_name: new_area_name } = form;

    try {
      showLoading();

      const res_areas = await updateOneArea(row.id, new_area_name);

      if (res_areas) {
        setAreas(res_areas);
      }

      const message = "Area actualizada correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al actualizar el area";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }

    setForm(initialForm);
    setFormUpdate(false);
    onClose();
  };

  const deleteArea = async (row: AreaProps) => {
    const { id, area_name } = row;

    confirm({
      title: "Confirmar eliminación",
      description: `¿Seguro que deseas eliminar el área "${area_name}"? Esta acción no se puede deshacer.`,
    })
      .then(async () => {
        try {
          showLoading();
          const res_areas = await deleteOneArea(id);
          if (res_areas) {
            setAreas(res_areas);
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
              onClick={() => onOpenUpdate(row)}
              style={{ marginRight: 8 }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteArea(row)}
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
      <Box sx={{ height: "75vh", width: "75vw" }}>
        <Box sx={{ paddingY: 1, display: "flex", gap: 1 }}>
          <Button variant="contained" color="success" onClick={onOpen}>
            Crear
          </Button>
          <Button variant="contained" onClick={queryArea}>
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
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (formUpdate) {
              updateArea();
              return;
            }
            createArea();
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
            margin="dense"
            name="area_name"
            label="Nombre de area"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.area_name}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            {formUpdate ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { AreasAdmin };
