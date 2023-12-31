import type { LinksFunction } from "@remix-run/server-runtime";

import { links as boxLinks } from "./Box/Box";
import { links as buttonLinks } from "./Button/Button";
import { links as checkboxLinks } from "./Checkbox/Checkbox";
import { links as flexLinks } from "./Flex/Flex";
import { links as gridLinks } from "./Grid/Grid";
import { links as headingLinks } from "./Heading/Heading";
import { links as linkLinks } from "./Link/sharedLink";
import { links as subheadingLinks } from "./Subheading/Subheading";
import { links as textLinks } from "./Text/Text";
import { links as textAreaLinks } from "./TextArea/TextArea";
import { links as textInputLinks } from "./TextInput/TextInput";

export { Box } from "./Box/Box";
export type { BoxProps } from "./Box/Box";

export { Button } from "./Button/Button";
export type { ButtonProps } from "./Button/Button";

export { Checkbox } from "./Checkbox/Checkbox";
export type { CheckboxProps } from "./Checkbox/Checkbox";

export { Flex } from "./Flex/Flex";
export type { FlexProps } from "./Flex/Flex";

export { Grid } from "./Grid/Grid";
export type { GridProps } from "./Grid/Grid";

export { Heading } from "./Heading/Heading";
export type { HeadingProps } from "./Heading/Heading";

export { ExternalLink } from "./Link/ExternalLink";
export type { ExternalLinkProps } from "./Link/ExternalLink";
export { InternalLink } from "./Link/InternalLink";
export type { InternalLinkProps } from "./Link/InternalLink";

export { Subheading } from "./Subheading/Subheading";
export type { SubheadingProps } from "./Subheading/Subheading";

export { Text } from "./Text/Text";
export type { TextProps } from "./Text/Text";

export { TextArea } from "./TextArea/TextArea";
export type { TextAreaProps } from "./TextArea/TextArea";

export { TextInput } from "./TextInput/TextInput";
export type { TextInputProps } from "./TextInput/TextInput";

export const componentLibraryLinks: LinksFunction = () => [
  ...boxLinks(),
  ...buttonLinks(),
  ...checkboxLinks(),
  ...flexLinks(),
  ...gridLinks(),
  ...headingLinks(),
  ...linkLinks(),
  ...subheadingLinks(),
  ...textLinks(),
  ...textAreaLinks(),
  ...textInputLinks(),
];
