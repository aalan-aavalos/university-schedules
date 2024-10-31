import { listAreas, listTeachers, listCareers } from "@/graphql/queries";
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