import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { Box, Button, Flex, Heading, InternalLink, Text } from "~/components";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
};

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <Box>
      <header>
        <Flex
          py={1}
          px={6}
          bg="blue-200"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Heading>
            <InternalLink to=".">Notes</InternalLink>
          </Heading>
          <Flex alignItems="baseline" gap={4}>
            <Text>{user.email}</Text>
            <Form action="/logout" method="post">
              <Button type="submit">Logout</Button>
            </Form>
          </Flex>
        </Flex>
      </header>

      <main>
        <Box p={6}>
          <InternalLink to="new">+ New Note</InternalLink>

          <hr />

          {data.noteListItems.length === 0 ? (
            <Text>No notes yet</Text>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <InternalLink to={note.id}>📝 {note.title}</InternalLink>
                </li>
              ))}
            </ol>
          )}
        </Box>

        <Box p={6}>
          <Outlet />
        </Box>
      </main>
    </Box>
  );
}
