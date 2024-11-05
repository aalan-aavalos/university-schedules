import { listAreas, listTeachers, listCareers, listStudents, listCoordinators } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient()

export const getAllAreas = async () => {
    const allAreas = await client.graphql({
        query: listAreas
    });

    return allAreas.data.listAreas.items
}

export const getAllTeachers = async () => {
    const allTeachers = await client.graphql({
        query: listTeachers
    });

    return allTeachers.data.listTeachers.items
}

export const getAllCareersWihtAPIKey = async () => {
    const allCareers = await client.graphql({
        query: listCareers,
        authMode: "apiKey"
    });

    return allCareers.data.listCareers.items
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