import { createArea, createTeacher, deleteArea, deleteTeacher, updateArea, updateTeacher } from '@/graphql/mutations';
import { listAreas } from '@/graphql/queries';

import { generateClient } from "aws-amplify/api";

const client = generateClient()

/* Teacher actions */
export const createOneTeacher = async (teacher_name: string) => {
    const newTeacher = await client.graphql({
        query: createTeacher,
        variables: { input: { "teacher_name": teacher_name, } }
    });

    console.log(newTeacher)
}

export const deleteOneTeacher = async (id_teacher: string) => {
    const deletedTeacher = await client.graphql({
        query: deleteTeacher,
        variables: { input: { id: id_teacher } }
    });

    console.log(deletedTeacher)
}

export const updateOneTeacher = async (id: string, new_teacher_name: string) => {
    const updatedTeacher = await client.graphql({
        query: updateTeacher,
        variables: { input: { id, "teacher_name": new_teacher_name, } }
    });

    console.log(updatedTeacher)
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