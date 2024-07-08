import { useState, useEffect } from 'react'

interface useFetchProps {
  url: string
  skip?: boolean
}

export const useFetch = ({ url, skip = false }: useFetchProps) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      if (skip) return
      setIsLoading(true)
      try {
        const response = await fetch(url)
        const result = await response.json()
        if (response.ok) {
          setData(result)
        } else {
          setHasError(true)
          setErrorMessage(result)
        }
        setIsLoading(false)
      } catch (err: any) {
        setHasError(true)
        setErrorMessage(err.message)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return { data, isLoading, hasError, errorMessage }
}