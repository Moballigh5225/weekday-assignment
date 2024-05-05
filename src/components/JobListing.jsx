"use client";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, Box } from "@mui/material";

function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const limit = 10; // Default limit
  const offset = 0; // Default offset
  const [searchQuery, setSearchQuery] = useState(""); // For company name search
  const [minExpFilter, setMinExpFilter] = useState(""); // For Min experience
  const [locationFilter, setLocationFilter] = useState(""); // For Location
  const [remoteFilter, setRemoteFilter] = useState(""); // For Remote/on-site
  const [roleFilter, setRoleFilter] = useState(""); // For Role
  const [minBasePayFilter, setMinBasePayFilter] = useState(""); // For Min base pay
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: limit,
            offset: (page - 1) * limit,
            searchQuery: searchQuery,
            minExpFilter: minExpFilter,
            locationFilter: locationFilter,
            remoteFilter: remoteFilter,
            roleFilter: roleFilter,
            minBasePayFilter: minBasePayFilter,
          }),
        }
      );
      const data = await response.json();
      const updatedJobs = [...jobs, ...data.jdList];
      setJobs(updatedJobs);
      setTotalCount(data?.totalCount || 0);
      setHasMore(updatedJobs.length < data.totalCount);
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredJobs = jobs
    .filter((job) =>
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((job) => {
      if (minExpFilter === "") return true;
      const minExp = parseInt(minExpFilter.split("-")[0]);
      return job.minExp >= minExp;
    })
    .filter((job) => {
      if (locationFilter === "") return true;
      return job.location.toLowerCase() === locationFilter.toLowerCase();
    })
    .filter((job) => {
      if (remoteFilter === "") return true;
      if (job.remote) {
        if (remoteFilter === "Remote/on-site") {
          return true; // Allow all jobs
        } else {
          return job.remote.toLowerCase() === remoteFilter.toLowerCase();
        }
      } else {
        return false; // Exclude jobs with undefined remote property
      }
    })
    .filter((job) => {
      if (roleFilter === "") return true;
      return job.jobRole.toLowerCase() === roleFilter.toLowerCase();
    })
    .filter((job) => {
      if (minBasePayFilter === "") return true;
      const minBasePay = parseInt(minBasePayFilter);
      return job.minJdSalary >= minBasePay;
    });

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMinExpChange = (minExp) => {
    setMinExpFilter(minExp);
  };

  const handleLocationChange = (location) => {
    setLocationFilter(location);
  };

  const handleRemoteChange = (remote) => {
    setRemoteFilter(remote);
  };

  const handleRoleChange = (role) => {
    setRoleFilter(role);
  };

  const handleMinBasePayChange = (minBasePay) => {
    setMinBasePayFilter(minBasePay);
  };

  // Get unique minJdSalary values for generating options
  const minBasePayOptions = Array.from(
    new Set(jobs.map((job) => job.minJdSalary))
  );

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMore
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);
  return (
    <div className="JobListing p-10">
      <div className="flex pb-20 justify-between filters-container ">
        {/* experience filter */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Min Exp
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={minExpFilter}
              autoWidth
              onChange={(e) => handleMinExpChange(e.target.value)}
              label="Min Experience"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="0-1">0-1 Years</MenuItem>
              <MenuItem value="1-3">1-3 Years</MenuItem>
              <MenuItem value="3-5">3-5 Years</MenuItem>
              <MenuItem value="5+">5+ Years</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Location */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={locationFilter}
              autoWidth
              onChange={(e) => handleLocationChange(e.target.value)}
              label="Location"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {Array.from(new Set(jobs.map((job) => job.location))).map(
                (location, index) => (
                  <MenuItem key={index} value={location}>
                    {location}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
        {/* Remote filter */}
        {/* <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Remote
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={remoteFilter}
              autoWidth
              onChange={(e) => handleRemoteChange(e.target.value)}
              label="Min Experience"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="0-1">Remote/on-site</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="On-Site">On-site</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        {/* role filter */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={roleFilter}
              autoWidth
              onChange={(e) => handleRoleChange(e.target.value)}
              label="Role"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {Array.from(new Set(jobs.map((job) => job.jobRole))).map(
                (role, index) => (
                  <MenuItem key={index} value={role}>
                    {role}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
        {/* Min Base Pay filter */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Min Base Pay
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={minBasePayFilter}
              autoWidth
              onChange={(e) => handleMinBasePayChange(e.target.value)}
              label="Min Base Pay"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {minBasePayOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option} LPA
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Search Filter */}
        <div>
          <Box className="mt-2 text-black ">
            <TextField
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search By Company"
            />
          </Box>
        </div>
      </div>
      {error && <p>Error: {error}</p>}
      <div className="grid grid-cols-4 gap-4">
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobListing;
