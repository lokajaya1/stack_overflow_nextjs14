import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: string;
  page?: number;
  filter?: number;
}

const AllAnswers = ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        {totalAnswers} Answers
        <Filter filters={AnswerFilters} />
      </div>
    </div>
  );
};

export default AllAnswers;
