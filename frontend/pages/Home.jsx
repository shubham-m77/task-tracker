import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

import {
    createTask,
    deleteTask,
    getTasks,
    updateTask,
} from "../services/taskApi";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Newest");

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {
            setLoading(true)
            const res = await getTasks();

            setTasks(res.data);

        } catch (err) {

            console.log(err);

        }
        finally {
            setLoading(false);
        }

    }
    const handleSubmit = async (task) => {
        try {
            if (editingTask) {
                const updated = await updateTask(editingTask._id, task);

                setTasks((prev) =>
                    prev.map((item) =>
                        item._id === updated.data._id ? updated.data : item
                    )
                );

                setEditingTask(null);

                toast.success("Task Updated");
            } else {
                const created = await createTask(task);

                setTasks((prev) => [created.data, ...prev]);

                toast.success("Task Created");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        try {
            await deleteTask(id);

            setTasks((prev) => prev.filter((task) => task._id !== id));

            toast.success("Task Deleted");
        } catch (err) {
            toast.error("Unable to delete task");
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const displayedTasks = useMemo(() => {
        let filtered = [...tasks];

        if (filter !== "All") {
            filtered = filtered.filter((task) => task.status === filter);
        }

        filtered.sort((a, b) => {
            if (sort === "Newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }

            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        return filtered;
    }, [tasks, filter, sort]);

    if (loading) {
        return <Loader />;
    }

    {
        !loading && tasks.length === 0 && (
            <div className="bg-white rounded-xl border p-12 text-center">
                <h2 className="text-xl font-semibold text-gray-700">
                    No Tasks Found
                </h2>

                <p className="text-gray-500 mt-2">
                    Create your first task.
                </p>
            </div>
        );
    }
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-100">
                <div className="max-w-6xl mx-auto px-5 py-8">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">
                                My Tasks
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Manage your daily work efficiently.
                            </p>
                        </div>

                        <div className="flex gap-3">

                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="bg-white border rounded-xl px-4 py-2 shadow-sm"
                            >
                                <option>All</option>
                                <option>Pending</option>
                                <option>Completed</option>
                            </select>

                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="bg-white border rounded-xl px-4 py-2 shadow-sm"
                            >
                                <option>Newest</option>
                                <option>Oldest</option>
                            </select>

                        </div>

                    </div>

                    <TaskForm
                        onSubmit={handleSubmit}
                        editingTask={editingTask}
                        cancelEdit={() => setEditingTask(null)}
                    />

                    {displayedTasks.length === 0 ? (

                        <div className="bg-white rounded-2xl shadow mt-8 p-16 text-center">

                            <h2 className="text-2xl font-semibold text-gray-700">
                                No Tasks Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Start by creating your first task 🚀
                            </p>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                            {displayedTasks.map((task) => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}

                        </div>

                    )}

                </div>
            </main>
        </>
    );
}