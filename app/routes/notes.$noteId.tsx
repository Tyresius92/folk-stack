import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { Box, Button, Heading, Subheading, Text } from "~/components";

import { deleteNote, getNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  const note = await getNote({ id: params.noteId, userId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ note });
};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  await deleteNote({ id: params.noteId, userId });

  return redirect("/notes");
};

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Box>
      <Subheading>{data.note.title}</Subheading>
      <Text>{data.note.body}</Text>
      <hr />
      <Form method="post">
        <Button type="submit" variant="danger">
          Delete
        </Button>
      </Form>
    </Box>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <Box>An unexpected error occurred: {error.message}</Box>;
  }

  if (!isRouteErrorResponse(error)) {
    return <Heading>Unknown Error</Heading>;
  }

  if (error.status === 404) {
    return <Box>Note not found</Box>;
  }

  return <Box>An unexpected error occurred: {error.statusText}</Box>;
}
