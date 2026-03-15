"use client"

import { useState } from "react"
import api from "../services/api"
import { TaskStatus } from "../types/task"
import { Task } from "../types/task"
interface Props {
    close: () => void
    refresh: () => void
    task?: Task
}

export default function TaskCreation({ close, refresh, task }: Props) {

    const [title, setTitle] = useState(task?.title || "")
    const [description, setDescription] = useState(task?.description || "")
    const [status, setStatus] = useState<TaskStatus>(task?.status || "todo")
    const [assignedTo, setAssignedTo] = useState(task?.assignedTo || "")

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Unauthorised");
            return;
        }
        try {

            if (task) {
                // EDIT TASK
                await api.put(`/tasks/${task._id}`, {
                    title,
                    description,
                    status,
                    assignedTo
                }, {headers: {Authorization: `Bearer ${token}`}})
            } else {
                // CREATE TASK
                await api.post("/tasks/create", {
                    title,
                    description,
                    status,
                    assignedTo
                }, { headers: { Authorization: `Bearer ${token}` } })
            }

            refresh()
            close()

        } catch (error) {
            console.error("Task save failed", error)
        }
    }

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 p-4">

            <div className="bg-white p-6 rounded shadow w-96">

                <h2 className="text-lg font-semibold mb-4">
                    {task ? "Edit Task" : "Create Task"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TaskStatus)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Assigned To"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex justify-end gap-2 pt-2">

                        <button
                            type="button"
                            onClick={close}
                            className="px-3 py-1 bg-gray-300 rounded cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
                        >
                            {task ? "Update" : "Create"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

