import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { PiTerminalThin } from "react-icons/pi";
import CopyButton from "./CopyButton";
import { icons } from "@/lib/icons";

export default function MarkdownPreview({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <Markdown
      className={cn("space-y-6", className)}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => {
          return (
            <h1 {...props} className={cn("text-3xl font-bold")}>
              {props.children}
            </h1>
          );
        },
        h2: ({ node, ...props }) => {
          return (
            <h1 {...props} className={cn("text-2xl font-bold")}>
              {props.children}
            </h1>
          );
        },
        h3: ({ node, ...props }) => {
          return (
            <h1 {...props} className={cn("text-xl font-bold")}>
              {props.children}
            </h1>
          );
        },
        code: ({ node, className, children, ...props }) => {
          const codelang = /language-(\w+)/.exec(className || "");
          if (codelang?.length) {
            const id = Math.floor(Math.random() * 100 + 1).toString();
            let Icon = PiTerminalThin;
            const isMatch = icons.hasOwnProperty(codelang[1]);
            if (isMatch) {
              Icon = icons[codelang[1] as keyof typeof icons];
            }
            return (
              <div
                className={cn(
                  "bg-gradient-dark text-gray-300 border rounded-md"
                )}>
                <div className="px-5 py-2 border-b flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon />
                    <span>{node?.data?.meta}</span>
                  </div>
                  <CopyButton id={id} />
                </div>
                <div className="overflow-x-auto w-full">
                  <div className="p-5" id={id}>
                    {children}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <code className={cn("p-1 bg-zinc-800 text-white rounded-md")}>
                {children}
              </code>
            );
          }
        },
      }}>
      {content}
    </Markdown>
  );
}
