import styles from "./alert.module.css"
import { useEffect } from 'react';

interface AlertProps {
  variant: string
  setError: (error: string | null) => void
  error: string | null
}

export const Alert = ({ variant, error, setError }: AlertProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 4000);
  }, [error]);

  return (
    <div className={styles.alert}>
      {error}
    </div>
  );
}