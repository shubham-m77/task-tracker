import { FaEdit, FaTrash } from "react-icons/fa";

export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      <div className="flex justify-between items-start">

        <h2 className="text-xl font-semibold text-slate-800">
          {task.title}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>

      </div>

      <p className="text-gray-500 mt-3 line-clamp-3">
        {task.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between mt-6">

        <span
          className={`text-sm font-medium ${
            task.status === "Completed"
              ? "text-green-600"
              : "text-orange-500"
          }`}
        >
          ● {task.status}
        </span>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(task)}
            className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            <FaEdit className="mx-auto" />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="w-10 h-10 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
          >
            <FaTrash className="mx-auto" />
          </button>

        </div>

      </div>

    </div>
  );
}