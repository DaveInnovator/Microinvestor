import React from "react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-4 py-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <h2 className="text-xl font-bold tracking-tight">
          💸 Micro-Investor
        </h2>

        <p className="text-sm leading-relaxed">
          &copy; {new Date().getFullYear()} Micro-Investor. All rights reserved.
          <br className="block md:hidden" />
          Built with 💖 by{" "}
          <a
            href="https://davidolarinde.vercel.app/"
            className="text-green-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            David Olarinde
          </a>
        </p>
      </div>
    </footer>
  )
}
