/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Coordinator } from "../API.ts";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CoordinatorUpdateFormInputValues = {
    coordinator_name?: string;
};
export declare type CoordinatorUpdateFormValidationValues = {
    coordinator_name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CoordinatorUpdateFormOverridesProps = {
    CoordinatorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    coordinator_name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CoordinatorUpdateFormProps = React.PropsWithChildren<{
    overrides?: CoordinatorUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    coordinator?: Coordinator;
    onSubmit?: (fields: CoordinatorUpdateFormInputValues) => CoordinatorUpdateFormInputValues;
    onSuccess?: (fields: CoordinatorUpdateFormInputValues) => void;
    onError?: (fields: CoordinatorUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CoordinatorUpdateFormInputValues) => CoordinatorUpdateFormInputValues;
    onValidate?: CoordinatorUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CoordinatorUpdateForm(props: CoordinatorUpdateFormProps): React.ReactElement;