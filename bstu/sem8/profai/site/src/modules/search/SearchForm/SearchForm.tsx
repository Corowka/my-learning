"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { UserService } from "@/services/UserService"
import { ExtendedSearchFormType, SuggestionType } from "@/types"
import { Alert, Card, Pagination } from "@mui/material"

import { SpecialtyPreviewCard } from "../SpecialtyPreviewCard/SpecialtyPreviewCard"
import styles from "./SearchForm.module.css"
import { SearchInput } from "./SearchInput/SearchInput"
import { SpecialtyPreviewCardSkeleton } from "./SpecialtyPreviewCardSkeleton/SpecialtyPreviewCardSkeleton"

const INIT_EXTENDED_SEARCH_FORM: ExtendedSearchFormType = {
  university: { name: "", description: "" },
  faculty: { name: "", description: "", areasOfKnowledge: "" },
  specialty: { name: "", description: "", employment: "" },
}

const PAGE_SIZE = 10

export const SearchForm = () => {
  const [searchSuggestions, setSearchSuggestions] = useState<SuggestionType[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [isSearching, setIsSearching] = useState(false)
  const [isExtendedSearch, setIsExtendedSearch] = useState(false)
  const [search, setSearch] = useState("")
  const [extendedSearchForm, setExtendedSearchForm] = useState<ExtendedSearchFormType>(INIT_EXTENDED_SEARCH_FORM)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTotalPages(Math.ceil(searchSuggestions.length / PAGE_SIZE))
    setCurrentPage(0)
  }, [searchSuggestions])

  const onResetExtendedForm = () => {
    setExtendedSearchForm(INIT_EXTENDED_SEARCH_FORM)
  }

  const onSearch = useCallback(async () => {
    setIsSearching(true)
    let newSearchSuggestions: SuggestionType[] = []

    if (isExtendedSearch) {
      const { university, faculty, specialty } = extendedSearchForm
      const hasEmptySearch = [university, faculty, specialty].every((obj) => Object.values(obj).join("").trim() === "")
      if (hasEmptySearch) {
        newSearchSuggestions = await UserService.searchQuery("")
      } else {
        newSearchSuggestions = await UserService.searchExtended(extendedSearchForm)
      }
    } else {
      newSearchSuggestions = await UserService.searchQuery(search)
    }

    setSearchSuggestions(newSearchSuggestions)
    setIsSearching(false)
  }, [extendedSearchForm, isExtendedSearch, search])

  useEffect(() => {
    onSearch()
    // eslint-disable-next-line
  }, [])

  const onPageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage - 1)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0 })
      window.scrollTo({ top: 0 })
    }
  }

  const currentItems = searchSuggestions.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchInput
          isExtendedSearch={isExtendedSearch}
          setIsExtendedSearch={setIsExtendedSearch}
          search={search}
          setSearch={setSearch}
          extendedSearchForm={extendedSearchForm}
          setExtendedSearchForm={setExtendedSearchForm}
          onResetExtendedForm={onResetExtendedForm}
          onSearch={onSearch}
        />
      </div>
      <div className={styles.scroll} ref={scrollContainerRef}>
        <div className={styles.content}>
          {isSearching ? (
            <>
              <SpecialtyPreviewCardSkeleton />
              <SpecialtyPreviewCardSkeleton />
              <SpecialtyPreviewCardSkeleton />
            </>
          ) : (
            <>
              {currentItems.map((suggestion, i) => (
                <SpecialtyPreviewCard
                  key={`${suggestion.specialty.id}-${i}`}
                  university={suggestion.university}
                  faculty={suggestion.faculty}
                  specialty={suggestion.specialty}
                />
              ))}
              {!searchSuggestions.length && (
                <Alert variant='outlined' color='warning'>
                  По данному запросу ничего не найдено
                </Alert>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        {totalPages > 1 && (
          <Card className={styles.pagination}>
            <Pagination
              count={totalPages}
              page={currentPage + 1}
              onChange={onPageChange}
              color='primary'
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "text.primary",
                },
              }}
            />
          </Card>
        )}
      </div>
    </div>
  )
}
