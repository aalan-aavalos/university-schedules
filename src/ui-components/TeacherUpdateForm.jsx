/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getTeacher } from "../graphql/queries";
import { updateTeacher } from "../graphql/mutations";
const client = generateClient();
export default function TeacherUpdateForm(props) {
  const {
    id: idProp,
    teacher: teacherModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    teacher_name: "",
    teacher_email: "",
  };
  const [teacher_name, setTeacher_name] = React.useState(
    initialValues.teacher_name
  );
  const [teacher_email, setTeacher_email] = React.useState(
    initialValues.teacher_email
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = teacherRecord
      ? { ...initialValues, ...teacherRecord }
      : initialValues;
    setTeacher_name(cleanValues.teacher_name);
    setTeacher_email(cleanValues.teacher_email);
    setErrors({});
  };
  const [teacherRecord, setTeacherRecord] = React.useState(teacherModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTeacher.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTeacher
        : teacherModelProp;
      setTeacherRecord(record);
    };
    queryData();
  }, [idProp, teacherModelProp]);
  React.useEffect(resetStateValues, [teacherRecord]);
  const validations = {
    teacher_name: [{ type: "Required" }],
    teacher_email: [{ type: "Required" }, { type: "Email" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          teacher_name,
          teacher_email,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateTeacher.replaceAll("__typename", ""),
            variables: {
              input: {
                id: teacherRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TeacherUpdateForm")}
      {...rest}
    >
      <TextField
        label="Teacher name"
        isRequired={true}
        isReadOnly={false}
        value={teacher_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teacher_name: value,
              teacher_email,
            };
            const result = onChange(modelFields);
            value = result?.teacher_name ?? value;
          }
          if (errors.teacher_name?.hasError) {
            runValidationTasks("teacher_name", value);
          }
          setTeacher_name(value);
        }}
        onBlur={() => runValidationTasks("teacher_name", teacher_name)}
        errorMessage={errors.teacher_name?.errorMessage}
        hasError={errors.teacher_name?.hasError}
        {...getOverrideProps(overrides, "teacher_name")}
      ></TextField>
      <TextField
        label="Teacher email"
        isRequired={true}
        isReadOnly={false}
        value={teacher_email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teacher_name,
              teacher_email: value,
            };
            const result = onChange(modelFields);
            value = result?.teacher_email ?? value;
          }
          if (errors.teacher_email?.hasError) {
            runValidationTasks("teacher_email", value);
          }
          setTeacher_email(value);
        }}
        onBlur={() => runValidationTasks("teacher_email", teacher_email)}
        errorMessage={errors.teacher_email?.errorMessage}
        hasError={errors.teacher_email?.hasError}
        {...getOverrideProps(overrides, "teacher_email")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || teacherModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || teacherModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
