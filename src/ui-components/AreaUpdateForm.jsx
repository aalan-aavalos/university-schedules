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
import { getArea } from "../graphql/queries";
import { updateArea } from "../graphql/mutations";
const client = generateClient();
export default function AreaUpdateForm(props) {
  const {
    id: idProp,
    area: areaModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    area_name: "",
  };
  const [area_name, setArea_name] = React.useState(initialValues.area_name);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = areaRecord
      ? { ...initialValues, ...areaRecord }
      : initialValues;
    setArea_name(cleanValues.area_name);
    setErrors({});
  };
  const [areaRecord, setAreaRecord] = React.useState(areaModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getArea.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getArea
        : areaModelProp;
      setAreaRecord(record);
    };
    queryData();
  }, [idProp, areaModelProp]);
  React.useEffect(resetStateValues, [areaRecord]);
  const validations = {
    area_name: [{ type: "Required" }],
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
          area_name,
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
            query: updateArea.replaceAll("__typename", ""),
            variables: {
              input: {
                id: areaRecord.id,
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
      {...getOverrideProps(overrides, "AreaUpdateForm")}
      {...rest}
    >
      <TextField
        label="Area name"
        isRequired={true}
        isReadOnly={false}
        value={area_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              area_name: value,
            };
            const result = onChange(modelFields);
            value = result?.area_name ?? value;
          }
          if (errors.area_name?.hasError) {
            runValidationTasks("area_name", value);
          }
          setArea_name(value);
        }}
        onBlur={() => runValidationTasks("area_name", area_name)}
        errorMessage={errors.area_name?.errorMessage}
        hasError={errors.area_name?.hasError}
        {...getOverrideProps(overrides, "area_name")}
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
          isDisabled={!(idProp || areaModelProp)}
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
              !(idProp || areaModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
