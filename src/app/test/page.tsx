"use client";

import { getAllSubjectsByCareerIdAndFourMonthPeriod } from "@/custom-graphql/queries";
import React from "react";

const page = () => {
  const getData = async () => {
    const res = await getAllSubjectsByCareerIdAndFourMonthPeriod(
      "abff032d-f05d-4923-8e93-b1d2b18255a9",
      3
    );

    console.log(res);
  };

  return (
    <div>
      <button onClick={getData}>get data</button>
    </div>
  );
};

export default page;
