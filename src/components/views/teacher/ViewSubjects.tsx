import React, { useEffect, useState } from "react";
import {
  getAllCareers,
  getAllSubjectsByTeacherID,
} from "@/custom-graphql/queries";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";

interface SubjectByTeacherProps {
  id: string;
  subject_name: string;
  schedule?: string | null;
  four_month_period: number;
  hours_per_teacher: number;
  hours_per_student: number;
  teacherID?: string | null;
  careerID: string;
  createdAt: string;
  updatedAt: string;
}

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

const ViewSubjects = ({ teacharID }: { teacharID: string | undefined }) => {
  const [subjects, setSubjects] = useState<Array<SubjectByTeacherProps>>([]);
  const [careers, setCareers] = useState<Array<CareerProps>>([]);

  const { showLoading, hideLoading, LoadingBackdrop } = useLoadingBackdrop();

  useEffect(() => {
    const excuteQuieries = async () => {
      try {
        showLoading();
        if (!teacharID) return;
        const res = await getAllSubjectsByTeacherID(teacharID);
        setSubjects(res);

        const res_careers = await getAllCareers();
        setCareers(res_careers);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    excuteQuieries();
  }, [hideLoading, showLoading, teacharID]);

  const querySubjectsById = async () => {
    try {
      showLoading();
      if (!teacharID) return;
      const res = await getAllSubjectsByTeacherID(teacharID);
      setSubjects(res);

      const res_careers = await getAllCareers();
      setCareers(res_careers);
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "subject_name",
      headerName: "Nombre de Materia",
      flex: 1,
      editable: true,
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
      field: "four_month_period",
      headerName: "Cuatrimestre",
      flex: 1,
    },
    {
      field: "hours_per_teacher",
      headerName: "Horas",
      flex: 1,
    },
    /* {
      field: "teacherID",
      headerName: "Maestro",
      flex: 1,
      renderCell: (params) => {
        const teacher = teachers.find((teacher) => teacher.id === params.value);
        return teacher ? teacher.teacher_name : "No asignado";
      },
    }, */
  ];

  return (
    <div>
      {LoadingBackdrop}
      <Box sx={{ height: "75vh", width: "75vw" }}>
        <Box sx={{ paddingBottom: 1, display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={querySubjectsById}>
            Consultar
          </Button>
        </Box>
        {subjects.length > 0 ? (
          <DataGrid columns={columns} rows={subjects} />
        ) : (
          <div>No hay materias disponibles</div>
        )}
      </Box>
    </div>
  );
};

export { ViewSubjects };
