import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900" {...props} />,
        em: ({ node, ...props }) => <em className="italic text-slate-700" {...props} />,
        ul: ({ node, ...props }) => <ul className="ml-5 list-disc space-y-1" {...props} />,
        ol: ({ node, ...props }) => <ol className="ml-5 list-decimal space-y-1" {...props} />,
        li: ({ node, ...props }) => <li className="leading-7" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-blue-700 underline underline-offset-2" target="_blank" rel="noreferrer" {...props} />
        ),
        code: ({ node, className, ...props }) => (
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.82em] text-slate-800" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-2 border-blue-200 pl-3 text-slate-600" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
