import React from 'react';
import Link from 'next/link';
import { getTasks } from '@/lib/tasks';
import ApiTodoList from './components/ApiTodoList';

export const metadata = {
  title: 'Integrasi External REST API (DummyJSON) - Modul 3',
  description: 'Modul Praktik Mahasiswa: Fetch API, Layer Services, Types, Lib, dan Next.js Route Handler',
};

export default async function ApiTodosPage() {
  let initialTasks: Awaited<ReturnType<typeof getTasks>>['tasks'] = [];
  try {
    // Memanggil data awal di Server Component melalui business logic helper
    const result = await getTasks({ limit: 15, skip: 0 });
    initialTasks = result.tasks;
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
  }

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-70">
          <header className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-dark-70 text-center">
              Daftar Tugas (Todo List)
            </h1>
          </header>
          <ApiTodoList initialTasks={initialTasks} />
        </div>
      </div>
    </main>
  );
}