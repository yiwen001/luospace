"use client";
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0,
  },
}

/**
 * DecryptedText
 *
 * Props:
 * - text: string
 * - speed?: number
 * - maxIterations?: number
 * - sequential?: boolean
 * - revealDirection?: "start" | "end" | "center"
 * - useOriginalCharsOnly?: boolean
 * - characters?: string
 * - className?: string          (applied to revealed/normal letters)
 * - parentClassName?: string    (applied to parent span)
 * - encryptedClassName?: string (applied to encrypted letters)
 * - animateOn?: "view" | "hover"  (default: "hover")
 */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true, // Changed default to true for left-to-right animation
  revealDirection = 'start', // Always start from left
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', // Removed special characters
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view', // Changed default to view
  ...props
}) {
  const [displayText, setDisplayText] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    let interval
    let currentIteration = 0

    const getNextIndex = (revealedSet) => {
      return revealedSet.size // Always return next index for left-to-right
    }

    const availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

    const shuffleText = (originalText, currentRevealed) => {
      const result = []
      for (let i = 0; i < originalText.length; i++) {
        if (i > currentRevealed.size) {
          break // 只显示到当前位置
        }
        if (originalText[i] === ' ') {
          result.push(' ')
        } else if (currentRevealed.has(i)) {
          result.push(originalText[i])
        } else {
          result.push(availableChars[Math.floor(Math.random() * availableChars.length)])
        }
      }
      return result.join('')
    }

    if (isHovering) {
      setIsScrambling(true)
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (prevRevealed.size < text.length) {
            const nextIndex = getNextIndex(prevRevealed)
            const newRevealed = new Set(prevRevealed)
            newRevealed.add(nextIndex)
            const newText = shuffleText(text, newRevealed)
            setDisplayText(newText)
            return newRevealed
          } else {
            clearInterval(interval)
            setIsScrambling(false)
            setDisplayText(text)
            return prevRevealed
          }
        })
      }, speed)
    } else {
      setDisplayText('')
      setRevealedIndices(new Set())
      setIsScrambling(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovering, text, speed])

  useEffect(() => {
    if (animateOn !== 'view') return

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true)
          setHasAnimated(true)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [animateOn, hasAnimated])

  const hoverProps =
    animateOn === 'hover'
      ? {
        onMouseEnter: () => setIsHovering(true),
        onMouseLeave: () => setIsHovering(false),
      }
      : {}

  return (
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...hoverProps} {...props}>
      <span style={styles.srOnly}>{text}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || !isScrambling || !isHovering

          return (
            <span
              key={index}
              className={isRevealedOrDone ? className : encryptedClassName}
            >
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}
