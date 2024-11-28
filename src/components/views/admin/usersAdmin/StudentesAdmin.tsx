import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

/* Custom GraphQL */
import {
  getAllCareers,
  getAllStudents,
  getAllAreas,
} from "@/custom-graphql/queries";
import {
  createOneCoordinator,
  createOneStudent,
  createOneTeacher,
  deleteOneStudent,
  updateOneStudent,
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

interface StudentProps {
  id: string;
  student_name: string;
  student_email: string;
  four_month_period: number;
  careerID: string;
  rol?: string;
}
interface AreaProps {
  id: string;
  area_name: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}
interface FormProps {
  id: string;
  student_name: string;
  student_email: string;
  four_month_period: number;
  careerID: string;
  areaID?: string;
  rol?: string;
}
interface RolesProps {
  rol_name: string;
  rol: string;
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
  student_name: "",
  student_email: "",
  four_month_period: 1,
  careerID: "",
  areaID: "",
  rol: "student",
};

/* Roles */
const Roles: Array<RolesProps> = [
  {
    rol_name: "Maestro",
    rol: "teacher",
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

const StudentesAdmin = () => {
  const [students, setStudents] = useState<Array<StudentProps>>([]);
  const [careers, setCareers] = useState<Array<CareerProps>>([]);
  const [areas, setAreas] = useState<Array<AreaProps>>([]);

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
        const res_students = await getAllStudents();
        setStudents(res_students);

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

  const createStudent = async () => {
    try {
      showLoading();

      const { student_email: email, student_name: preferred_username } = form;
      const id = await createUser({ ...form, preferred_username, email });

      const res_students = await createOneStudent({ ...form, id });

      if (res_students) {
        setStudents(res_students);
      }

      const message = "Estudiante creado correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al crear el estudiante";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }

    setForm(initialForm);
    onClose();
  };

  const queryStudent = async () => {
    try {
      showLoading();
      const res_teacher = await getAllStudents();
      setStudents(res_teacher);

      const message = "Estudiantes consultados correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al consultar los estudiantes";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  const updateStudent = async () => {
    try {
      showLoading();

      const { student_email: email, student_name: preferred_username } = form;
      console.log(form);
      await updateUserAttributes({ ...form, preferred_username, email });

      if (checked) {
        switch (form.rol) {
          case "coordinator":
            const {
              id,
              student_name: coordinator_name,
              student_email: coordinator_email,
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
          case "teacher":
            const { student_name: teacher_name, student_email: teacher_email } =
              form;
            createOneTeacher({ ...form, teacher_email, teacher_name });
            console.log("Rol actualizado a Maestro");
            break;
          default:
            console.log("Lo que tenia que salir mal salio ayuda");
        }

        const res_students = await deleteOneStudent(form?.id);

        if (res_students) {
          setStudents(res_students);
        }

        onClose();
        return;
      }

      const res_students = await updateOneStudent(form);

      if (res_students) {
        setStudents(res_students);
      }

      const message = "Estdiante actualizado correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al actualizar el estudiante";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }

    onClose();
  };

  const onOpenUpdate = (row: StudentProps) => {
    setFormUpdate(true);
    setForm({ ...row, rol: "student" });
    onOpen();
  };

  const deleteStudent = async (row: StudentProps) => {
    const { id, student_name } = row;

    confirm({
      title: "Confirmar eliminación",
      description: `¿Seguro que deseas eliminar al maestro "${student_name}"? Esta acción no se puede deshacer.`,
    })
      .then(async () => {
        try {
          showLoading();
          const res_students = await deleteOneStudent(id);

          await deleteUser(id);

          if (res_students) {
            setStudents(res_students);
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
      renderCell: (params) => {
        const career = careers.find((career) => career.id === params.value);
        return career ? career.career_name : "Desconocido";
      },
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
              onClick={() => deleteStudent(row)}
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
          <Button variant="contained" onClick={queryStudent}>
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

      <Dialog
        open={isOpen}
        PaperProps={{
          component: "form",
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (formUpdate) {
              updateStudent();
              return;
            }
            createStudent();
          },
        }}
      >
        <DialogTitle>
          {formUpdate ? "Actualizar" : "Crear"} un Estudiante
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los datos requeridos para
            {formUpdate ? " actualizar" : " crear"} el estudiante
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="student_name"
            label="Nombre del estudiante"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.student_name}
          />
          <TextField
            required={!formUpdate}
            disabled={formUpdate}
            margin="dense"
            name="student_email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.student_email}
          />

          {formUpdate ? (
            <TextField
              disabled
              fullWidth
              variant="standard"
              label="Cuatrimestre"
              value={form.careerID}
            />
          ) : (
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
          )}

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
                          rol: "student",
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

export { StudentesAdmin };
