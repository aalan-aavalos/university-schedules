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
  getAllCoordinators,
} from "@/custom-graphql/queries";
import {
  createOneCoordinator,
  createOneStudent,
  createOneTeacher,
  deleteOneCoordinator,
  updateOneCoordinator,
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

interface CoordinatorProps {
  id: string;
  coordinator_name: string;
  coordinator_email: string;
  areaID: string;
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
  coordinator_name: string;
  coordinator_email: string;
  four_month_period?: number;
  areaID: string;
  careerID?: string;
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
  coordinator_name: "",
  coordinator_email: "",
  four_month_period: 1,
  careerID: "",
  areaID: "",
  rol: "student",
};

/* Roles */
const Roles: Array<RolesProps> = [
  {
    rol_name: "Estudiante",
    rol: "student",
  },
  {
    rol_name: "Maestro",
    rol: "teacher",
  },
  {
    rol_name: "Administrador",
    rol: "admin",
  },
];

const CoordinatorAdmin = () => {
  const [coordinators, setCoordinators] = useState<Array<CoordinatorProps>>([]);
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
        const res_coordinators = await getAllCoordinators();
        setCoordinators(res_coordinators);

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

  const createCoordinator = async () => {
    try {
      showLoading();

      const { coordinator_email: email, coordinator_name: preferred_username } =
        form;
      const id = await createUser({ ...form, preferred_username, email });

      const res_coordinators = await createOneCoordinator({ ...form, id });

      if (res_coordinators) {
        setCoordinators(res_coordinators);
      }

      const message = "Coordinador creado correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al crear el coordinador";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }

    setForm(initialForm);
    onClose();
  };

  const queryCoordinator = async () => {
    try {
      showLoading();
      const res_coordinator = await getAllCoordinators();
      setCoordinators(res_coordinator);

      const message = "Coordinador consultados correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al consultar los coordinadores";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  const updateCoordinator = async () => {
    try {
      showLoading();

      const { coordinator_email: email, coordinator_name: preferred_username } =
        form;
      console.log(form);
      await updateUserAttributes({ ...form, preferred_username, email });

      if (checked) {
        const id = form.id;
        switch (form.rol) {
          case "student":
            const {
              coordinator_name: student_name,
              coordinator_email: student_email,
            } = form;
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
          case "teacher":
            const {
              coordinator_name: teacher_name,
              coordinator_email: teacher_email,
            } = form;
            createOneTeacher({ ...form, teacher_email, teacher_name });
            console.log("Rol actualizado a Maestro");
            break;
          default:
            console.log("Lo que tenia que salir mal salio ayuda");
        }

        const res_coordinators = await deleteOneCoordinator(form?.id);

        if (res_coordinators) {
          setCoordinators(res_coordinators);
        }

        onClose();
        return;
      }

      const res_coordinators = await updateOneCoordinator(form);

      if (res_coordinators) {
        setCoordinators(res_coordinators);
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

  const onOpenUpdate = (row: CoordinatorProps) => {
    setFormUpdate(true);
    setForm({ ...row, rol: "coordinator" });
    onOpen();
  };

  const deleteCoordinator = async (row: CoordinatorProps) => {
    const { id, coordinator_name } = row;

    confirm({
      title: "Confirmar eliminación",
      description: `¿Seguro que deseas eliminar al maestro "${coordinator_name}"? Esta acción no se puede deshacer.`,
    })
      .then(async () => {
        try {
          showLoading();
          const res_coordinator = await deleteOneCoordinator(id);

          await deleteUser(id);

          if (res_coordinator) {
            setCoordinators(res_coordinator);
          }
          const message = "Coordinador eliminado correctamente";
          enqueueSnackbar(message, { variant: "success" });
        } catch (err) {
          const message = "Algo salio mal al eliminar el coordinador";
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
              onClick={() => onOpenUpdate(row)}
              style={{ marginRight: 8 }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteCoordinator(row)}
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
          <Button variant="contained" onClick={queryCoordinator}>
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

      <Dialog
        open={isOpen}
        PaperProps={{
          component: "form",
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (formUpdate) {
              updateCoordinator();
              return;
            }
            createCoordinator();
          },
        }}
      >
        <DialogTitle>
          {formUpdate ? "Actualizar" : "Crear"} un Coordinador
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los datos requeridos para
            {formUpdate ? "actualizar" : "crear"} el coordinador
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="coordinator_name"
            label="Nombre del coordinador"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.coordinator_name}
          />
          <TextField
            required={!formUpdate}
            disabled={formUpdate}
            margin="dense"
            name="coordinator_email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.coordinator_email}
          />

          {formUpdate ? (
            <TextField
              disabled
              fullWidth
              variant="standard"
              label="Area"
              value={form.areaID}
            />
          ) : (
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

export { CoordinatorAdmin };
