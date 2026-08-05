import { desc } from "drizzle-orm";
import { getChatGPTUser } from "../../../../../app/chatgpt-auth";
import { getDb } from "../../../../../db";
import { notes } from "../../../db/schema";

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 10_000;

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  const detail =
    error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes('from "notes"')) {
    return "The notes table is unavailable. Generate the migration locally with `npm run db:generate`, then deploy so the platform can apply the generated SQL to the real D1 database.";
  }

  console.error("notes route failed", error);
  return "Unexpected error";
}

async function unauthorized(): Promise<Response | null> {
  const user = await getChatGPTUser();
  if (user) return null;
  return Response.json({ error: "authentication required" }, { status: 401 });
}

export async function GET() {
  try {
    const denied = await unauthorized();
    if (denied) return denied;

    const db = getDb();
    const rows = await db
      .select()
      .from(notes)
      .orderBy(desc(notes.createdAt), desc(notes.id))
      .limit(20);

    return Response.json({ notes: rows });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const denied = await unauthorized();
    if (denied) return denied;

    const payload: unknown = await request.json();
    if (typeof payload !== "object" || payload === null) {
      return Response.json({ error: "body must be a JSON object" }, { status: 400 });
    }

    const { title: rawTitle, content: rawContent } = payload as Record<string, unknown>;
    if (
      (rawTitle !== undefined && typeof rawTitle !== "string") ||
      (rawContent !== undefined && typeof rawContent !== "string")
    ) {
      return Response.json(
        { error: "title and content must be strings" },
        { status: 400 }
      );
    }

    const title = rawTitle?.trim() ?? "";
    const content = rawContent?.trim() ?? "";

    if (!title) {
      return Response.json({ error: "title is required" }, { status: 400 });
    }
    if (title.length > MAX_TITLE_LENGTH || content.length > MAX_CONTENT_LENGTH) {
      return Response.json({ error: "title or content is too long" }, { status: 400 });
    }

    const db = getDb();
    const [note] = await db.insert(notes).values({ title, content }).returning();
    return Response.json({ note }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: toRouteErrorMessage(error) },
      { status: 500 }
    );
  }
}
