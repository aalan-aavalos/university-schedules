/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCareer = /* GraphQL */ `query GetCareer($id: ID!) {
  getCareer(id: $id) {
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
` as GeneratedQuery<APITypes.GetCareerQueryVariables, APITypes.GetCareerQuery>;
export const listCareers = /* GraphQL */ `query ListCareers(
  $filter: ModelCareerFilterInput
  $limit: Int
  $nextToken: String
) {
  listCareers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      career_name
      level
      four_month_periods
      areaID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCareersQueryVariables,
  APITypes.ListCareersQuery
>;
export const careersByAreaID = /* GraphQL */ `query CareersByAreaID(
  $areaID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCareerFilterInput
  $limit: Int
  $nextToken: String
) {
  careersByAreaID(
    areaID: $areaID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      career_name
      level
      four_month_periods
      areaID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CareersByAreaIDQueryVariables,
  APITypes.CareersByAreaIDQuery
>;
export const getArea = /* GraphQL */ `query GetArea($id: ID!) {
  getArea(id: $id) {
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
` as GeneratedQuery<APITypes.GetAreaQueryVariables, APITypes.GetAreaQuery>;
export const listAreas = /* GraphQL */ `query ListAreas(
  $filter: ModelAreaFilterInput
  $limit: Int
  $nextToken: String
) {
  listAreas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      area_name
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListAreasQueryVariables, APITypes.ListAreasQuery>;
export const getSubject = /* GraphQL */ `query GetSubject($id: ID!) {
  getSubject(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetSubjectQueryVariables,
  APITypes.GetSubjectQuery
>;
export const listSubjects = /* GraphQL */ `query ListSubjects(
  $filter: ModelSubjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSubjectsQueryVariables,
  APITypes.ListSubjectsQuery
>;
export const subjectsByTeacherID = /* GraphQL */ `query SubjectsByTeacherID(
  $teacherID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSubjectFilterInput
  $limit: Int
  $nextToken: String
) {
  subjectsByTeacherID(
    teacherID: $teacherID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SubjectsByTeacherIDQueryVariables,
  APITypes.SubjectsByTeacherIDQuery
>;
export const subjectsByCareerID = /* GraphQL */ `query SubjectsByCareerID(
  $careerID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSubjectFilterInput
  $limit: Int
  $nextToken: String
) {
  subjectsByCareerID(
    careerID: $careerID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SubjectsByCareerIDQueryVariables,
  APITypes.SubjectsByCareerIDQuery
>;
export const getStudent = /* GraphQL */ `query GetStudent($id: ID!) {
  getStudent(id: $id) {
    id
    student_name
    student_email
    four_month_period
    careerID
    schedules
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetStudentQueryVariables,
  APITypes.GetStudentQuery
>;
export const listStudents = /* GraphQL */ `query ListStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      student_name
      student_email
      four_month_period
      careerID
      schedules
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentsQueryVariables,
  APITypes.ListStudentsQuery
>;
export const studentsByCareerID = /* GraphQL */ `query StudentsByCareerID(
  $careerID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  studentsByCareerID(
    careerID: $careerID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      student_name
      student_email
      four_month_period
      careerID
      schedules
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.StudentsByCareerIDQueryVariables,
  APITypes.StudentsByCareerIDQuery
>;
export const getTeacher = /* GraphQL */ `query GetTeacher($id: ID!) {
  getTeacher(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTeacherQueryVariables,
  APITypes.GetTeacherQuery
>;
export const listTeachers = /* GraphQL */ `query ListTeachers(
  $filter: ModelTeacherFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeachers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      teacher_name
      teacher_email
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTeachersQueryVariables,
  APITypes.ListTeachersQuery
>;
export const getCoordinator = /* GraphQL */ `query GetCoordinator($id: ID!) {
  getCoordinator(id: $id) {
    id
    coordinator_name
    coordinator_email
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCoordinatorQueryVariables,
  APITypes.GetCoordinatorQuery
>;
export const listCoordinators = /* GraphQL */ `query ListCoordinators(
  $filter: ModelCoordinatorFilterInput
  $limit: Int
  $nextToken: String
) {
  listCoordinators(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      coordinator_name
      coordinator_email
      areaID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCoordinatorsQueryVariables,
  APITypes.ListCoordinatorsQuery
>;
export const coordinatorsByAreaID = /* GraphQL */ `query CoordinatorsByAreaID(
  $areaID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCoordinatorFilterInput
  $limit: Int
  $nextToken: String
) {
  coordinatorsByAreaID(
    areaID: $areaID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      coordinator_name
      coordinator_email
      areaID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CoordinatorsByAreaIDQueryVariables,
  APITypes.CoordinatorsByAreaIDQuery
>;
