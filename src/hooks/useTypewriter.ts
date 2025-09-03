import { useEffect, useState } from 'react';

interface TypewriterOptions {
  delayBetweenWords?: number;
  deleteSpeed?: number;
  loop?: boolean;
  typeSpeed?: number;
  words: string[];
}

export function useTypewriter({
  words,
  typeSpeed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 2000,
  loop = true,
}: TypewriterOptions): { showCursor: boolean; text: string } {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            // Word completed, wait then start deleting
            setTimeout(() => setIsDeleting(true), delayBetweenWords);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentWord.slice(0, currentText.length - 1));
          } else {
            // Word deleted, move to next word
            setIsDeleting(false);
            if (loop || currentWordIndex < words.length - 1) {
              setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed,
    );

    return (): void => {
      clearTimeout(timeout);
    };
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop,
  ]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return (): void => {
      clearInterval(cursorInterval);
    };
  }, []);

  return {
    text: currentText,
    showCursor,
  };
}
