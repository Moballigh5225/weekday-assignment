"use client";

const JobCard = ({ job }) => {
  console.log(job);
  return (
    <div className=" job-card border p-4 rounded-lg">
      <div className=""></div>
      <div className="flex">
        <div className="mr-4 ">
          <img className="h-10 rounded-full" src={job.logoUrl} alt="" />
        </div>
        <div className="">
          <div className="text-[#C3C3C3] text-[20px]">{job.companyName}</div>
          <div className="font-mono font-[800] mb-2">{job.jobRole}</div>
          <div className="mb-4">{job.location}</div>
        </div>
      </div>
      <div className="">
        <h3 className="text-[14px] mb-4 text-[#8D96A0]">
          Estimated Salary: ${job.minJdSalary} - {job.maxJdSalary} LPA
        </h3>
        <h1 className="font-[800]">About Company:</h1>
        <p className="mb-6">{job.jobDetailsFromCompany.substring(0, 150)}</p>

        <p className="text-[#8D96A0]">Minimum Experience</p>
        <p className="mb-8">{job.minExp || "1"} Years</p>
      </div>
      <div className="border  hover:bg-violet-600 active:bg-[#55EFC4]focus:outline-none focus:ring focus:ring-violet-300 rounded-lg flex justify-center p-4 bg-[#55EFC4]">
        <a href="https://weekday.works">
          <button>Easy Apply</button>
        </a>
      </div>
    </div>
  );
};

export default JobCard;
