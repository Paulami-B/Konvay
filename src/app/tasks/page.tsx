"use client"

import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../convex/_generated/api'
import { deleteTask } from '../../../convex/tasks'

export default function page() {
    const tasks = useQuery(api.tasks.getTasks)
    const deleteTask = useMutation(api.tasks.deleteTask);
  return (
    <div className='p-10 flex flex-col gap-4'>
        <h1>Reak time database</h1>
        {tasks?.map((task) => (
            <div key={task._id} className='flex gap-2'>
                <span>{task.text}</span>
                <button onClick={async() => {
                    await deleteTask({id: task._id})
                }}>Delete</button>
            </div>
        ))}
    </div>
  )
}
