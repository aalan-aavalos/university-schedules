import { listSubjects, subjectsByTeacherID, getStudent } from "@/graphql/queries";
import { listAreas, listTeachers, listCareers, listStudents, listCoordinators } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";

type GeneratedQuery<InputType, OutputType> = string & {
    __generatedQueryInput: InputType;
    __generatedQueryOutput: OutputType;
};

const client = generateClient()

type ListSubjectsQueryVariables = {
    careerID: string;
    four_month_period: number;
};

type ListSubjectsQuery = {
    listSubjects: {
        items: Array<{
            hours_per_student: number;
            subject_name: string;
            schedule: string | null;
            teacherID: string;
            id: string
        }>
    }
};

const listSubjectsByCareerIdAndFourMonthPeriod = `query listSubjectsByCareerIdAndFourMonthPeriod(
$careerID: ID!, $four_month_period: Int!
) {
  listSubjects(
    filter: { careerID: { eq: $careerID }, four_month_period: { eq: $four_month_period } }
  ) {
    items {
      hours_per_student
      subject_name
      schedule
      teacherID
      id
    }
  }
}` as GeneratedQuery<
    ListSubjectsQueryVariables,
    ListSubjectsQuery
>;

/* Areas */
export const getAllAreas = async () => {
    const allAreas = await client.graphql({
        query: listAreas
    });

    return allAreas.data.listAreas.items
}

/* Teachers  */
export const getAllTeachers = async () => {
    const allTeachers = await client.graphql({
        query: listTeachers
    });

    return allTeachers.data.listTeachers.items
}

/* Career */
export const getAllCareers = async () => {
    const allCareers = await client.graphql({
        query: listCareers
    });
    return allCareers.data.listCareers.items
}

/* Students */
export const getAllCareersWihtAPIKey = async () => {
    const allCareers = await client.graphql({
        query: listCareers,
        authMode: "apiKey"
    });

    return allCareers.data.listCareers.items
}

/* Subjects */
export const getAllSubjects = async () => {
    const allSubjects = await client.graphql({
        query: listSubjects
    });

    return allSubjects.data.listSubjects.items
}

export const getAllStudents = async () => {
    const allStudents = await client.graphql({
        query: listStudents
    });

    return allStudents.data.listStudents.items
}

export const getAllCoordinators = async () => {

    const allCoordinators = await client.graphql({
        query: listCoordinators
    });

    return allCoordinators.data.listCoordinators.items
}

export const getAllSubjectsByTeacherID = async (teacherID: string) => {
    const allSubjects = await client.graphql({ query: subjectsByTeacherID, variables: { teacherID } })

    return allSubjects.data.subjectsByTeacherID.items
}

export const getAllSubjectsByCareerIdAndFourMonthPeriod = async (careerID: string, four_month_period: number) => {
    const allSubjects = await client.graphql({ query: listSubjectsByCareerIdAndFourMonthPeriod, variables: { careerID, four_month_period } })

    return allSubjects.data.listSubjects?.items
}

export const getSchedulesByUser = async (id: string) => {
    const allSubjects = await client.graphql({ query: getStudent, variables: { id } })

    return allSubjects.data.getStudent?.schedules
}