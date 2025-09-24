"use client";
import { useEffect, useState } from "react";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function LinksTable({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  const [links, setLinks] = useState<
    { text: string; id: string; link: string }[]
  >([]);

  const extractLinks = () => {
    // Create a new DOM parser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Extract links with proper typing
    const anchorElements = Array.from(doc.querySelectorAll("a"));
    const contentLinks = anchorElements.map((link: HTMLAnchorElement) => {
      // Ensure we're working with HTMLAnchorElement for better type safety
      return {
        text: link.innerHTML,
        id: generateSlug(link.innerHTML),
        link: link.getAttribute("href") || "", // Ensure link is always a string
      };
    });

    setLinks(contentLinks);
  };

  useEffect(() => {
    extractLinks();
  }, [content]);

  return (
    <div className={`w-full ${className}`}>
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Links Table</h2>
        <button
          type="button"
          onClick={extractLinks}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Links
        </button>
      </div> */}
      {links.length > 0 ? (
        // <table className="min-w-full bg-white border border-gray-200">
        //   <thead>
        //     <tr className="bg-gray-100">
        //       <th className="py-2 px-4 border-b text-left">Text</th>
        //       <th className="py-2 px-4 border-b text-left">Link</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {links.map((link) => (
        //       <tr key={link.id}>
        //         <td className="py-2 px-4 border-b">{link.text}</td>
        //         <td className="py-2 px-4 border-b">{link.link}</td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        <ul className="list-disc space-y-2 ml-5">
          {links.map((link) => {
            return (
              <li className=" break-all" key={link.id}>
                <a
                  href={link.link}
                  className="hover:text-blue-500 cursor-pointer"
                  target="_blank"
                >
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No links found in the content</p>
      )}
    </div>
  );
}
