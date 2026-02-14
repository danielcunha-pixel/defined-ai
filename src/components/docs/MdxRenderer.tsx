import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { mdxComponents } from "./MdxComponents";
import type { MDXComponents } from "mdx/types";

interface MdxRendererProps {
  source: string;
  components?: MDXComponents;
}

export function MdxRenderer({ source, components = {} }: MdxRendererProps) {
  return (
    <MDXRemote
      source={source}
      components={{ ...mdxComponents, ...components }}
    />
  );
}
