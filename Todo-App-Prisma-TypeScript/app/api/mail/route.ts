import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { id, ...otherFields } = body;

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: otherFields,
    });

    const { NEXT_PUBLIC_PERSONAL_EMAIL, NEXT_PUBLIC_EMAIL_PASSWORD } =
      process.env;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NEXT_PUBLIC_PERSONAL_EMAIL,
        pass: NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });
    const testResult = await transport.verify();
    if (!testResult) throw new Error("Not verified user");

    let emailContent = "<div>";
    for (const [key, value] of Object.entries(body))
      emailContent += `<div><strong>${key}:</strong> ${value}</div>`;
    emailContent += "</div>";

    await transport.sendMail({
      from: NEXT_PUBLIC_PERSONAL_EMAIL,
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      subject: "TODO: " + body.email,
      html: emailContent,
    });

    return NextResponse.json({ success: true, message: body.email });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Please try again after some time",
      },
      {
        status: 500,
      }
    );
  }
}
