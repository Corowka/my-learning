import { useEffect, useState } from "react"

import { UserService } from "@/services/UserService"
import { SuggestionType } from "@/types"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { Box, Button, MobileStepper } from "@mui/material"

import {
    SpecialtyPreviewCardSkeleton
} from "../SearchForm/SpecialtyPreviewCardSkeleton/SpecialtyPreviewCardSkeleton"
import { SpecialtyPreviewCard } from "../SpecialtyPreviewCard/SpecialtyPreviewCard"
import styles from "./SuggestedSpecialties.module.css"

interface SuggestedSpecialtiesProps {
  testId: string | null
}

const PAGE_SIZE = 1

export const SuggestedSpecialties = ({ testId }: SuggestedSpecialtiesProps) => {
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([])
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!testId) return
      setLoading(true)
      try {
        const newSuggestions = await UserService.getSuggestions(testId)
        setSuggestions(newSuggestions)
      } finally {
        setLoading(false)
      }
    }
    fetchSuggestions()
  }, [testId])

  const onNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, Math.ceil(suggestions.length / PAGE_SIZE) - 1))
  }

  const onBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0))
  }

  const currentCards = suggestions.slice(activeStep * PAGE_SIZE, (activeStep + 1) * PAGE_SIZE)

  return (
    <Box className={styles.container}>
      <div className={styles.content}>
        {loading ? (
          <SpecialtyPreviewCardSkeleton />
        ) : (
          <>
            {currentCards.map((suggestion, i) => (
              <SpecialtyPreviewCard
                key={`${activeStep}-${i}`}
                specialty={suggestion.specialty}
                faculty={suggestion.faculty}
                university={suggestion.university}
                benefits={suggestion.benefits}
                skills={suggestion.skills}
                llmSkills={suggestion.llmSkills}
              />
            ))}
          </>
        )}
        <MobileStepper
          variant='dots'
          steps={Math.ceil(suggestions.length / PAGE_SIZE)}
          position='static'
          activeStep={activeStep}
          nextButton={
            <Button size='small' onClick={onNext} disabled={activeStep >= Math.ceil(suggestions.length / PAGE_SIZE) - 1}>
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size='small' onClick={onBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    </Box>
  )
}
