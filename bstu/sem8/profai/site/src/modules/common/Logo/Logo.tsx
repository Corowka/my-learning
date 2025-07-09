import { SxProps, Theme, Typography } from "@mui/material"

interface LogoProps {
  size?: 1 | 2 | 3 | 4 | 5
  style?: SxProps<Theme> | undefined
}

export const Logo = ({ size, style }: LogoProps) => {
  size ||= 5

  return (
    <Typography sx={{ ...style }} variant={`h${size}`} component='span' color='#232323'>
      Prof
      <Typography variant={`h${size}`} component='span' color='#4096ff'>
        AI
      </Typography>
    </Typography>
  )
}
