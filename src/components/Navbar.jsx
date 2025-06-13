import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsOpen(!isOpen)
  // const isHome = location.pathname === '/'

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          💸 Micro-Investor
        </Link>

        
          <>
            <div className="hidden md:flex space-x-6 font-medium">
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
              <Link to="/onboarding" className="hover:text-green-400 transition">
                Onboarding
              </Link>
              <Link to="/dashboard" className="hover:text-green-400 transition">
                Dashboard
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </>
        
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isOpen &&  (
          <motion.div
            className="md:hidden mt-2 space-y-2 flex flex-col items-start px-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="block text-sm py-1 hover:text-green-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/onboarding"
              className="block text-sm py-1 hover:text-green-400"
              onClick={() => setIsOpen(false)}
            >
              Onboarding
            </Link>
            <Link
              to="/dashboard"
              className="block text-sm py-1 hover:text-green-400"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
