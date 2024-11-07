import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

/* Custom GraphQL */
import {
  getAllAreas,
  getAllCareers,
  getAllTeachers,
} from "@/custom-graphql/queries";
import {
  createOneCoordinator,
  createOneStudent,
  createOneTeacher,
  deleteOneTeacher,
  updateOneTeacher,
} from "@/custom-graphql/mutations";

/* SDK Cognito CRUD */
import {
  deleteUser,
  createUser,
  updateUserAttributes,
} from "@/aws-sdk/cognito_crud";

/* MaterialUI */
import {
  Autocomplete,
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
  rol?: string;
  areaID?: string;
  careerID?: string;
  four_month_period?: number;
}

interface FormProps {
  id: string;
  teacher_name: string;
  teacher_email: string;
  rol?: string;
  areaID?: string;
  careerID?: string;
  four_month_period?: number;
}

interface RolesProps {
  rol_name: string;
  rol: string;
}

interface AreaProps {
  id: string;
  area_name: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

interface CareerProps {
  areaID: string;
  career_name: string;
  createdAt: string;
  four_month_periods: number;
  id: string;
  level: string;
  updatedAt: string;
  __typename: string;
}

const initialForm: FormProps = {
  id: "",
  teacher_name: "",
  teacher_email: "",
  rol: "teacher",
  areaID: "",
  careerID: "",
  four_month_period: 1,
};
/* Roles */
const Roles: Array<RolesProps> = [
  {
    rol_name: "Estudiante",
    rol: "student",
  },
  {
    rol_name: "Coordinador",
    rol: "coordinator",
  },
  {
    rol_name: "Administrador",
    rol: "admin",
  },
];

const TeacherAdmin = () => {
  const [teachers, setTeachers] = useState<Array<TeacherProps>>([]);
  const [areas, setAreas] = useState<Array<AreaProps>>([]);
  const [careers, setCareers] = useState<Array<CareerProps>>([]);

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

        const res_careers = await getAllCareers();
        setCareers(res_careers);

        const res_areas = await getAllAreas();
        setAreas(res_areas);
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
  };

  const handleChangeCareer = (e: SyntheticEvent, value: CareerProps | null) => {
    if (!value) {
      setForm((prevForm) => ({ ...prevForm, careerID: "" }));
      return;
    }

    const { id } = value as CareerProps;
    setForm((prevForm) => ({ ...prevForm, careerID: id }));
  };

  const handleChangeArea = (e: SyntheticEvent, value: AreaProps | null) => {
    if (!value) {
      setForm((prevForm) => ({ ...prevForm, areaID: "" }));
      return;
    }

    const { id } = value as AreaProps;
    setForm((prevForm) => ({ ...prevForm, areaID: id }));
  };

  const createTeacher = async () => {
    try {
      showLoading();

      const { teacher_email: email, teacher_name: preferred_username } = form;
      const id = await createUser({ ...form, preferred_username, email });

      const res_teachers = await createOneTeacher({ ...form, id });

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

  const queryTeacher = async () => {
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

  const updateTeacher = async () => {
    try {
      showLoading();

      const { teacher_email: email, teacher_name: preferred_username } = form;
      await updateUserAttributes({ ...form, preferred_username, email });

      if (checked) {
        const id = form.id;
        switch (form.rol) {
          case "coordinator":
            const {
              teacher_name: coordinator_name,
              teacher_email: coordinator_email,
            } = form;

            const areaID = form.areaID as string;

            createOneCoordinator({
              id,
              coordinator_email,
              coordinator_name,
              areaID,
            });
            console.log("Rol actualizado a Coordinador");
            break;
          case "student":
            const { teacher_name: student_name, teacher_email: student_email } =
              form;
            const four_month_period = form.four_month_period as number;
            const careerID = form.careerID as string;
            createOneStudent({
              id,
              student_email,
              student_name,
              four_month_period,
              careerID,
            });
            console.log("Rol actualizado a estudiante");
            break;
          default:
            console.log("Lo que tenia que salir mal salio ayuda");
        }

        const res_teachers = await deleteOneTeacher(form.id);

        if (res_teachers) {
          setTeachers(res_teachers);
        }

        onClose();
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
    setForm({ ...row, rol: "teacher" });
    onOpen();
  };

  const deleteTeacher = async (row: TeacherProps) => {
    const { id, teacher_name } = row;

    confirm({
      title: "Confirmar eliminación",
      description: `¿Seguro que deseas eliminar al maestro "${teacher_name}"? Esta acción no se puede deshacer.`,
    })
      .then(async () => {
        try {
          showLoading();
          const res_teachers = await deleteOneTeacher(id);

          await deleteUser(id);

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
              onClick={() => deleteTeacher(row)}
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
            onClick={() => {
              setForm(initialForm);
              setFormUpdate(false);
              onOpen();
            }}
          >
            Crear
          </Button>
          <Button variant="contained" onClick={queryTeacher}>
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
              updateTeacher();
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
            Ingresa los datos requeridos para
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
            required={!formUpdate}
            disabled={formUpdate}
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
                        setForm((prevForm) => ({
                          ...prevForm,
                          rol: "teacher",
                        }));
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
          {form.rol === "coordinator" && (
            <Autocomplete
              disablePortal
              fullWidth
              options={areas}
              getOptionLabel={(option) => option.area_name}
              renderInput={(params) => (
                <TextField
                  required
                  variant="standard"
                  {...params}
                  label="Areas"
                />
              )}
              onChange={(e: SyntheticEvent, value: AreaProps | null) =>
                handleChangeArea(e, value)
              }
            />
          )}
          {form.rol === "student" && (
            <>
              <Autocomplete
                disablePortal
                fullWidth
                options={careers}
                getOptionLabel={(option) => option.career_name}
                renderInput={(params) => (
                  <TextField
                    required
                    variant="standard"
                    {...params}
                    label="Carrera"
                  />
                )}
                onChange={(e: SyntheticEvent, value: CareerProps | null) =>
                  handleChangeCareer(e, value)
                }
              />
              <TextField
                required
                fullWidth
                type="number"
                variant="standard"
                slotProps={{ htmlInput: { min: 1, max: 6 } }}
                name="four_month_period"
                label="Cuatrimestre"
                onChange={(e) => handleChange(e)}
                value={form.four_month_period}
              />
            </>
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
