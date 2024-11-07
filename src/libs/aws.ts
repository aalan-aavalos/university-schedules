// lib/aws.ts
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";


// Configuración del cliente de Cognito
export const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string
    }
});
