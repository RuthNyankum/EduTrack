function ClassCard({
  className,
  students,
  assessment,
  averageScore,
  attendance,
  onView,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col gap-3 font-poppins">
      <h3 className="text-lg font-bold text-gray-800">{className}</h3>
      <p className="text-gray-600 text-sm">Students: {students}</p>
      <p className="text-gray-600 text-sm">Assessment: {assessment}</p>
      <p className="text-gray-600 text-sm">Average Score: {averageScore}</p>
      <p className="text-gray-600 text-sm">Attendance: {attendance}</p>

      <button
        onClick={onView}
        className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md text-sm font-medium text-center mt-2"
      >
        View Class
      </button>
    </div>
  );
}

export default ClassCard;
