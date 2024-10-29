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
export declare type AreaCreateFormInputValues = {
    area_name?: string;
};
export declare type AreaCreateFormValidationValues = {
    area_name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AreaCreateFormOverridesProps = {
    AreaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    area_name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AreaCreateFormProps = React.PropsWithChildren<{
    overrides?: AreaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AreaCreateFormInputValues) => AreaCreateFormInputValues;
    onSuccess?: (fields: AreaCreateFormInputValues) => void;
    onError?: (fields: AreaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AreaCreateFormInputValues) => AreaCreateFormInputValues;
    onValidate?: AreaCreateFormValidationValues;
} & React.CSSProperties>;
export default function AreaCreateForm(props: AreaCreateFormProps): React.ReactElement;
