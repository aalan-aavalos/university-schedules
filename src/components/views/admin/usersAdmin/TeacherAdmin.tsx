import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

/* Custom GraphQL */
import { getAllTeachers } from "@/custom-graphql/queries";
import {
  createOneTeacher,
  deleteOneTeacher,
  updateOneTeacher,
} from "@/custom-graphql/mutations";

/* MaterialUI */
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

/* Hooks */
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
import { useDisclosure } from "@/hooks/useDisclousure";

/* Feedback */
import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";

interface TeacherProps {
  id: string;
  teacher_name: string;
  teacher_email: string;
}

interface FormProps {
  teacher_name: string;
  teacher_email: string;
  rol?: string;
}

interface RolesProps {
  rol_name: string;
  rol: string;
}

const initialForm: FormProps = {
  teacher_name: "",
  teacher_email: "",
  rol: "",
};

/* Roles */
const Roles: Array<RolesProps> = [
  {
    rol_name: "Administrador",
    rol: "admin",
  },
  {
    rol_name: "Coordinador",
    rol: "coordinator",
  },
  {
    rol_name: "Estudiante",
    rol: "student",
  },
];

const TeacherAdmin = () => {
  const [teachers, setTeachers] = useState<Array<TeacherProps>>([]);
  const [form, setForm] = useState<FormProps>(initialForm);
  const [checked, setChecked] = useState<boolean>(false);

  const [formUpdate, setFormUpdate] = useState(false);

  const { LoadingBackdrop, hideLoading, showLoading } = useLoadingBackdrop();
  const { isOpen, onClose, onOpen } = useDisclosure(false);

  const confirm = useConfirm();

  useEffect(() => {
    const excuteQueries = async () => {
      try {
        showLoading();
        const res_teachears = await getAllTeachers();
        setTeachers(res_teachears);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    excuteQueries();
  }, [hideLoading, showLoading]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    if (name === "level") {
      const count = value === "tsu" ? 6 : 5;
      setForm((prevForm) => ({ ...prevForm, for: count }));
    }
  };

  const createTeacher = async () => {
    try {
      showLoading();

      const res_teachers = await createOneTeacher(form);

      if (res_teachers) {
        setTeachers(res_teachers);
      }

      const message = "Maestro creado correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al crea el maestro";
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
      const res_teacher = await getAllTeachers();
      setTeachers(res_teacher);

      const message = "Maestros consultados correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al consultar el maestros";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  const updateArea = async () => {
    try {
      showLoading();

      if (checked) {
        console.log("se actualizara el rol");
        return;
      }

      const res_teachers = await updateOneTeacher(form);

      if (res_teachers) {
        setTeachers(res_teachers);
      }

      const message = "Maestro actualizado correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al actualizar el maestro";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }

    onClose();
  };

  const onOpenUpdate = (row: TeacherProps) => {
    setFormUpdate(true);
    setForm(row);
    onOpen();
  };

  const deleteArea = async (row: TeacherProps) => {
    const { id, teacher_name } = row;

    confirm({
      title: "Confirmar eliminación",
      description: `¿Seguro que deseas eliminar al maestro "${teacher_name}"? Esta acción no se puede deshacer.`,
    })
      .then(async () => {
        try {
          showLoading();
          const res_teachers = await deleteOneTeacher(id);
          if (res_teachers) {
            setTeachers(res_teachers);
          }
          const message = "Maestro eliminado correctamente";
          enqueueSnackbar(message, { variant: "success" });
        } catch (err) {
          const message = "Algo salio mal al eliminar el maestros";
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
      field: "teacher_name",
      headerName: "Nombre del Profesor",
      flex: 1,
    },
    {
      field: "teacher_email",
      headerName: "Email",
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
              onClick={() => deleteArea(row)}
            >
              Eliminar
            </Button>
          </div>
        ) : null,
    },
  ];

  console.log(form);

  return (
    <div>
      {LoadingBackdrop}
      <Box>
        <Box sx={{ paddingBottom: 1, display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setForm(initialForm);
              setFormUpdate(false);
              onOpen();
            }}
          >
            Crear
          </Button>
          <Button variant="contained" onClick={queryArea}>
            Consultar
          </Button>
        </Box>

        {/* El condiconal es porque da error al borrar todas las areas */}

        {teachers.length > 0 ? (
          <DataGrid columns={columns} rows={teachers} />
        ) : (
          <div>No hay datos disponibles</div> // Renderizamos un mensaje si no hay datos
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
            createTeacher();
          },
        }}
      >
        <DialogTitle>
          {formUpdate ? "Actualizar" : "Crear"} un Maestro
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los datos requeridos para{" "}
            {formUpdate ? "actualizar" : "crear"} la maestro
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="teacher_name"
            label="Nombre de maestro"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.teacher_name}
          />
          <TextField
            required
            margin="dense"
            name="teacher_email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.teacher_email}
          />
          {formUpdate && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => {
                      setChecked(e.target.checked);

                      if (!e.target.checked) {
                        setForm((prevForm) => ({ ...prevForm, rol: "" }));
                      }
                    }}
                  />
                }
                label="Actualizar rol"
                labelPlacement="start"
                sx={{ m: 1 }}
              />

              <TextField
                disabled={!checked}
                required={checked}
                select
                name="rol"
                label="Rol"
                variant="standard"
                onChange={handleChange}
                value={form.rol || ""}
                fullWidth
              >
                {Roles.map(({ rol_name, rol }) => (
                  <MenuItem key={rol} value={rol}>
                    {rol_name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onClose();
              setForm(initialForm);
              setChecked(false);
            }}
          >
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

export { TeacherAdmin };
