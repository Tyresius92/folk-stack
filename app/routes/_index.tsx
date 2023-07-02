import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import {
  Box,
  ExternalLink,
  Flex,
  Heading,
  InternalLink,
  Text,
} from "~/components";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main>
      <Box p={6}>
        <Box>
          <Box>
            <Box>
              <Flex flexDirection="column" alignItems="center">
                <Heading>Folk Stack</Heading>
                <Box>
                  {user ? (
                    <Link to="/notes">View Notes for {user.email}</Link>
                  ) : (
                    <Flex justifyContent="center" gap={6}>
                      <InternalLink to="/join">Sign up</InternalLink>
                      <InternalLink to="/login">Log In</InternalLink>
                    </Flex>
                  )}
                </Box>
                <Text>
                  Check the README.md file for instructions on how to get this
                  project deployed.
                </Text>
              </Flex>
              <Box>
                <img
                  src="https://image.pbs.org/poster_images/assets/The-Fiddle-and-the-Banjo-Origins-thumb.png"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    maxHeight: 800,
                    borderRadius: "var(--border-radius-4)",
                  }}
                />
              </Box>
              <Flex
                bg="blue-800"
                justifyContent="center"
                p={8}
                my={4}
                borderRadius={4}
              >
                <ExternalLink href="https://remix.run">
                  <img
                    src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                    alt="Remix"
                    height={200}
                  />
                </ExternalLink>
              </Flex>
            </Box>
          </Box>
        </Box>

        <Box>
          <Flex gap={8} flexWrap="wrap">
            {[
              {
                src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
                alt: "Fly.io",
                href: "https://fly.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/158238105-e7279a0c-1640-40db-86b0-3d3a10aab824.svg",
                alt: "PostgreSQL",
                href: "https://www.postgresql.org/",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
                alt: "Prisma",
                href: "https://prisma.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
                alt: "Cypress",
                href: "https://www.cypress.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
                alt: "MSW",
                href: "https://mswjs.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
                alt: "Vitest",
                href: "https://vitest.dev",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
                alt: "Testing Library",
                href: "https://testing-library.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                alt: "Prettier",
                href: "https://prettier.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                alt: "ESLint",
                href: "https://eslint.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                alt: "TypeScript",
                href: "https://typescriptlang.org",
              },
            ].map((img) => (
              <ExternalLink key={img.href} href={img.href}>
                <img
                  alt={img.alt}
                  src={img.src}
                  style={{
                    height: "var(--space-7)",
                    width: "var(--space--10)",
                    objectFit: "contain",
                  }}
                />
              </ExternalLink>
            ))}
          </Flex>
        </Box>
      </Box>
    </main>
  );
}
