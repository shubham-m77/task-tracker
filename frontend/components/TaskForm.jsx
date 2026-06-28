import { useState, useEffect } from "react";

export default function TaskForm({
  onSubmit,
  editingTask,
  cancelEdit,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (form.title.trim().length < 3) {
      return alert("Title must be at least 3 characters.");
    }

    onSubmit(form);

    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border rounded-lg p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}