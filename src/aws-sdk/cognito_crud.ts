// lib/cognitoCRUD.ts
import { cognitoClient } from "@/libs/aws";
import { ListUsersCommand, AdminCreateUserCommand, AdminUpdateUserAttributesCommand, AdminDeleteUserCommand, AdminSetUserPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";

/* interface UserProps {
    sub: string;
    email: string;
    preferred_username: string;
    "custom:area": string;
    "custom:career": string;
    "custom:four_month_period": number;
    "custom:rol": string
} */

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

export async function createUser(email: string): Promise<void> {
    try {
        const command = new AdminCreateUserCommand({
            UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
            Username: email,
            TemporaryPassword: "12345678",
            UserAttributes: [
                { Name: "email", Value: email },
                { Name: "email_verified", Value: "true" },
                { Name: "custom:rol", Value: "admin" },
                /* { Name: "email", Value: email },
                { Name: "email", Value: email },
                { Name: "email", Value: email },
                { Name: "email", Value: email }, */
            ],
            MessageAction: "SUPPRESS", // Opcional: suprime el correo de bienvenida
        });

        await cognitoClient.send(command);
        console.log("Usuario creado:", email);

        await setUserPassword(email, "12345678");
    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
}


export async function updateUserAttributes(username: string, attributes: { Name: string; Value: string }[]): Promise<void> {
    try {
        const command = new AdminUpdateUserAttributesCommand({
            UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
            Username: username,
            UserAttributes: attributes,
        });

        await cognitoClient.send(command);
        console.log("Atributos actualizados para el usuario:", username);
    } catch (error) {
        console.error("Error al actualizar atributos del usuario:", error);
    }
}

export async function deleteUser(username: string): Promise<void> {
    try {
        const command = new AdminDeleteUserCommand({
            UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
            Username: username,
        });

        await cognitoClient.send(command);
        console.log("Usuario eliminado:", username);
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