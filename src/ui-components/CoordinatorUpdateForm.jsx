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
import { getCoordinator } from "../graphql/queries";
import { updateCoordinator } from "../graphql/mutations";
const client = generateClient();
export default function CoordinatorUpdateForm(props) {
  const {
    id: idProp,
    coordinator: coordinatorModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    coordinator_name: "",
    areaID: "",
  };
  const [coordinator_name, setCoordinator_name] = React.useState(
    initialValues.coordinator_name
  );
  const [areaID, setAreaID] = React.useState(initialValues.areaID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = coordinatorRecord
      ? { ...initialValues, ...coordinatorRecord }
      : initialValues;
    setCoordinator_name(cleanValues.coordinator_name);
    setAreaID(cleanValues.areaID);
    setErrors({});
  };
  const [coordinatorRecord, setCoordinatorRecord] =
    React.useState(coordinatorModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCoordinator.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCoordinator
        : coordinatorModelProp;
      setCoordinatorRecord(record);
    };
    queryData();
  }, [idProp, coordinatorModelProp]);
  React.useEffect(resetStateValues, [coordinatorRecord]);
  const validations = {
    coordinator_name: [{ type: "Required" }],
    areaID: [{ type: "Required" }],
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
          coordinator_name,
          areaID,
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
            query: updateCoordinator.replaceAll("__typename", ""),
            variables: {
              input: {
                id: coordinatorRecord.id,
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
      {...getOverrideProps(overrides, "CoordinatorUpdateForm")}
      {...rest}
    >
      <TextField
        label="Coordinator name"
        isRequired={true}
        isReadOnly={false}
        value={coordinator_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinator_name: value,
              areaID,
            };
            const result = onChange(modelFields);
            value = result?.coordinator_name ?? value;
          }
          if (errors.coordinator_name?.hasError) {
            runValidationTasks("coordinator_name", value);
          }
          setCoordinator_name(value);
        }}
        onBlur={() => runValidationTasks("coordinator_name", coordinator_name)}
        errorMessage={errors.coordinator_name?.errorMessage}
        hasError={errors.coordinator_name?.hasError}
        {...getOverrideProps(overrides, "coordinator_name")}
      ></TextField>
      <TextField
        label="Area id"
        isRequired={true}
        isReadOnly={false}
        value={areaID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinator_name,
              areaID: value,
            };
            const result = onChange(modelFields);
            value = result?.areaID ?? value;
          }
          if (errors.areaID?.hasError) {
            runValidationTasks("areaID", value);
          }
          setAreaID(value);
        }}
        onBlur={() => runValidationTasks("areaID", areaID)}
        errorMessage={errors.areaID?.errorMessage}
        hasError={errors.areaID?.hasError}
        {...getOverrideProps(overrides, "areaID")}
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
          isDisabled={!(idProp || coordinatorModelProp)}
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
              !(idProp || coordinatorModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
