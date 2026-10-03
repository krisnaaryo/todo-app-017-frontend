'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { todoService } from '@/services/todoService';
import { authService } from '@/services/authService';
import TaskNotFound from './components/TaskNotFound';
import TaskDetailCard from './components/TaskDetailCard';
import { Todo } from '@/types/todo';

export default function TodoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    if (!id) return;

    todoService
      .getTodoById(id)
      .then((data) => {
        if (data) {
          setTodo({
            id: data.id,
            title: data.todo,
            completed: Boolean(data.completed),
            createdAt: new Date().toISOString().split('T')[0],
          });
        } else {
          setTodo(null);
        }
      })
      .catch(() => {
        setTodo(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, router]);

  if (loading) {
    return (
      <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70">
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
          <p className="text-gray-400 text-sm">Memuat detail tugas...</p>
        </div>
      </main>
    );
  }

  if (!todo) {
    return <TaskNotFound id={id} />;
  }

  return <TaskDetailCard todo={todo} />;
}
