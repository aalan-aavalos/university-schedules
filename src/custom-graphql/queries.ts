import { listAreas, listCareers, listSubjects, listTeachers } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient()

/* Areas */
export const getAllAreas = async () => {
    const allAreas = await client.graphql({
        query: listAreas
    });

    return allAreas.data.listAreas.items
}

/* Teachers  */
export const getAllTeachers = async () => {
    const allTeachers = await client.graphql({
        query: listTeachers
    });

    return allTeachers.data.listTeachers.items
}

/* Career */
export const getAllCareers = async () => {
    const allCareers = await client.graphql({
        query: listCareers
    });

    return allCareers.data.listCareers.items
}
/* Subjects */
export const getAllSubjects = async () => {
    const allSubjects = await client.graphql({
        query: listSubjects
    });

    return allSubjects.data.listSubjects.items
}