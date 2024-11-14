import {
    createArea, createCareer, createCoordinator, createStudent, createTeacher,
    deleteArea, deleteCareer, deleteCoordinator, deleteStudent, deleteTeacher,
    updateArea, updateCareer, updateCoordinator, updateStudent, updateTeacher,
    createSubject, updateSubject, deleteSubject
}
    from '@/graphql/mutations';
import { listSubjects } from '@/graphql/queries';

import { listCareers, listCoordinators, listStudents, listAreas, listTeachers } from '@/graphql/queries';

import { generateClient } from "aws-amplify/api";

const client = generateClient()

interface StudentProps {
    id?: string;
    student_name: string;
    student_email: string;
    four_month_period: number;
    careerID: string
}

interface TeacherProps {
    id?: string;
    teacher_name: string;
    teacher_email: string;
}

interface CoordinatorProps {
    id?: string;
    coordinator_name: string;
    coordinator_email: string;
    areaID: string
}

/* Teacher actions */
export const createOneTeacher = async (data: TeacherProps) => {
    const { teacher_name, teacher_email } = data

    const id = data.id as string

    await client.graphql({
        query: createTeacher,
        variables: { input: { id, teacher_name, teacher_email } }
    });

    const allTeachers = await client.graphql({
        query: listTeachers
    });

    return allTeachers.data.listTeachers.items
}

export const deleteOneTeacher = async (id_teacher: string) => {
    await client.graphql({
        query: deleteTeacher,
        variables: { input: { id: id_teacher } }
    });

    const allTeachers = await client.graphql({
        query: listTeachers
    });

    return allTeachers.data.listTeachers.items
}

export const updateOneTeacher = async (data: TeacherProps) => {
    const { teacher_name, teacher_email } = data

    const id = data.id as string

    await client.graphql({
        query: updateTeacher,
        variables: { input: { id, teacher_name, teacher_email } }
    });

    const allTeachers = await client.graphql({
        query: listTeachers
    });

    return allTeachers.data.listTeachers.items
}

/* Area actions */
export const createOneArea = async (area_name: string) => {
    await client.graphql({
        query: createArea,
        variables: { input: { "area_name": area_name, } }
    });

    const allAreas = await client.graphql({
        query: listAreas
    });

    return allAreas.data.listAreas.items
}

export const updateOneArea = async (id: string, new_area_name: string) => {
    await client.graphql({
        query: updateArea,
        variables: { input: { id, "area_name": new_area_name, } }
    });

    const allAreas = await client.graphql({
        query: listAreas
    });

    return allAreas.data.listAreas.items
}

export const deleteOneArea = async (id: string) => {
    await client.graphql({
        query: deleteArea,
        variables: { input: { id } }
    });

    const allAreas = await client.graphql({
        query: listAreas
    });

    return allAreas.data.listAreas.items
}

/* Career actions*/
interface CareerProps { id?: string; career_name: string; level: string; four_month_periods: number; areaID: string; }

export const createOneCareer = async (data: CareerProps) => {
    const { career_name, level, four_month_periods, areaID } = data;

    await client.graphql({
        query: createCareer,
        variables: { input: { career_name, level, four_month_periods, areaID } }
    });

    const allCareers = await client.graphql({
        query: listCareers,
    });

    return allCareers.data.listCareers.items
}

export const updateOneCareer = async (data: CareerProps) => {
    const { career_name, level, four_month_periods, areaID } = data;
    const id = data.id as string;

    await client.graphql({
        query: updateCareer,
        variables: { input: { id, career_name, level, four_month_periods, areaID } }
    });

    const allCareers = await client.graphql({
        query: listCareers
    });

    return allCareers.data.listCareers.items
}

export const deleteOneCareer = async (id: string) => {
    await client.graphql({
        query: deleteCareer,
        variables: { input: { id } }
    });

    const allCareers = await client.graphql({
        query: listCareers,
    });

    return allCareers.data.listCareers.items
}

/* Students */
export const createOneStudentWithAPIKey = async (data: StudentProps) => {
    const { id, student_name, student_email, four_month_period, careerID } = data

    await client.graphql({
        query: createStudent,
        variables: {
            input: { id, student_name, student_email, "four_month_period": +four_month_period, careerID }
        },
        authMode: "apiKey"
    });
}

/* Subjects actions */
interface SubjectProps { id?: string; subject_name: string; four_month_period: number; hours_per_teacher: number; hours_per_student: number; careerID: string, teacherID?: string }

export const createOneSubject = async (data: SubjectProps) => {
    const { subject_name, four_month_period, hours_per_teacher, hours_per_student, careerID } = data;

    await client.graphql({
        query: createSubject,
        variables: { input: { subject_name, four_month_period, hours_per_teacher, hours_per_student, careerID } }
    });

    const allSubjects = await client.graphql({
        query: listSubjects,
    });

    return allSubjects.data.listSubjects.items
}

export const updateOneSubject = async (data: SubjectProps) => {
    const { subject_name, four_month_period, hours_per_teacher, hours_per_student, careerID, teacherID } = data;
    const id = data.id as string;

    await client.graphql({
        query: updateSubject,
        variables: { input: { id, subject_name, four_month_period, hours_per_teacher, hours_per_student, careerID, teacherID } }
    });

    const allSubjects = await client.graphql({
        query: listSubjects
    });

    return allSubjects.data.listSubjects.items
}

export const deleteOneSubject = async (id: string) => {
    await client.graphql({
        query: deleteSubject,
        variables: { input: { id } }
    });

    const allSubjects = await client.graphql({
        query: listSubjects,
    });

    return allSubjects.data.listSubjects.items
}

export const createOneStudent = async (data: StudentProps) => {
    const { student_name, student_email, four_month_period, careerID } = data
    const id = data.id as string

    await client.graphql({
        query: createStudent,
        variables: {
            input: { id, student_name, student_email, four_month_period, careerID }
        },
    });

    const allStudents = await client.graphql({
        query: listStudents,
    });

    return allStudents.data.listStudents.items
}

export const updateOneStudent = async (data: StudentProps) => {
    const { student_email, student_name, four_month_period, careerID } = data

    const id = data.id as string

    await client.graphql({
        query: updateStudent,
        variables: { input: { id, student_email, student_name, four_month_period, careerID } }
    });

    const allStudents = await client.graphql({
        query: listStudents
    });

    return allStudents.data.listStudents.items
}

export const deleteOneStudent = async (id: string) => {
    await client.graphql({
        query: deleteStudent,
        variables: { input: { id } }
    });

    const allStudents = await client.graphql({
        query: listStudents,
    });

    return allStudents.data.listStudents.items
}

/* Coordinators */
export const createOneCoordinator = async (data: CoordinatorProps) => {
    const { coordinator_email, coordinator_name, areaID } = data

    const id = data.id as string

    await client.graphql({
        query: createCoordinator,
        variables: {
            input: { id, coordinator_email, coordinator_name, areaID }
        },
    });

    const allCoordinators = await client.graphql({
        query: listCoordinators
    });

    return allCoordinators.data.listCoordinators.items
}

export const updateOneCoordinator = async (data: CoordinatorProps) => {
    const { coordinator_email, coordinator_name, areaID } = data

    const id = data.id as string

    await client.graphql({
        query: updateCoordinator,
        variables: { input: { id, coordinator_email, coordinator_name, areaID } }
    });

    const allCoordinators = await client.graphql({
        query: listCoordinators
    });

    return allCoordinators.data.listCoordinators.items
}

export const deleteOneCoordinator = async (id: string) => {
    await client.graphql({
        query: deleteCoordinator,
        variables: { input: { id } }
    });

    const allCoordinators = await client.graphql({
        query: listCoordinators
    });

    return allCoordinators.data.listCoordinators.items
}