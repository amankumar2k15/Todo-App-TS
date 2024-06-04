import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const todos = await prisma.todo.findMany({});

    return NextResponse.json(
      {
        todos,
        totalPages: 5,
        currentPage: 1,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error getting todo", error);
    return NextResponse.json(
      {
        error: "Error getting todo",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const todo = await prisma.todo.create({
      data: body,
    });

    return NextResponse.json(
      {
        data: todo,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error creating todo", error);
    return NextResponse.json(
      {
        error: "Error creating todo",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...otherFields } = body;

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: otherFields,
    });

    return NextResponse.json(
      {
        data: todo,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error creating todo", error);
    return NextResponse.json(
      {
        error: "Error creating todo",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { _id } = await req.json();

    await prisma.todo.delete({
      where: {
        id: _id,
      },
    });

    return NextResponse.json(
      {
        message: "Todo deleted successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error delte todo", error);
    return NextResponse.json(
      {
        error: "Error delte todo",
      },
      {
        status: 500,
      }
    );
  }
}
