import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Listar todas as tarefas (GET)
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true, // Traz os dados do projeto associado
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar tarefas' }, { status: 500 });
  }
}

// Criar uma nova tarefa (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, projectId } = body;

    // Validação básica
    if (!title || !projectId) {
      return NextResponse.json(
        { error: 'Título e ID do Projeto são obrigatórios' },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao criar tarefa' }, { status: 500 });
  }
}
