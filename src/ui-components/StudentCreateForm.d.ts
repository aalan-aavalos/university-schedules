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
export declare type StudentCreateFormInputValues = {
    student_name?: string;
};
export declare type StudentCreateFormValidationValues = {
    student_name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentCreateFormOverridesProps = {
    StudentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    student_name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StudentCreateFormProps = React.PropsWithChildren<{
    overrides?: StudentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StudentCreateFormInputValues) => StudentCreateFormInputValues;
    onSuccess?: (fields: StudentCreateFormInputValues) => void;
    onError?: (fields: StudentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StudentCreateFormInputValues) => StudentCreateFormInputValues;
    onValidate?: StudentCreateFormValidationValues;
} & React.CSSProperties>;
export default function StudentCreateForm(props: StudentCreateFormProps): React.ReactElement;
