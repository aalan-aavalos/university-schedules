/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCoordinatorInput = {
  id?: string | null,
  coordinator_name: string,
  areaID: string,
};

export type ModelCoordinatorConditionInput = {
  coordinator_name?: ModelStringInput | null,
  areaID?: ModelIDInput | null,
  and?: Array< ModelCoordinatorConditionInput | null > | null,
  or?: Array< ModelCoordinatorConditionInput | null > | null,
  not?: ModelCoordinatorConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Coordinator = {
  __typename: "Coordinator",
  id: string,
  coordinator_name: string,
  areaID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCoordinatorInput = {
  id: string,
  coordinator_name?: string | null,
  areaID?: string | null,
};

export type DeleteCoordinatorInput = {
  id: string,
};

export type CreateTeacherInput = {
  id?: string | null,
  teacher_name: string,
};

export type ModelTeacherConditionInput = {
  teacher_name?: ModelStringInput | null,
  and?: Array< ModelTeacherConditionInput | null > | null,
  or?: Array< ModelTeacherConditionInput | null > | null,
  not?: ModelTeacherConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Teacher = {
  __typename: "Teacher",
  id: string,
  teacher_name: string,
  subjects?: ModelSubjectConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelSubjectConnection = {
  __typename: "ModelSubjectConnection",
  items:  Array<Subject | null >,
  nextToken?: string | null,
};

export type Subject = {
  __typename: "Subject",
  id: string,
  subject_name: string,
  schedule?: Array< string > | null,
  four_month_period: number,
  careerID: string,
  teacherID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTeacherInput = {
  id: string,
  teacher_name?: string | null,
};

export type DeleteTeacherInput = {
  id: string,
};

export type CreateStudentInput = {
  id?: string | null,
  student_name: string,
  four_month_period: number,
  careerID: string,
};

export type ModelStudentConditionInput = {
  student_name?: ModelStringInput | null,
  four_month_period?: ModelIntInput | null,
  careerID?: ModelIDInput | null,
  and?: Array< ModelStudentConditionInput | null > | null,
  or?: Array< ModelStudentConditionInput | null > | null,
  not?: ModelStudentConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Student = {
  __typename: "Student",
  id: string,
  student_name: string,
  four_month_period: number,
  careerID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateStudentInput = {
  id: string,
  student_name?: string | null,
  four_month_period?: number | null,
  careerID?: string | null,
};

export type DeleteStudentInput = {
  id: string,
};

export type CreateSubjectInput = {
  id?: string | null,
  subject_name: string,
  schedule?: Array< string > | null,
  four_month_period: number,
  careerID: string,
  teacherID: string,
};

export type ModelSubjectConditionInput = {
  subject_name?: ModelStringInput | null,
  schedule?: ModelStringInput | null,
  four_month_period?: ModelIntInput | null,
  careerID?: ModelIDInput | null,
  teacherID?: ModelIDInput | null,
  and?: Array< ModelSubjectConditionInput | null > | null,
  or?: Array< ModelSubjectConditionInput | null > | null,
  not?: ModelSubjectConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateSubjectInput = {
  id: string,
  subject_name?: string | null,
  schedule?: Array< string > | null,
  four_month_period?: number | null,
  careerID?: string | null,
  teacherID?: string | null,
};

export type DeleteSubjectInput = {
  id: string,
};

export type CreateAreaInput = {
  id?: string | null,
  area_name: string,
};

export type ModelAreaConditionInput = {
  area_name?: ModelStringInput | null,
  and?: Array< ModelAreaConditionInput | null > | null,
  or?: Array< ModelAreaConditionInput | null > | null,
  not?: ModelAreaConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Area = {
  __typename: "Area",
  id: string,
  area_name: string,
  careers?: ModelCareerConnection | null,
  coordinators?: ModelCareerConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCareerConnection = {
  __typename: "ModelCareerConnection",
  items:  Array<Career | null >,
  nextToken?: string | null,
};

export type Career = {
  __typename: "Career",
  id: string,
  career_name: string,
  level: string,
  four_month_periods: number,
  areaID: string,
  subjects?: ModelStudentConnection | null,
  students?: ModelStudentConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelStudentConnection = {
  __typename: "ModelStudentConnection",
  items:  Array<Student | null >,
  nextToken?: string | null,
};

export type UpdateAreaInput = {
  id: string,
  area_name?: string | null,
};

export type DeleteAreaInput = {
  id: string,
};

export type CreateCareerInput = {
  id?: string | null,
  career_name: string,
  level: string,
  four_month_periods: number,
  areaID: string,
};

export type ModelCareerConditionInput = {
  career_name?: ModelStringInput | null,
  level?: ModelStringInput | null,
  four_month_periods?: ModelIntInput | null,
  areaID?: ModelIDInput | null,
  and?: Array< ModelCareerConditionInput | null > | null,
  or?: Array< ModelCareerConditionInput | null > | null,
  not?: ModelCareerConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateCareerInput = {
  id: string,
  career_name?: string | null,
  level?: string | null,
  four_month_periods?: number | null,
  areaID?: string | null,
};

export type DeleteCareerInput = {
  id: string,
};

export type ModelCoordinatorFilterInput = {
  id?: ModelIDInput | null,
  coordinator_name?: ModelStringInput | null,
  areaID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCoordinatorFilterInput | null > | null,
  or?: Array< ModelCoordinatorFilterInput | null > | null,
  not?: ModelCoordinatorFilterInput | null,
};

export type ModelCoordinatorConnection = {
  __typename: "ModelCoordinatorConnection",
  items:  Array<Coordinator | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelTeacherFilterInput = {
  id?: ModelIDInput | null,
  teacher_name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTeacherFilterInput | null > | null,
  or?: Array< ModelTeacherFilterInput | null > | null,
  not?: ModelTeacherFilterInput | null,
};

export type ModelTeacherConnection = {
  __typename: "ModelTeacherConnection",
  items:  Array<Teacher | null >,
  nextToken?: string | null,
};

export type ModelStudentFilterInput = {
  id?: ModelIDInput | null,
  student_name?: ModelStringInput | null,
  four_month_period?: ModelIntInput | null,
  careerID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelStudentFilterInput | null > | null,
  or?: Array< ModelStudentFilterInput | null > | null,
  not?: ModelStudentFilterInput | null,
};

export type ModelSubjectFilterInput = {
  id?: ModelIDInput | null,
  subject_name?: ModelStringInput | null,
  schedule?: ModelStringInput | null,
  four_month_period?: ModelIntInput | null,
  careerID?: ModelIDInput | null,
  teacherID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSubjectFilterInput | null > | null,
  or?: Array< ModelSubjectFilterInput | null > | null,
  not?: ModelSubjectFilterInput | null,
};

export type ModelAreaFilterInput = {
  id?: ModelIDInput | null,
  area_name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAreaFilterInput | null > | null,
  or?: Array< ModelAreaFilterInput | null > | null,
  not?: ModelAreaFilterInput | null,
};

export type ModelAreaConnection = {
  __typename: "ModelAreaConnection",
  items:  Array<Area | null >,
  nextToken?: string | null,
};

export type ModelCareerFilterInput = {
  id?: ModelIDInput | null,
  career_name?: ModelStringInput | null,
  level?: ModelStringInput | null,
  four_month_periods?: ModelIntInput | null,
  areaID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCareerFilterInput | null > | null,
  or?: Array< ModelCareerFilterInput | null > | null,
  not?: ModelCareerFilterInput | null,
};

export type ModelSubscriptionCoordinatorFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  coordinator_name?: ModelSubscriptionStringInput | null,
  areaID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCoordinatorFilterInput | null > | null,
  or?: Array< ModelSubscriptionCoordinatorFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionTeacherFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  teacher_name?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTeacherFilterInput | null > | null,
  or?: Array< ModelSubscriptionTeacherFilterInput | null > | null,
};

export type ModelSubscriptionStudentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  student_name?: ModelSubscriptionStringInput | null,
  four_month_period?: ModelSubscriptionIntInput | null,
  careerID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStudentFilterInput | null > | null,
  or?: Array< ModelSubscriptionStudentFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionSubjectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  subject_name?: ModelSubscriptionStringInput | null,
  schedule?: ModelSubscriptionStringInput | null,
  four_month_period?: ModelSubscriptionIntInput | null,
  careerID?: ModelSubscriptionIDInput | null,
  teacherID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSubjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionSubjectFilterInput | null > | null,
};

export type ModelSubscriptionAreaFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  area_name?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAreaFilterInput | null > | null,
  or?: Array< ModelSubscriptionAreaFilterInput | null > | null,
};

export type ModelSubscriptionCareerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  career_name?: ModelSubscriptionStringInput | null,
  level?: ModelSubscriptionStringInput | null,
  four_month_periods?: ModelSubscriptionIntInput | null,
  areaID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCareerFilterInput | null > | null,
  or?: Array< ModelSubscriptionCareerFilterInput | null > | null,
};

export type CreateCoordinatorMutationVariables = {
  input: CreateCoordinatorInput,
  condition?: ModelCoordinatorConditionInput | null,
};

export type CreateCoordinatorMutation = {
  createCoordinator?:  {
    __typename: "Coordinator",
    id: string,
    coordinator_name: string,
    areaID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCoordinatorMutationVariables = {
  input: UpdateCoordinatorInput,
  condition?: ModelCoordinatorConditionInput | null,
};

export type UpdateCoordinatorMutation = {
  updateCoordinator?:  {
    __typename: "Coordinator",
    id: string,
    coordinator_name: string,
    areaID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCoordinatorMutationVariables = {
  input: DeleteCoordinatorInput,
  condition?: ModelCoordinatorConditionInput | null,
};

export type DeleteCoordinatorMutation = {
  deleteCoordinator?:  {
    __typename: "Coordinator",
    id: string,
    coordinator_name: string,
    areaID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTeacherMutationVariables = {
  input: CreateTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type CreateTeacherMutation = {
  createTeacher?:  {
    __typename: "Teacher",
    id: string,
    teacher_name: string,
    subjects?:  {
      __typename: "ModelSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTeacherMutationVariables = {
  input: UpdateTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type UpdateTeacherMutation = {
  updateTeacher?:  {
    __typename: "Teacher",
    id: string,
    teacher_name: string,
    subjects?:  {
      __typename: "ModelSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTeacherMutationVariables = {
  input: DeleteTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type DeleteTeacherMutation = {
  deleteTeacher?:  {
    __typename: "Teacher",
    id: string,
    teacher_name: string,
    subjects?:  {
      __typename: "ModelSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateStudentMutationVariables = {
  input: CreateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type CreateStudentMutation = {
  createStudent?:  {
    __typename: "Student",
    id: string,
    student_name: string,
    four_month_period: number,
    careerID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStudentMutationVariables = {
  input: UpdateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type UpdateStudentMutation = {
  updateStudent?:  {
    __typename: "Student",
    id: string,
    student_name: string,
    four_month_period: number,
    careerID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStudentMutationVariables = {
  input: DeleteStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type DeleteStudentMutation = {
  deleteStudent?:  {
    __typename: "Student",
    id: string,
    student_name: string,
    four_month_period: number,
    careerID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSubjectMutationVariables = {
  input: CreateSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type CreateSubjectMutation = {
  createSubject?:  {
    __typename: "Subject",
    id: string,
    subject_name: string,
    schedule?: Array< string > | null,
    four_month_period: number,
    careerID: string,
    teacherID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSubjectMutationVariables = {
  input: UpdateSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type UpdateSubjectMutation = {
  updateSubject?:  {
    __typename: "Subject",
    id: string,
    subject_name: string,
    schedule?: Array< string > | null,
    four_month_period: number,
    careerID: string,
    teacherID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSubjectMutationVariables = {
  input: DeleteSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type DeleteSubjectMutation = {
  deleteSubject?:  {
    __typename: "Subject",
    id: string,
    subject_name: string,
    schedule?: Array< string > | null,
    four_month_period: number,
    careerID: string,
    teacherID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAreaMutationVariables = {
  input: CreateAreaInput,
  condition?: ModelAreaConditionInput | null,
};

export type CreateAreaMutation = {
  createArea?:  {
    __typename: "Area",
    id: string,
    area_name: string,
    careers?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    coordinators?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAreaMutationVariables = {
  input: UpdateAreaInput,
  condition?: ModelAreaConditionInput | null,
};

export type UpdateAreaMutation = {
  updateArea?:  {
    __typename: "Area",
    id: string,
    area_name: string,
    careers?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    coordinators?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAreaMutationVariables = {
  input: DeleteAreaInput,
  condition?: ModelAreaConditionInput | null,
};

export type DeleteAreaMutation = {
  deleteArea?:  {
    __typename: "Area",
    id: string,
    area_name: string,
    careers?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    coordinators?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCareerMutationVariables = {
  input: CreateCareerInput,
  condition?: ModelCareerConditionInput | null,
};

export type CreateCareerMutation = {
  createCareer?:  {
    __typename: "Career",
    id: string,
    career_name: string,
    level: string,
    four_month_periods: number,
    areaID: string,
    subjects?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    students?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCareerMutationVariables = {
  input: UpdateCareerInput,
  condition?: ModelCareerConditionInput | null,
};

export type UpdateCareerMutation = {
  updateCareer?:  {
    __typename: "Career",
    id: string,
    career_name: string,
    level: string,
    four_month_periods: number,
    areaID: string,
    subjects?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    students?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCareerMutationVariables = {
  input: DeleteCareerInput,
  condition?: ModelCareerConditionInput | null,
};

export type DeleteCareerMutation = {
  deleteCareer?:  {
    __typename: "Career",
    id: string,
    career_name: string,
    level: string,
    four_month_periods: number,
    areaID: string,
    subjects?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    students?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCoordinatorQueryVariables = {
  id: string,
};

export type GetCoordinatorQuery = {
  getCoordinator?:  {
    __typename: "Coordinator",
    id: string,
    coordinator_name: string,
    areaID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCoordinatorsQueryVariables = {
  filter?: ModelCoordinatorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoordinatorsQuery = {
  listCoordinators?:  {
    __typename: "ModelCoordinatorConnection",
    items:  Array< {
      __typename: "Coordinator",
      id: string,
      coordinator_name: string,
      areaID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CoordinatorsByAreaIDQueryVariables = {
  areaID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCoordinatorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CoordinatorsByAreaIDQuery = {
  coordinatorsByAreaID?:  {
    __typename: "ModelCoordinatorConnection",
    items:  Array< {
      __typename: "Coordinator",
      id: string,
      coordinator_name: string,
      areaID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTeacherQueryVariables = {
  id: string,
};

export type GetTeacherQuery = {
  getTeacher?:  {
    __typename: "Teacher",
    id: string,
    teacher_name: string,
    subjects?:  {
      __typename: "ModelSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTeachersQueryVariables = {
  filter?: ModelTeacherFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeachersQuery = {
  listTeachers?:  {
    __typename: "ModelTeacherConnection",
    items:  Array< {
      __typename: "Teacher",
      id: string,
      teacher_name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStudentQueryVariables = {
  id: string,
};

export type GetStudentQuery = {
  getStudent?:  {
    __typename: "Student",
    id: string,
    student_name: string,
    four_month_period: number,
    careerID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStudentsQueryVariables = {
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentsQuery = {
  listStudents?:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      id: string,
      student_name: string,
      four_month_period: number,
      careerID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type StudentsByCareerIDQueryVariables = {
  careerID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type StudentsByCareerIDQuery = {
  studentsByCareerID?:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      id: string,
      student_name: string,
      four_month_period: number,
      careerID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSubjectQueryVariables = {
  id: string,
};

export type GetSubjectQuery = {
  getSubject?:  {
    __typename: "Subject",
    id: string,
    subject_name: string,
    schedule?: Array< string > | null,
    four_month_period: number,
    careerID: string,
    teacherID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSubjectsQueryVariables = {
  filter?: ModelSubjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubjectsQuery = {
  listSubjects?:  {
    __typename: "ModelSubjectConnection",
    items:  Array< {
      __typename: "Subject",
      id: string,
      subject_name: string,
      schedule?: Array< string > | null,
      four_month_period: number,
      careerID: string,
      teacherID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SubjectsByCareerIDQueryVariables = {
  careerID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSubjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SubjectsByCareerIDQuery = {
  subjectsByCareerID?:  {
    __typename: "ModelSubjectConnection",
    items:  Array< {
      __typename: "Subject",
      id: string,
      subject_name: string,
      schedule?: Array< string > | null,
      four_month_period: number,
      careerID: string,
      teacherID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SubjectsByTeacherIDQueryVariables = {
  teacherID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSubjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SubjectsByTeacherIDQuery = {
  subjectsByTeacherID?:  {
    __typename: "ModelSubjectConnection",
    items:  Array< {
      __typename: "Subject",
      id: string,
      subject_name: string,
      schedule?: Array< string > | null,
      four_month_period: number,
      careerID: string,
      teacherID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAreaQueryVariables = {
  id: string,
};

export type GetAreaQuery = {
  getArea?:  {
    __typename: "Area",
    id: string,
    area_name: string,
    careers?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    coordinators?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAreasQueryVariables = {
  filter?: ModelAreaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAreasQuery = {
  listAreas?:  {
    __typename: "ModelAreaConnection",
    items:  Array< {
      __typename: "Area",
      id: string,
      area_name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCareerQueryVariables = {
  id: string,
};

export type GetCareerQuery = {
  getCareer?:  {
    __typename: "Career",
    id: string,
    career_name: string,
    level: string,
    four_month_periods: number,
    areaID: string,
    subjects?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    students?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCareersQueryVariables = {
  filter?: ModelCareerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCareersQuery = {
  listCareers?:  {
    __typename: "ModelCareerConnection",
    items:  Array< {
      __typename: "Career",
      id: string,
      career_name: string,
      level: string,
      four_month_periods: number,
      areaID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CareersByAreaIDQueryVariables = {
  areaID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCareerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CareersByAreaIDQuery = {
  careersByAreaID?:  {
    __typename: "ModelCareerConnection",
    items:  Array< {
      __typename: "Career",
      id: string,
      career_name: string,
      level: string,
      four_month_periods: number,
      areaID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCoordinatorSubscriptionVariables = {
  filter?: ModelSubscriptionCoordinatorFilterInput | null,
};

export type OnCreateCoordinatorSubscription = {
  onCreateCoordinator?:  {
    __typename: "Coordinator",
    id: string,
    coordinator_name: string,
    areaID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCoordinatorSubscriptionVariables = {
  filter?: ModelSubscriptionCoordinatorFilterInput | null,
};

export type OnUpdateCoordinatorSubscription = {
  onUpdateCoordinator?:  {
    __typename: "Coordinator",
    id: string,
    coordinator_name: string,
    areaID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCoordinatorSubscriptionVariables = {
  filter?: ModelSubscriptionCoordinatorFilterInput | null,
};

export type OnDeleteCoordinatorSubscription = {
  onDeleteCoordinator?:  {
    __typename: "Coordinator",
    id: string,
    coordinator_name: string,
    areaID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTeacherSubscriptionVariables = {
  filter?: ModelSubscriptionTeacherFilterInput | null,
};

export type OnCreateTeacherSubscription = {
  onCreateTeacher?:  {
    __typename: "Teacher",
    id: string,
    teacher_name: string,
    subjects?:  {
      __typename: "ModelSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTeacherSubscriptionVariables = {
  filter?: ModelSubscriptionTeacherFilterInput | null,
};

export type OnUpdateTeacherSubscription = {
  onUpdateTeacher?:  {
    __typename: "Teacher",
    id: string,
    teacher_name: string,
    subjects?:  {
      __typename: "ModelSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTeacherSubscriptionVariables = {
  filter?: ModelSubscriptionTeacherFilterInput | null,
};

export type OnDeleteTeacherSubscription = {
  onDeleteTeacher?:  {
    __typename: "Teacher",
    id: string,
    teacher_name: string,
    subjects?:  {
      __typename: "ModelSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnCreateStudentSubscription = {
  onCreateStudent?:  {
    __typename: "Student",
    id: string,
    student_name: string,
    four_month_period: number,
    careerID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnUpdateStudentSubscription = {
  onUpdateStudent?:  {
    __typename: "Student",
    id: string,
    student_name: string,
    four_month_period: number,
    careerID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnDeleteStudentSubscription = {
  onDeleteStudent?:  {
    __typename: "Student",
    id: string,
    student_name: string,
    four_month_period: number,
    careerID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSubjectSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectFilterInput | null,
};

export type OnCreateSubjectSubscription = {
  onCreateSubject?:  {
    __typename: "Subject",
    id: string,
    subject_name: string,
    schedule?: Array< string > | null,
    four_month_period: number,
    careerID: string,
    teacherID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubjectSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectFilterInput | null,
};

export type OnUpdateSubjectSubscription = {
  onUpdateSubject?:  {
    __typename: "Subject",
    id: string,
    subject_name: string,
    schedule?: Array< string > | null,
    four_month_period: number,
    careerID: string,
    teacherID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubjectSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectFilterInput | null,
};

export type OnDeleteSubjectSubscription = {
  onDeleteSubject?:  {
    __typename: "Subject",
    id: string,
    subject_name: string,
    schedule?: Array< string > | null,
    four_month_period: number,
    careerID: string,
    teacherID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAreaSubscriptionVariables = {
  filter?: ModelSubscriptionAreaFilterInput | null,
};

export type OnCreateAreaSubscription = {
  onCreateArea?:  {
    __typename: "Area",
    id: string,
    area_name: string,
    careers?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    coordinators?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAreaSubscriptionVariables = {
  filter?: ModelSubscriptionAreaFilterInput | null,
};

export type OnUpdateAreaSubscription = {
  onUpdateArea?:  {
    __typename: "Area",
    id: string,
    area_name: string,
    careers?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    coordinators?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAreaSubscriptionVariables = {
  filter?: ModelSubscriptionAreaFilterInput | null,
};

export type OnDeleteAreaSubscription = {
  onDeleteArea?:  {
    __typename: "Area",
    id: string,
    area_name: string,
    careers?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    coordinators?:  {
      __typename: "ModelCareerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCareerSubscriptionVariables = {
  filter?: ModelSubscriptionCareerFilterInput | null,
};

export type OnCreateCareerSubscription = {
  onCreateCareer?:  {
    __typename: "Career",
    id: string,
    career_name: string,
    level: string,
    four_month_periods: number,
    areaID: string,
    subjects?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    students?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCareerSubscriptionVariables = {
  filter?: ModelSubscriptionCareerFilterInput | null,
};

export type OnUpdateCareerSubscription = {
  onUpdateCareer?:  {
    __typename: "Career",
    id: string,
    career_name: string,
    level: string,
    four_month_periods: number,
    areaID: string,
    subjects?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    students?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCareerSubscriptionVariables = {
  filter?: ModelSubscriptionCareerFilterInput | null,
};

export type OnDeleteCareerSubscription = {
  onDeleteCareer?:  {
    __typename: "Career",
    id: string,
    career_name: string,
    level: string,
    four_month_periods: number,
    areaID: string,
    subjects?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    students?:  {
      __typename: "ModelStudentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
