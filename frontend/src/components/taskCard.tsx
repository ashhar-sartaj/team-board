"use client"

import api from "@/services/api"
import { Task, TaskStatus } from "@/types/task"
import { useState } from "react"
import TaskCreation from "./taskCreation"

interface Props {
    task: Task
    refresh: () => void
}

export default function TaskCard({ task, refresh }: Props) {
    const [showEdit, setShowEdit] = useState(false)

    const deleteTask = async () => {

        const token = localStorage.getItem("token")
        if (!token) {
            alert("Unauthorised");
            return;
        }
        if (!confirm("Delete this task?")) return

        await api.delete(`/tasks/${task._id}`, {headers: {Authorization: `Bearer ${token}`}})

        refresh()

    }

    const updateStatus = async (status: TaskStatus) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorised");
            return;
        }
        try {
            
            await api.put(`/tasks/${task._id}`, { status }, {headers: {Authorization:`Bearer ${token}`}})
            refresh()
        } catch (err) {
            console.error("Failed to update status", err)
        }
    }

    return (

        <div className="bg-white p-4 rounded shadow">

            <h3 className="font-semibold">{task.title}</h3>

            <p className="text-sm text-gray-600">
                {task.description}
            </p>

            <p className="text-xs text-gray-500 mt-2">
                Assigned to: {task.assignedTo || "Unassigned"}
            </p>

            <div className="flex gap-2 mt-3">

                {task.status !== "todo" && (
                    <button
                        onClick={() => updateStatus("todo")}
                        className="text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer"
                    >
                        Move to ToDo
                    </button>
                )}

                {task.status !== "in-progress" && (
                    <button
                        onClick={() => updateStatus("in-progress")}
                        className="text-xs bg-yellow-200 px-2 py-1 rounded cursor-pointer"
                    >
                        Move to In-Progress
                    </button>
                )}

                {task.status !== "done" && (
                    <button
                        onClick={() => updateStatus("done")}
                        className="text-xs bg-green-200 px-2 py-1 rounded cursor-pointer"
                    >
                        Move to Done
                    </button>
                )}

            </div>

            <button
                onClick={deleteTask}
                className="text-xs bg-red-400 text-white px-2 py-1 m-2 rounded cursor-pointer"
            >
                Delete
            </button>

            <button
                onClick={() => setShowEdit(true)}
                className="text-xs bg-blue-400 text-white px-2 py-1 m-2 rounded cursor-pointer"
            >
                Edit
            </button>

            {showEdit && (
                <TaskCreation
                    task={task}
                    close={() => setShowEdit(false)}
                    refresh={refresh}
                />
            )}

        </div>

    )
}