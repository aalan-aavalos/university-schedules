import React, {
  //   ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  //   MenuItem,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getAllSubjects, getAllTeachers } from "@/custom-graphql/queries";
import { getAllCareers } from "@/custom-graphql/queries";
import {
  //   deleteOneSubject,
  createOneSubject,
  updateOneSubject,
} from "@/custom-graphql/mutations";
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
import { useDisclosure } from "@/hooks/useDisclousure";
// import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";

interface SubjectProps {
  id: string;
  subject_name: string;
  four_month_period: number;
  hours_per_teacher: number;
  hours_per_student: number;
  careerID: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

/* const initialSubject: SubjectProps = {
  id: "",
  subject_name: "",
  four_month_period: 0,
  hours_per_teacher: 0,
  hours_per_student: 0,
  careerID: "",
  createdAt: "",
  updatedAt: "",
  __typename: "",
}; */

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

interface FormProps {
  subject_name: string;
  four_month_period: number;
  hours_per_teacher: number;
  hours_per_student: number;
  careerID: string;
  teacherID?: string;
}

interface TeacherProps {
  id: string;
  teacher_name: string;
  teacher_email: string;
  rol?: string;
  teacherID?: string;
  areaID?: string;
  careerID?: string;
  four_month_period?: number;
}

const initialForm: FormProps = {
  subject_name: "",
  four_month_period: 0,
  hours_per_teacher: 0,
  hours_per_student: 0,
  careerID: "",
  teacherID: "",
};

const AssignamentSubjects = () => {
  const [subjects, setSubjects] = useState<Array<SubjectProps>>([]);
  const [careers, setCareers] = useState<Array<CareerProps>>([]);
  const [teachers, setTeachers] = useState<Array<TeacherProps>>([]);
  const [form, setForm] = useState<FormProps>(initialForm);

  const [formUpdate, setFormUpdate] = useState(false);

  const { showLoading, hideLoading, LoadingBackdrop } = useLoadingBackdrop();
  const { isOpen, onClose, onOpen } = useDisclosure(false);

  /* const confirm = useConfirm(); */

  useEffect(() => {
    const executeQueries = async () => {
      try {
        showLoading();
        const res_subjects = await getAllSubjects();
        console.log(res_subjects);
        const res_careers = await getAllCareers(); // Cargar carreras
        setSubjects(res_subjects);

        const res_teachears = await getAllTeachers();
        setTeachers(res_teachears);
        setCareers(res_careers); // Guardar carreras en el estado
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    executeQueries();
  }, [hideLoading, showLoading]);

  /* const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }; */

  const handleChangeTeacher = (
    e: SyntheticEvent,
    value: TeacherProps | null
  ) => {
    if (!value) {
      setForm((prevForm) => ({ ...prevForm, teacherID: "" }));
      return;
    }

    const { id } = value as TeacherProps;
    setForm((prevForm) => ({ ...prevForm, teacherID: id }));
  };

  const onOpenUpdate = (row: SubjectProps) => {
    setFormUpdate(true);
    setForm(row);

    onOpen();
  };

  const createSubject = async () => {
    const {
      subject_name,
      four_month_period,
      hours_per_teacher,
      hours_per_student,
      careerID,
    } = form;

    setFormUpdate(false);

    try {
      showLoading();

      const res_subjects = await createOneSubject({
        subject_name,
        four_month_period,
        hours_per_teacher,
        hours_per_student,
        careerID,
      });

      if (res_subjects) {
        setSubjects(res_subjects);
      }

      const message = "Materia creada correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salió mal al crear la materia";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }

    setForm(initialForm);
    onClose();
  };

  const querySubject = async () => {
    try {
      showLoading();
      const res_subjects = await getAllSubjects();
      setSubjects(res_subjects);

      const res_teachears = await getAllTeachers();
      setTeachers(res_teachears);

      console.log(res_teachears);

      const message = "Materias consultadas correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al consultar la materia";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }
  };
  const updateSubject = async () => {
    try {
      showLoading();

      const res_subjects = await updateOneSubject(form);

      if (res_subjects) {
        setSubjects(res_subjects);
      }

      const message = "Materia actualizada correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salió mal al actualizar la materia";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }
    onClose();
  };

  /* const deleteSubject = async (row: SubjectProps) => {
    const { id, subject_name } = row;

    confirm({
      title: "Confirmar eliminación",
      description: `¿Seguro que deseas eliminar la materia "${subject_name}"? Esta acción no se puede deshacer.`,
    })
      .then(async () => {
        try {
          showLoading();
          const res_subjects = await deleteOneSubject(id);
          if (res_subjects) {
            setSubjects(res_subjects);
          }
          const message = "Materia eliminada correctamente";
          enqueueSnackbar(message, { variant: "success" });
        } catch (err) {
          const message = "Algo salio mal al eliminar la materia";
          enqueueSnackbar(message, { variant: "error" });
          console.error(err);
        } finally {
          hideLoading();
        }
      })
      .catch(() => {});
  }; */

  const columns: GridColDef[] = [
    {
      field: "subject_name",
      headerName: "Nombre de Materia",
      flex: 1,
      editable: true,
    },
    {
      field: "four_month_period",
      headerName: "Cuatrimestre",
      flex: 1,
    },
    {
      field: "hours_per_teacher",
      headerName: "Horas por profesor",
      flex: 1,
    },
    {
      field: "teacherID",
      headerName: "Maestro",
      flex: 1,
      renderCell: (params) => {
        const teacher = teachers.find((teacher) => teacher.id === params.value);
        return teacher ? teacher.teacher_name : "No asignado";
      },
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
              disabled={row.teacherID === "No asignado"}
              variant="contained"
              color="primary"
              onClick={() => onOpenUpdate(row)}
              style={{ marginRight: 8 }}
            >
              Asignar
            </Button>
            {/*  <Button
              variant="contained"
              color="error"
              onClick={() => deleteSubject(row)}
            >
              Eliminar
            </Button> */}
          </div>
        ) : null,
    },
  ];

  return (
    <div>
      {LoadingBackdrop}
      <Box sx={{ height: "75vh", width: "75vw" }}>
        <Box sx={{ paddingY: 1, display: "flex", gap: 1 }}>
          {/* <Button
            variant="contained"
            color="success"
            onClick={() => {
              setForm(initialForm);
              setFormUpdate(false);
              onOpen();
            }}
          >
            Crear
          </Button> */}
          <Button variant="contained" onClick={querySubject}>
            Consultar
          </Button>
        </Box>

        {subjects.length > 0 ? (
          <DataGrid columns={columns} rows={subjects} />
        ) : (
          <div>No hay materias disponibles</div>
        )}
      </Box>

      <Dialog
        open={isOpen}
        PaperProps={{
          component: "form",
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (formUpdate) {
              updateSubject();
              return;
            }
            createSubject();
          },
        }}
      >
        <DialogTitle>
          {formUpdate ? "Asignar Materia" : "Crear Materia"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los datos requeridos para la materia.
          </DialogContentText>
          {/* <TextField
            autoFocus
            required
            margin="dense"
            name="subject_name"
            label="Nombre de Materia"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.subject_name}
          />
          <TextField
            margin="dense"
            name="four_month_period"
            label="Cuatrimestre"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.four_month_period}
          />
          <TextField
            margin="dense"
            name="hours_per_teacher"
            label="Horas por profesor"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.hours_per_teacher}
          />
          <TextField
            margin="dense"
            name="hours_per_student"
            label="Horas por estudiante"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.hours_per_student}
          />
          <TextField
            required
            select
            margin="dense"
            name="careerID"
            label="ID de Carrera"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.careerID}
          >
            {careers.map((career) => (
              <MenuItem key={career.id} value={career.id}>
                {career.career_name}
              </MenuItem>
            ))}
          </TextField> */}
          <Autocomplete
            disablePortal
            fullWidth
            options={teachers}
            getOptionLabel={(option) => option.teacher_name}
            renderInput={(params) => (
              <TextField
                required
                variant="standard"
                {...params}
                label="Maestros"
              />
            )}
            onChange={(e: SyntheticEvent, value: TeacherProps | null) =>
              handleChangeTeacher(e, value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">{formUpdate ? "Actualizar" : "Crear"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { AssignamentSubjects };
