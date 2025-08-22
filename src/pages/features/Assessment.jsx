import React from "react";

const Assessment = () => {
  const assessments = [
    {
      subject: "Mathematics",
      type: "Assignment",
      startDate: "2025-08-01",
      endDate: "2025-08-05",
      status: "Submitted",
    },
    {
      subject: "English",
      type: "Test",
      startDate: "2025-08-10",
      endDate: "2025-08-12",
      status: "Pending",
    },
    {
      subject: "Science",
      type: "Assignment",
      startDate: "2025-08-15",
      endDate: "2025-08-20",
      status: "Missed",
    },
  ];

  return (
    <div className="p-6 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Assessments</h1>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        <caption className="caption-bottom text-sm text-green-700 italic mt-2">
          <p>Note: Assessment records are updated regularly</p>
        </caption>

        {/* Table Header */}
        <thead className="bg-primaryPurple text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Subject
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Type
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Start Date
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              End Date
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Status
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {assessments.length > 0 ? (
            assessments.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
                <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                <td className="border border-gray-300 px-4 py-2">{item.startDate}</td>
                <td className="border border-gray-300 px-4 py-2">{item.endDate}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-medium ${
                    item.status === "Submitted"
                      ? "text-green-600"
                      : item.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border border-gray-300 px-4 py-6 text-center text-gray-500 italic"
              >
                No assessment records available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Assessment;
