import { Link } from "@remix-run/react";
import { Text } from "~/components";

export default function NoteIndexPage() {
  return (
    <Text>
      No note selected. Select a note on the left, or{" "}
      <Link to="new">create a new note.</Link>
    </Text>
  );
}
