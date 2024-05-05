const JobCard = ({ job }) => {
  console.log(job);
  return (
    <div className=" border p-4 rounded">
      <div className=""></div>
      <div className="flex">
        <div>
          <img className="h-10 rounded-full" src={job.logoUrl} alt="" />
        </div>
        <div className="">
          <div className="">{job.companyName}</div>
          <div className="">{job.jobRole}</div>
          <div className="">{job.location}</div>
        </div>
      </div>
      <h3>
        Estimated Salary: ${job.minJdSalary} - {job.maxJdSalary} LPA
      </h3>
      <h1>About Company:</h1>
      <p>{job.jobDetailsFromCompany.substring(0, 150)}</p>

      <p>Minimum Experience</p>
      <p className="mb-8">
        {job.minExp || "1"} - {job.maxExp} Years
      </p>
      <div className="border rounded-lg flex justify-center p-4 bg-[#55EFC4]">
        <button>Easy Apply</button>
      </div>
    </div>
  );
};

export default JobCard;
