import JobCard from "@/components/cards/JobCard";
import JobsFilter from "@/components/job/JobFilters";
import Pagination from "@/components/shared/Pagination";

import {
  fetchLocation,
  fetchJobs,
  fetchCountries,
} from "@/lib/actions/job.action";

import { Job } from "@/types";

interface Props {
  searchParams: Promise<{
    q?: string;
    location?: string;
    page?: string;
  }>;
}

const Page = async ({ searchParams }: Props) => {
  const resolvedSearchedParams = await searchParams;
  const userLocation = await fetchLocation();
  const queryLocation = resolvedSearchedParams.location || userLocation;

  const jobs =
    (await fetchJobs({
      query: `${resolvedSearchedParams.q || "Software Engineer"}, ${queryLocation}`,
      page: resolvedSearchedParams.page || "1",
    })) || [];

  const countries = await fetchCountries();
  const page = parseInt(resolvedSearchedParams.page || "1", 10);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={countries} />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs.length > 0 ? (
          jobs.map((job: Job) =>
            job.job_title && job.job_title.toLowerCase() !== "undefined" ? (
              <JobCard key={job.id} job={job} />
            ) : null
          )
        ) : (
          <div className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later.
          </div>
        )}
      </section>

      {jobs.length > 0 && (
        <Pagination pageNumber={page} isNext={jobs.length === 10} />
      )}
    </>
  );
};

export default Page;
