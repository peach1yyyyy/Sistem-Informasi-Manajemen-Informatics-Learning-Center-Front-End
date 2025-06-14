import React, { useState, useEffect } from 'react';
import './tasklist.css';

const initialTasks = [
  { id: 1, title: 'Belajar ReactJS', deadline: '2025-05-05', completed: true },
  { id: 2, title: 'Kerjakan laporan KP', deadline: '2025-05-06', completed: true },
  { id: 3, title: 'Baca materi ML', deadline: '2025-05-08', completed: false },
];

// Fungsi format tanggal
const formatTanggal = (tanggal) => {
  if (!tanggal) return '';
  const [year, month, day] = tanggal.split('-');
  return `${day}/${month}/${year}`;
};

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  return (
    <div className="task-list">
      <h3>Daftar Tugas</h3>
      <ul>
        {tasks.map(task => (
          <li
            key={task.id}
            className={task.completed ? 'completed' : ''}
            onClick={() => toggleTask(task.id)}
          >
            <div className="checkbox" />
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <span className="task-deadline">📅 {formatTanggal(task.deadline)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
