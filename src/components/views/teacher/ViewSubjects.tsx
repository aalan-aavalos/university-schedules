import React, { useEffect, useState } from "react";
import { getAllSubjectsByTeacherID } from "@/custom-graphql/queries";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface SubjectByTeacherProps {
  id: string;
  subject_name: string;
  schedule?: string;
  four_month_period: number;
  hours_per_teacher: number;
  hours_per_student: number;
  teacherID: string;
  careerID: string;
}

const ViewSubjects = ({ teacharID }: { teacharID: string | undefined }) => {
  const [subjects, setSubjects] = useState<Array<SubjectByTeacherProps>>([]);

  useEffect(() => {
    const excuteQuieries = async () => {
      if (!teacharID) return;
      const res = await getAllSubjectsByTeacherID(teacharID);
      setSubjects(res);
    };

    excuteQuieries();
  }, [teacharID]);

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
    /* {
      field: "teacherID",
      headerName: "Maestro",
      flex: 1,
      renderCell: (params) => {
        const teacher = teachers.find((teacher) => teacher.id === params.value);
        return teacher ? teacher.teacher_name : "No asignado";
      },
    }, */
    /* {
      field: "careerID",
      headerName: "Carrera",
      flex: 1,
      renderCell: (params) => {
        const career = careers.find((career) => career.id === params.value);
        return career ? career.career_name : "Desconocido";
      },
    }, */
  ];

  return (
    <div>
      <Box sx={{ height: "75vh", width: "75vw" }}>
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
