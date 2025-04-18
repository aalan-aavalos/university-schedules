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
export declare type TeacherCreateFormInputValues = {
    teacher_name?: string;
    teacher_email?: string;
};
export declare type TeacherCreateFormValidationValues = {
    teacher_name?: ValidationFunction<string>;
    teacher_email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeacherCreateFormOverridesProps = {
    TeacherCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    teacher_name?: PrimitiveOverrideProps<TextFieldProps>;
    teacher_email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeacherCreateFormProps = React.PropsWithChildren<{
    overrides?: TeacherCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TeacherCreateFormInputValues) => TeacherCreateFormInputValues;
    onSuccess?: (fields: TeacherCreateFormInputValues) => void;
    onError?: (fields: TeacherCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeacherCreateFormInputValues) => TeacherCreateFormInputValues;
    onValidate?: TeacherCreateFormValidationValues;
} & React.CSSProperties>;
export default function TeacherCreateForm(props: TeacherCreateFormProps): React.ReactElement;
