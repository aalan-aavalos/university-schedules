import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { getAllCareers } from "@/custom-graphql/queries";
import {
  deleteOneCareer,
  createOneCareer,
  updateOneCareer,
} from "@/custom-graphql/mutations";
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
import { useDisclosure } from "@/hooks/useDisclousure";
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";

interface CareerProps {
  id: string;
  career_name: string;
  level: string;
  four_month_periods: number;
  areaID: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

const initialCareer: CareerProps = {
  id: "",
  career_name: "",
  level: "",
  four_month_periods: 0,
  areaID: "",
  createdAt: "",
  updatedAt: "",
  __typename: "",
};

interface FormProps {
  career_name: string;
  level: string;
  four_month_periods: number;
  areaID: string;
}

const initialForm: FormProps = {
  career_name: "",
  level: "",
  four_month_periods: 0,
  areaID: "",
};

const CareerAdmin = () => {
  const [careers, setCareers] = useState<Array<CareerProps>>([]);
  const [form, setForm] = useState<FormProps>(initialForm);
  const [row, setRow] = useState<CareerProps>(initialCareer);

  const [formUpdate, setFormUpdate] = useState(false);

  const { showLoading, hideLoading, LoadingBackdrop } = useLoadingBackdrop();
  const { isOpen, onClose, onOpen } = useDisclosure(false);

  const confirm = useConfirm();

  useEffect(() => {
    const executeQueries = async () => {
      try {
        showLoading();
        const res_careers = await getAllCareers();
        setCareers(res_careers);
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

  const onOpenUpdate = (row: CareerProps) => {

    setFormUpdate(true);
    setForm(row);

    onOpen();
  };

  const createCareer = async () => {
    const { career_name, level, four_month_periods, areaID } = form;

    setFormUpdate(false);

    try {
      showLoading();

      const res_careers = await createOneCareer({ career_name, level, four_month_periods, areaID });

      if (res_careers) {
        setCareers(res_careers);
      }

      const message = "Carrera creada correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salió mal al crear la carrera";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }

    setForm(initialForm);
    onClose();
  };

  const queryCareer = async () => {
    try {
      showLoading();
      const res_careers = await getAllCareers();
      setCareers(res_careers);

      const message = "Area consultadas correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al consultar el area";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }
  };
  const updateCareer = async () => {
    try {
      showLoading();

      const res_careers = await updateOneCareer(form);

      if (res_careers) {
        setCareers(res_careers);
      }

      const message = "Carrera actualizada correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salió mal al actualizar la carrera";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }
    onClose();
  };

  const deleteCareer = async (row: CareerProps) => {
    const { id, career_name } = row;

    confirm({
      title: "Confirmar eliminación",
      description: `¿Seguro que deseas eliminar el área "${career_name}"? Esta acción no se puede deshacer.`,
    })
      .then(async () => {
        try {
          showLoading();
          const res_careers = await deleteOneCareer(id);
          if (res_careers) {
            setCareers(res_careers);
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
    {
      field: "career_name",
      headerName: "Nombre de Carrera",
      flex: 1,
      editable: true,
    },
    {
      field: "level",
      headerName: "Nivel",
      flex: 1,
    },
    {
      field: "four_month_periods",
      headerName: "Cuatrimestres",
      flex: 1,
    },
    {
      field: "areaID",
      headerName: "ID Área",
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
              onClick={() => onOpenUpdate(row)}
              style={{ marginRight: 8 }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteCareer(row)}
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
          <Button variant="contained" onClick={queryCareer}>
            Consultar
          </Button>
        </Box>

        {careers.length > 0 ? (
          <DataGrid columns={columns} rows={careers} />
        ) : (
          <div>No hay carreras disponibles</div>
        )}
      </Box>

      <Dialog
        open={isOpen}
        PaperProps={{
          component: "form",
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (formUpdate) {
              updateCareer();
              return;
            }
            createCareer();
          },
        }}
      >
        <DialogTitle>{formUpdate ? "Actualizar Carrera" : "Crear Carrera"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los datos requeridos para la carrera
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="career_name"
            label="Nombre de Carrera"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.career_name}
          />
          <TextField
            required
            margin="dense"
            name="level"
            label="Nivel"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.level}
          />
          <TextField
            required
            margin="dense"
            name="four_month_periods"
            label="Cuatrimestres"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.four_month_periods}
          />
          <TextField
            required
            margin="dense"
            name="areaID"
            label="ID de Área"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.areaID}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">
            {formUpdate ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export {CareerAdmin};
