import { listAreas } from "@/graphql/queries";

import { generateClient } from "aws-amplify/api";

const client = generateClient()

export const getAllAreas = async () => {
    const allAreas = await client.graphql({
        query: listAreas
    });

    return allAreas.data.listAreas.items
}