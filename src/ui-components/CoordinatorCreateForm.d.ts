/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CoordinatorCreateFormInputValues = {
    coordinator_name?: string;
    areaID?: string;
};
export declare type CoordinatorCreateFormValidationValues = {
    coordinator_name?: ValidationFunction<string>;
    areaID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CoordinatorCreateFormOverridesProps = {
    CoordinatorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    coordinator_name?: PrimitiveOverrideProps<TextFieldProps>;
    areaID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CoordinatorCreateFormProps = React.PropsWithChildren<{
    overrides?: CoordinatorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CoordinatorCreateFormInputValues) => CoordinatorCreateFormInputValues;
    onSuccess?: (fields: CoordinatorCreateFormInputValues) => void;
    onError?: (fields: CoordinatorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CoordinatorCreateFormInputValues) => CoordinatorCreateFormInputValues;
    onValidate?: CoordinatorCreateFormValidationValues;
} & React.CSSProperties>;
export default function CoordinatorCreateForm(props: CoordinatorCreateFormProps): React.ReactElement;
