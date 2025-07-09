import { ExtendedSearchFormType } from "@/types"
import ExtensionIcon from "@mui/icons-material/Extension"
import SearchIcon from "@mui/icons-material/Search"
import { Button, Card, Collapse, IconButton, Stack, TextField, Typography, useMediaQuery } from "@mui/material"

import styles from "./SearchInput.module.css"

interface SearchInputProps {
  isExtendedSearch: boolean
  setIsExtendedSearch: (isExtendedSearch: boolean) => void
  search: string
  setSearch: (search: string) => void
  extendedSearchForm: ExtendedSearchFormType
  setExtendedSearchForm: (extendedSearchForm: ExtendedSearchFormType) => void
  onResetExtendedForm: () => void
  onSearch: () => void
}

export const SearchInput = ({
  isExtendedSearch,
  setIsExtendedSearch,
  search,
  setSearch,
  extendedSearchForm,
  setExtendedSearchForm,
  onResetExtendedForm,
  onSearch,
}: SearchInputProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const typographyLevel = isMobile ? "body1" : "h6"
  const textFieldSize = isMobile ? "small" : "medium"
  const buttonSize = isMobile ? "small" : "medium"
  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <TextField
          size={textFieldSize}
          label='Введите поисковую строку'
          variant='standard'
          fullWidth
          disabled={isExtendedSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          size={buttonSize}
          aria-label='extended-search'
          color={isExtendedSearch ? "primary" : "default"}
          onClick={() => setIsExtendedSearch(!isExtendedSearch)}
        >
          <ExtensionIcon />
        </IconButton>
        <IconButton aria-label='search' size='large' onClick={() => onSearch()}>
          <SearchIcon />
        </IconButton>
      </div>
      <Collapse in={isExtendedSearch}>
        <form className={styles.form}>
          <Stack direction='column' gap='8px'>
            <Stack direction='row' justifyContent='space-between'>
              <Typography color='primary' variant={typographyLevel}>
                Учебное учреждение
              </Typography>
              <Button variant='outlined' onClick={() => onResetExtendedForm()} size={buttonSize}>
                Сбросить
              </Button>
            </Stack>
            <Stack direction='row' gap='24px'>
              <TextField
                size={textFieldSize}
                label='Название'
                variant='standard'
                fullWidth
                value={extendedSearchForm.university.name}
                onChange={(e) => {
                  setExtendedSearchForm({
                    ...extendedSearchForm,
                    university: {
                      ...extendedSearchForm.university,
                      name: e.target.value,
                    },
                  })
                }}
              />
              <TextField
                size={textFieldSize}
                label='Описание'
                variant='standard'
                fullWidth
                value={extendedSearchForm.university.description}
                onChange={(e) => {
                  setExtendedSearchForm({
                    ...extendedSearchForm,
                    university: {
                      ...extendedSearchForm.university,
                      description: e.target.value,
                    },
                  })
                }}
              />
            </Stack>
            <Stack direction='row' gap='24px' sx={{ width: "100%" }}>
              <Stack direction='column' gap='8px' sx={{ width: "100%" }}>
                <Typography color='primary' variant={typographyLevel}>
                  Подразделение
                </Typography>
                <TextField
                  size={textFieldSize}
                  label='Название'
                  variant='standard'
                  fullWidth
                  value={extendedSearchForm.faculty.name}
                  onChange={(e) => {
                    setExtendedSearchForm({
                      ...extendedSearchForm,
                      faculty: {
                        ...extendedSearchForm.faculty,
                        name: e.target.value,
                      },
                    })
                  }}
                />
                <TextField
                  size={textFieldSize}
                  label='Описание'
                  variant='standard'
                  fullWidth
                  value={extendedSearchForm.faculty.description}
                  onChange={(e) => {
                    setExtendedSearchForm({
                      ...extendedSearchForm,
                      faculty: {
                        ...extendedSearchForm.faculty,
                        description: e.target.value,
                      },
                    })
                  }}
                />
                <TextField
                  size={textFieldSize}
                  label='Области знания'
                  variant='standard'
                  fullWidth
                  value={extendedSearchForm.faculty.areasOfKnowledge}
                  onChange={(e) => {
                    setExtendedSearchForm({
                      ...extendedSearchForm,
                      faculty: {
                        ...extendedSearchForm.faculty,
                        areasOfKnowledge: e.target.value,
                      },
                    })
                  }}
                />
              </Stack>
              <Stack direction='column' gap='8px' sx={{ width: "100%" }}>
                <Typography color='primary' variant={typographyLevel}>
                  Специальность
                </Typography>
                <TextField
                  size={textFieldSize}
                  label='Название'
                  variant='standard'
                  fullWidth
                  value={extendedSearchForm.specialty.name}
                  onChange={(e) => {
                    setExtendedSearchForm({
                      ...extendedSearchForm,
                      specialty: {
                        ...extendedSearchForm.specialty,
                        name: e.target.value,
                      },
                    })
                  }}
                />
                <TextField
                  size={textFieldSize}
                  label='Описание'
                  variant='standard'
                  fullWidth
                  value={extendedSearchForm.specialty.description}
                  onChange={(e) => {
                    setExtendedSearchForm({
                      ...extendedSearchForm,
                      specialty: {
                        ...extendedSearchForm.specialty,
                        description: e.target.value,
                      },
                    })
                  }}
                />
                <TextField
                  size={textFieldSize}
                  label='Трудоустройство'
                  variant='standard'
                  fullWidth
                  value={extendedSearchForm.specialty.employment}
                  onChange={(e) => {
                    setExtendedSearchForm({
                      ...extendedSearchForm,
                      specialty: {
                        ...extendedSearchForm.specialty,
                        employment: e.target.value,
                      },
                    })
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Collapse>
    </Card>
  )
}
