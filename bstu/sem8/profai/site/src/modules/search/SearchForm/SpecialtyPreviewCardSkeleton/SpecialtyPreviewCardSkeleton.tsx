import { Box, Card, CardContent, Skeleton } from "@mui/material"

export const SpecialtyPreviewCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant='text' width='50%' height={42} />
        <Box display='flex' gap={2} sx={{ mt: 1 }}>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='stretch' width='100%'>
            <Skeleton variant='text' width='100%' height={30} />
            <Skeleton variant='text' width='100%' height={30} />
            <Skeleton variant='text' width='100%' height={30} />
            <Skeleton variant='text' width='100%' height={30} />
          </Box>
          <Skeleton variant='rectangular' width='20%' height={120} />
        </Box>
        <Skeleton variant='text' width='100%' height={30} />
        <Box display='flex' justifyContent='space-between' sx={{ mt: 1, mb: 1 }}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant='rounded' width={120} height={20} />
          ))}
        </Box>
        <Skeleton variant='text' width='100%' height={40} />
      </CardContent>
    </Card>
  )
}
