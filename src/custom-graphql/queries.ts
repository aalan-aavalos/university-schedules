import { listAreas, listTeachers } from "@/graphql/queries";
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