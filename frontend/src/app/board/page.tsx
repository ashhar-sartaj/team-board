"use client"
import { useEffect, useState } from "react"
import api from '../../services/api'
import { Task } from '../../types/task'
import Column from '../../components/column'
import TaskCreation from "@/components/taskCreation"
import { useRouter } from "next/navigation"


export default function Board() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [token, setToken] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const lsToken = localStorage.getItem("token");

        if (!lsToken) {
            router.push("/login");
            return;
        }

        setToken(lsToken);  // Set for future renders
        fetchTasks(lsToken); // Fetch immediately with token
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token")
        router.push("/login")
    }

    const fetchTasks = async (token: string) => {
        try {
            const res = await api.get("/tasks/getAll", {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res);
            setTasks(res.data.tasks || res.data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    const refreshTasks = () => {
        if (token) {
            fetchTasks(token);
        }
    };
    // useEffect(() => {
    //     const lsToken = localStorage.getItem("token")
    //     setToken(lsToken)
    //     if (!token) {
    //         router.push("/login")
    //     } else {
    //         fetchTasks()
    //     }

    // }, [])
    // const fetchTasks = async () => {
    //     const res = await api.get("/tasks/getAll", { headers: { Authorization: `Bearer ${token}` } })
    //     console.log(res)
    //     // setTasks(res.data.tasks || res.data)
    // }
    // useEffect(() => {
    //     fetchTasks()
    // }, [token])
    return (<>

        {/* <div className="flex justify-between mb-6">

            <h1 className="text-xl font-bold">Task Board</h1>

            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
                add task
            </button>

        </div> */}

        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
            <div className="flex gap-2">
                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
                    + Add Task
                </button>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
                    Logout
                </button>
            </div>
        </div>
        




        <div className="p-8 grid grid-cols-3 gap-6">

            <Column
                title="To Do"
                tasks={tasks.filter(t => t.status === "todo")}
                refresh={refreshTasks}
            />

            <Column
                title="In Progress"
                tasks={tasks.filter(t => t.status === "in-progress")}
                refresh={refreshTasks}
            />

            <Column
                title="Done"
                tasks={tasks.filter(t => t.status === "done")}
                refresh={refreshTasks}
            />

        </div>


        {showModal && (
            <TaskCreation
                close={() => setShowModal(false)}
                refresh={refreshTasks}
            />
        )}

    </>)
}