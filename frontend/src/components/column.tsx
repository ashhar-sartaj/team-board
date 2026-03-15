import { Task } from "@/types/task"
import TaskCard from "../components/taskCard"

interface Props {
    title: string
    tasks: Task[]
    refresh: () => void
}

export default function Column({ title, tasks, refresh }: Props) {

    return (

        <div className="bg-gray-100 rounded-lg p-4">

            <h2 className="font-bold mb-4">{title}</h2>

            <div className="space-y-3">

                {tasks.map(task => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        refresh={refresh}
                    />
                ))}

            </div>

        </div>

    )
}