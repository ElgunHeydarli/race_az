
import type React from "react"

import { motion } from "framer-motion"
import { fadeUpVariants } from "../../variants/fadeVariants"
import type { ReactNode } from "react"

interface AnimatedProductCardProps {
  children: ReactNode
  index: number
  className?: string
  skipAnimation?: boolean
}

export const AnimatedProductCard = ({
  children,
  index,
  className = "",
  skipAnimation = false,
}: AnimatedProductCardProps) => {
  if (skipAnimation) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeUpVariants}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedImage = ({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className={className}>
      {children}
    </motion.div>
  )
}

export const AnimatedButton = ({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

