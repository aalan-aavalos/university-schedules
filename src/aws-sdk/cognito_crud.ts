// lib/cognitoCRUD.ts
import { cognitoClient } from "@/libs/aws";
import { ListUsersCommand, AdminCreateUserCommand, AdminUpdateUserAttributesCommand, AdminDeleteUserCommand, AdminSetUserPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";

interface UserProps {
    id?: string;
    email: string;
    preferred_username: string;
    rol?: string
    areaID?: string;
    careerID?: string;
    four_month_period?: number;

}

export async function listUsers() {
    try {
        const command = new ListUsersCommand({
            UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
            Limit: 10,
        });

        const result = await cognitoClient.send(command);

        return result.Users

    } catch (error) {
        console.error("Error al listar usuarios:", error);
    }
}

export async function createUser(data: UserProps) {
    const { email, preferred_username, areaID, careerID, four_month_period, rol } = data

    try {
        const command = new AdminCreateUserCommand({
            UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
            Username: email,
            TemporaryPassword: "12345678",
            UserAttributes: [
                { Name: "email", Value: email },
                { Name: "email_verified", Value: "true" },
                { Name: "preferred_username", Value: preferred_username },
                { Name: "custom:rol", Value: rol || "" },
                { Name: "custom:area", Value: areaID || "" },
                { Name: "custom:career", Value: careerID || "" },
                { Name: "custom:four_month_period", Value: four_month_period ? String(four_month_period) : "1" },

            ],
            MessageAction: "SUPPRESS", // Opcional: suprime el correo de bienvenida
        });

        const res = await cognitoClient.send(command);


        await setUserPassword(email, "12345678");

        return res.User?.Username
    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
}


export async function updateUserAttributes(data: UserProps) {
    const { id, preferred_username, areaID, careerID, four_month_period, rol } = data

    try {
        const command = new AdminUpdateUserAttributesCommand({
            UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
            Username: id,
            UserAttributes: [
                { Name: "preferred_username", Value: preferred_username },
                { Name: "custom:rol", Value: rol || "" },
                { Name: "custom:area", Value: areaID || "" },
                { Name: "custom:career", Value: careerID || "" },
                { Name: "custom:four_month_period", Value: four_month_period ? String(four_month_period) : "1" },

            ],
        });

        await cognitoClient.send(command);
    } catch (error) {
        console.error("Error al actualizar atributos del usuario:", error);
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        const command = new AdminDeleteUserCommand({
            UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
            Username: id,
        });

        await cognitoClient.send(command);
        console.log("Usuario eliminado:", id);
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
}

export async function setUserPassword(username: string, password: string): Promise<void> {
    try {
        const setPasswordCommand = new AdminSetUserPasswordCommand({
            UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
            Username: username,
            Password: password,
            Permanent: true, // Esto establece la contraseña como permanente
        });

        await cognitoClient.send(setPasswordCommand);
        console.log("Contraseña establecida como permanente para el usuario:", username);
    } catch (error) {
        console.error("Error al establecer la contraseña del usuario:", error);
    }
}