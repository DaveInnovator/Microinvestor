import { motion } from 'framer-motion'

export default function OnboardingStep({ question, children }) {
  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <h2 className="text-xl font-semibold mb-6">{question}</h2>
      {children}
    </motion.div>
  )
}
