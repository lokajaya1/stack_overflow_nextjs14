import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";

interface QuestionType {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: object[];
  createdAt: Date;
}

const Page = async ({ params, searchParams }: URLProps) => {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;

  const currentPage = resolvedSearchParams.page
    ? +resolvedSearchParams.page
    : 1;
  const searchQuery = resolvedSearchParams.q;

  const result = await getQuestionsByTagId({
    tagId: resolvedParams.id,
    page: currentPage,
    searchQuery,
  });

  console.log(result);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-11 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: QuestionType) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no tag question save to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={currentPage} isNext={result.isNext} />
      </div>
    </>
  );
};

export default Page;
