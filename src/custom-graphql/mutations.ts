import { createArea, createStudent, createTeacher, deleteArea, deleteTeacher, updateArea, updateTeacher } from '@/graphql/mutations';

import { listAreas, listTeachers } from '@/graphql/queries';

import { generateClient } from "aws-amplify/api";

const client = generateClient()

interface StudentProps {
    id: string;
    student_name: string;
    student_email: string;
    four_month_period: string;
    careerID: string
}

interface TeacherProps {
    id?: string;
    teacher_name: string;
    teacher_email: string;
}

/* Teacher actions */
export const createOneTeacher = async (data: TeacherProps) => {
    const { teacher_name, teacher_email } = data

    await client.graphql({
        query: createTeacher,
        variables: { input: { teacher_name, teacher_email } }
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


/* Students */

export const createOneStudentWithAPIKey = async (data: StudentProps) => {
    console.log(data);
    const { id, student_name, student_email, four_month_period, careerID } = data

    const newStudent = await client.graphql({
        query: createStudent,
        variables: {
            input: {
                id,
                student_name,
                student_email,
                "four_month_period": +four_month_period,
                careerID
            }
        },
        authMode: "apiKey"
    });


    console.log(newStudent);
}