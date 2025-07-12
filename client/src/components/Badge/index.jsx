const Badge = ({ isAdmin }) => {
  return (
    <span className={`inline-block text-sm font-medium px-3 py-1 rounded-2xl ${isAdmin ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
      {isAdmin ? "Administrator" : "User"}
    </span>
  );
};

export default Badge;
