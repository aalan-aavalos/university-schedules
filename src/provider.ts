/* Configuracion de Amplify */
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports"; // Asegúrate de que este archivo exista con las configuraciones necesarias

Amplify.configure(awsconfig);