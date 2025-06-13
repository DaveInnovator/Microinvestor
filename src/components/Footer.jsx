import React from "react";

export default function Footer() {
  return (
    <footer className=" bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
      
        <h2 className="text-2xl font-bold tracking-tight">
          💸 Micro-Investor
        </h2>

      
        <p className="text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} Micro-investor. All rights reserved. <br className="sm:hidden" />
          Built with 💖 by{" "}
          <a
            href="https://davidolarinde.vercel.app/"
            className="text-white-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            David Olarinde
          </a>
        </p>
      </div>
    </footer>
  );
}
