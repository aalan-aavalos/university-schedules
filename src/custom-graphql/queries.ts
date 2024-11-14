import { listSubjects, subjectsByTeacherID } from "@/graphql/queries";
import { listAreas, listTeachers, listCareers, listStudents, listCoordinators } from "@/graphql/queries";
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

/* Students */
export const getAllCareersWihtAPIKey = async () => {
    const allCareers = await client.graphql({
        query: listCareers,
        authMode: "apiKey"
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

export const getAllStudents = async () => {
    const allStudents = await client.graphql({
        query: listStudents
    });

    return allStudents.data.listStudents.items
}

export const getAllCoordinators = async () => {

    const allCoordinators = await client.graphql({
        query: listCoordinators
    });

    return allCoordinators.data.listCoordinators.items
}

export const getAllSubjectsByTeacherID = async (teacherID: string) => {
    const allSubjects = await client.graphql({ query: subjectsByTeacherID, variables: { teacherID } })

    return allSubjects.data.subjectsByTeacherID.items
}