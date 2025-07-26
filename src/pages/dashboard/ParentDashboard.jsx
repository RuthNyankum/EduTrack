import React from "react";
import studentOverview from "./OverviewData";

const ParentDashboard = () => {
  return (
    <div className=" text-black">
      <h1>this is the overview</h1>
      {studentOverview.map((data, index) => (
        <div className="flex  gap-2" key={index}>
          {/* student info card  */}
          <div className="card text-black  border-2 border-orange-500  w-58">
            <div className="card-body grid grid-flow-col grid-rows-3 gap-4 ">
              <img
                className="card-title w-30 row-span-3"
                src={data.studentInfo.profileImage}
                alt="profile-image"
              />
              <p className="justify-end col-span-2 ">{data.studentInfo.name}</p>
              <p className="justify-end col-span-2  row-span-2">
                {data.studentInfo.class}
              </p>
            </div>
          </div>

          {/* OverView ScoreInfo card  */}
<div className="card text-black border-2 border-orange-500 w-70">
  <div className="card-body grid grid-cols-2 gap-4">
    {/* Highest score */}
    <div>
      <p className="font-semibold">Highest Subject</p>
      <p>{data.subjects.best.name} - {data.subjects.best.score}</p>
    </div>

    {/* Lowest score */}
    <div>
      <p className="font-semibold">Lowest Subject</p>
      <p>{data.subjects.lowest.name} - {data.subjects.lowest.score}</p>
    </div>

    {/* Average score */}
    <div>
      <p className="font-semibold">Average Score</p>
      <p>{data.averageScore} </p>
    </div>
  </div>
</div>



        </div>
      ))}
    </div>
  );
};

export default ParentDashboard;
