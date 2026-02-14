import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

// These are the default MDX component mappings for prose styling
export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="ds-text-heading-xl font-semibold text-grey-100 mb-4 mt-8 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-3 mt-8 border-b border-grey-10 pb-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="ds-text-heading-sm font-semibold text-grey-100 mb-2 mt-6" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="ds-text-heading-xs font-semibold text-grey-100 mb-2 mt-4" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="ds-text-body-lg font-regular text-grey-70 mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-1 ds-text-body-md font-regular text-grey-70" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1 ds-text-body-md font-regular text-grey-70" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  code: ({ children, className, ...props }) => {
    // Inline code (not in a pre block)
    if (!className) {
      return (
        <code
          className="rounded bg-grey-10 px-1.5 py-0.5 text-[13px] font-medium text-purple-70"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre className="mb-4 overflow-x-auto rounded-[8px] border border-grey-20 bg-grey-100 p-4 text-sm leading-relaxed" {...props}>
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mb-4 border-l-4 border-purple-30 bg-purple-10/30 py-2 pl-4 pr-2 italic ds-text-body-md font-regular text-grey-70"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="mb-4 overflow-x-auto rounded-[8px] border border-grey-20">
      <table className="w-full text-left" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-grey-20 bg-grey-5 px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-grey-10 px-4 py-2.5 ds-text-body-sm font-regular text-grey-70" {...props}>
      {children}
    </td>
  ),
  hr: (props) => <hr className="my-8 border-grey-20" {...props} />,
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-purple-70 underline underline-offset-2 hover:text-purple-80 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-grey-100" {...props}>
      {children}
    </strong>
  ),
};
