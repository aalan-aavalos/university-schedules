/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCareer = /* GraphQL */ `mutation CreateCareer(
  $input: CreateCareerInput!
  $condition: ModelCareerConditionInput
) {
  createCareer(input: $input, condition: $condition) {
    id
    career_name
    level
    four_month_periods
    subject {
      nextToken
      __typename
    }
    student {
      nextToken
      __typename
    }
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCareerMutationVariables,
  APITypes.CreateCareerMutation
>;
export const updateCareer = /* GraphQL */ `mutation UpdateCareer(
  $input: UpdateCareerInput!
  $condition: ModelCareerConditionInput
) {
  updateCareer(input: $input, condition: $condition) {
    id
    career_name
    level
    four_month_periods
    subject {
      nextToken
      __typename
    }
    student {
      nextToken
      __typename
    }
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCareerMutationVariables,
  APITypes.UpdateCareerMutation
>;
export const deleteCareer = /* GraphQL */ `mutation DeleteCareer(
  $input: DeleteCareerInput!
  $condition: ModelCareerConditionInput
) {
  deleteCareer(input: $input, condition: $condition) {
    id
    career_name
    level
    four_month_periods
    subject {
      nextToken
      __typename
    }
    student {
      nextToken
      __typename
    }
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCareerMutationVariables,
  APITypes.DeleteCareerMutation
>;
export const createArea = /* GraphQL */ `mutation CreateArea(
  $input: CreateAreaInput!
  $condition: ModelAreaConditionInput
) {
  createArea(input: $input, condition: $condition) {
    id
    area_name
    careers {
      nextToken
      __typename
    }
    coordinators {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAreaMutationVariables,
  APITypes.CreateAreaMutation
>;
export const updateArea = /* GraphQL */ `mutation UpdateArea(
  $input: UpdateAreaInput!
  $condition: ModelAreaConditionInput
) {
  updateArea(input: $input, condition: $condition) {
    id
    area_name
    careers {
      nextToken
      __typename
    }
    coordinators {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAreaMutationVariables,
  APITypes.UpdateAreaMutation
>;
export const deleteArea = /* GraphQL */ `mutation DeleteArea(
  $input: DeleteAreaInput!
  $condition: ModelAreaConditionInput
) {
  deleteArea(input: $input, condition: $condition) {
    id
    area_name
    careers {
      nextToken
      __typename
    }
    coordinators {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAreaMutationVariables,
  APITypes.DeleteAreaMutation
>;
export const createSubject = /* GraphQL */ `mutation CreateSubject(
  $input: CreateSubjectInput!
  $condition: ModelSubjectConditionInput
) {
  createSubject(input: $input, condition: $condition) {
    id
    subject_name
    schedule
    four_month_period
    hours_per_teacher
    hours_per_student
    teacherID
    careerID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSubjectMutationVariables,
  APITypes.CreateSubjectMutation
>;
export const updateSubject = /* GraphQL */ `mutation UpdateSubject(
  $input: UpdateSubjectInput!
  $condition: ModelSubjectConditionInput
) {
  updateSubject(input: $input, condition: $condition) {
    id
    subject_name
    schedule
    four_month_period
    hours_per_teacher
    hours_per_student
    teacherID
    careerID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSubjectMutationVariables,
  APITypes.UpdateSubjectMutation
>;
export const deleteSubject = /* GraphQL */ `mutation DeleteSubject(
  $input: DeleteSubjectInput!
  $condition: ModelSubjectConditionInput
) {
  deleteSubject(input: $input, condition: $condition) {
    id
    subject_name
    schedule
    four_month_period
    hours_per_teacher
    hours_per_student
    teacherID
    careerID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSubjectMutationVariables,
  APITypes.DeleteSubjectMutation
>;
export const createStudent = /* GraphQL */ `mutation CreateStudent(
  $input: CreateStudentInput!
  $condition: ModelStudentConditionInput
) {
  createStudent(input: $input, condition: $condition) {
    id
    student_name
    student_email
    four_month_period
    careerID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateStudentMutationVariables,
  APITypes.CreateStudentMutation
>;
export const updateStudent = /* GraphQL */ `mutation UpdateStudent(
  $input: UpdateStudentInput!
  $condition: ModelStudentConditionInput
) {
  updateStudent(input: $input, condition: $condition) {
    id
    student_name
    student_email
    four_month_period
    careerID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateStudentMutationVariables,
  APITypes.UpdateStudentMutation
>;
export const deleteStudent = /* GraphQL */ `mutation DeleteStudent(
  $input: DeleteStudentInput!
  $condition: ModelStudentConditionInput
) {
  deleteStudent(input: $input, condition: $condition) {
    id
    student_name
    student_email
    four_month_period
    careerID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteStudentMutationVariables,
  APITypes.DeleteStudentMutation
>;
export const createTeacher = /* GraphQL */ `mutation CreateTeacher(
  $input: CreateTeacherInput!
  $condition: ModelTeacherConditionInput
) {
  createTeacher(input: $input, condition: $condition) {
    id
    teacher_name
    teacher_email
    subjects {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTeacherMutationVariables,
  APITypes.CreateTeacherMutation
>;
export const updateTeacher = /* GraphQL */ `mutation UpdateTeacher(
  $input: UpdateTeacherInput!
  $condition: ModelTeacherConditionInput
) {
  updateTeacher(input: $input, condition: $condition) {
    id
    teacher_name
    teacher_email
    subjects {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTeacherMutationVariables,
  APITypes.UpdateTeacherMutation
>;
export const deleteTeacher = /* GraphQL */ `mutation DeleteTeacher(
  $input: DeleteTeacherInput!
  $condition: ModelTeacherConditionInput
) {
  deleteTeacher(input: $input, condition: $condition) {
    id
    teacher_name
    teacher_email
    subjects {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTeacherMutationVariables,
  APITypes.DeleteTeacherMutation
>;
export const createCoordinator = /* GraphQL */ `mutation CreateCoordinator(
  $input: CreateCoordinatorInput!
  $condition: ModelCoordinatorConditionInput
) {
  createCoordinator(input: $input, condition: $condition) {
    id
    coordinator_name
    coordinator_email
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCoordinatorMutationVariables,
  APITypes.CreateCoordinatorMutation
>;
export const updateCoordinator = /* GraphQL */ `mutation UpdateCoordinator(
  $input: UpdateCoordinatorInput!
  $condition: ModelCoordinatorConditionInput
) {
  updateCoordinator(input: $input, condition: $condition) {
    id
    coordinator_name
    coordinator_email
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCoordinatorMutationVariables,
  APITypes.UpdateCoordinatorMutation
>;
export const deleteCoordinator = /* GraphQL */ `mutation DeleteCoordinator(
  $input: DeleteCoordinatorInput!
  $condition: ModelCoordinatorConditionInput
) {
  deleteCoordinator(input: $input, condition: $condition) {
    id
    coordinator_name
    coordinator_email
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCoordinatorMutationVariables,
  APITypes.DeleteCoordinatorMutation
>;
