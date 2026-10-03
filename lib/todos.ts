import { Todo } from '@/types/todo';

export const todos: Todo[] = [
    {
        id: 1,
        title: 'Belajar React Server Components (RSC)',
        completed: true,
        createdAt: '2026-08-20',
    },
    {
        id: 2,
        title: 'Memahami Next. js App Router',
        completed: true,
        createdAt: '2026-08-21',
    },
    {

        id: 3,
        title: 'Membuat Aplikasi Todo List',
        completed: false,
        createdAt: '2026-08-22',
    },
    {
        id: 4,
        title: 'Eksplorasi Client Components',
        completed: false,
        createdAt: '2026-08-22',
    },
];

// Fungsi untuk mengambil semua data todos (halaman Home)
export async function getTodos(): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return todos;
}
// Fungsi untuk mengambil detail 1 todo berdasarkan ID (halaman Detail)
export async function getTodoDetail(id: string | number): Promise<Todo | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const todo = todos.find((item) => item.id === Number(id));
    return todo || null;
}