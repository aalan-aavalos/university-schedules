/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCoordinator = /* GraphQL */ `subscription OnCreateCoordinator(
  $filter: ModelSubscriptionCoordinatorFilterInput
) {
  onCreateCoordinator(filter: $filter) {
    id
    coordinator_name
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCoordinatorSubscriptionVariables,
  APITypes.OnCreateCoordinatorSubscription
>;
export const onUpdateCoordinator = /* GraphQL */ `subscription OnUpdateCoordinator(
  $filter: ModelSubscriptionCoordinatorFilterInput
) {
  onUpdateCoordinator(filter: $filter) {
    id
    coordinator_name
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCoordinatorSubscriptionVariables,
  APITypes.OnUpdateCoordinatorSubscription
>;
export const onDeleteCoordinator = /* GraphQL */ `subscription OnDeleteCoordinator(
  $filter: ModelSubscriptionCoordinatorFilterInput
) {
  onDeleteCoordinator(filter: $filter) {
    id
    coordinator_name
    areaID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCoordinatorSubscriptionVariables,
  APITypes.OnDeleteCoordinatorSubscription
>;
export const onCreateTeacher = /* GraphQL */ `subscription OnCreateTeacher($filter: ModelSubscriptionTeacherFilterInput) {
  onCreateTeacher(filter: $filter) {
    id
    teacher_name
    subjects {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTeacherSubscriptionVariables,
  APITypes.OnCreateTeacherSubscription
>;
export const onUpdateTeacher = /* GraphQL */ `subscription OnUpdateTeacher($filter: ModelSubscriptionTeacherFilterInput) {
  onUpdateTeacher(filter: $filter) {
    id
    teacher_name
    subjects {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTeacherSubscriptionVariables,
  APITypes.OnUpdateTeacherSubscription
>;
export const onDeleteTeacher = /* GraphQL */ `subscription OnDeleteTeacher($filter: ModelSubscriptionTeacherFilterInput) {
  onDeleteTeacher(filter: $filter) {
    id
    teacher_name
    subjects {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTeacherSubscriptionVariables,
  APITypes.OnDeleteTeacherSubscription
>;
export const onCreateStudent = /* GraphQL */ `subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
  onCreateStudent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateStudentSubscriptionVariables,
  APITypes.OnCreateStudentSubscription
>;
export const onUpdateStudent = /* GraphQL */ `subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
  onUpdateStudent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateStudentSubscriptionVariables,
  APITypes.OnUpdateStudentSubscription
>;
export const onDeleteStudent = /* GraphQL */ `subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
  onDeleteStudent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteStudentSubscriptionVariables,
  APITypes.OnDeleteStudentSubscription
>;
export const onCreateSubject = /* GraphQL */ `subscription OnCreateSubject($filter: ModelSubscriptionSubjectFilterInput) {
  onCreateSubject(filter: $filter) {
    id
    subject_name
    schedule
    four_month_period
    careerID
    teacherID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSubjectSubscriptionVariables,
  APITypes.OnCreateSubjectSubscription
>;
export const onUpdateSubject = /* GraphQL */ `subscription OnUpdateSubject($filter: ModelSubscriptionSubjectFilterInput) {
  onUpdateSubject(filter: $filter) {
    id
    subject_name
    schedule
    four_month_period
    careerID
    teacherID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSubjectSubscriptionVariables,
  APITypes.OnUpdateSubjectSubscription
>;
export const onDeleteSubject = /* GraphQL */ `subscription OnDeleteSubject($filter: ModelSubscriptionSubjectFilterInput) {
  onDeleteSubject(filter: $filter) {
    id
    subject_name
    schedule
    four_month_period
    careerID
    teacherID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSubjectSubscriptionVariables,
  APITypes.OnDeleteSubjectSubscription
>;
export const onCreateArea = /* GraphQL */ `subscription OnCreateArea($filter: ModelSubscriptionAreaFilterInput) {
  onCreateArea(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAreaSubscriptionVariables,
  APITypes.OnCreateAreaSubscription
>;
export const onUpdateArea = /* GraphQL */ `subscription OnUpdateArea($filter: ModelSubscriptionAreaFilterInput) {
  onUpdateArea(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAreaSubscriptionVariables,
  APITypes.OnUpdateAreaSubscription
>;
export const onDeleteArea = /* GraphQL */ `subscription OnDeleteArea($filter: ModelSubscriptionAreaFilterInput) {
  onDeleteArea(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAreaSubscriptionVariables,
  APITypes.OnDeleteAreaSubscription
>;
export const onCreateCareer = /* GraphQL */ `subscription OnCreateCareer($filter: ModelSubscriptionCareerFilterInput) {
  onCreateCareer(filter: $filter) {
    id
    career_name
    level
    four_month_periods
    areaID
    subjects {
      nextToken
      __typename
    }
    students {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCareerSubscriptionVariables,
  APITypes.OnCreateCareerSubscription
>;
export const onUpdateCareer = /* GraphQL */ `subscription OnUpdateCareer($filter: ModelSubscriptionCareerFilterInput) {
  onUpdateCareer(filter: $filter) {
    id
    career_name
    level
    four_month_periods
    areaID
    subjects {
      nextToken
      __typename
    }
    students {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCareerSubscriptionVariables,
  APITypes.OnUpdateCareerSubscription
>;
export const onDeleteCareer = /* GraphQL */ `subscription OnDeleteCareer($filter: ModelSubscriptionCareerFilterInput) {
  onDeleteCareer(filter: $filter) {
    id
    career_name
    level
    four_month_periods
    areaID
    subjects {
      nextToken
      __typename
    }
    students {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCareerSubscriptionVariables,
  APITypes.OnDeleteCareerSubscription
>;
