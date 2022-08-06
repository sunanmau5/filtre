import { usePathnameContext } from '@contexts/pathname'
import React from 'react'
import { goBack } from 'react-chrome-extension-router'
import { ArrowLeft } from 'react-feather'
import { Flex, Text } from 'rebass'

export const BackButton: React.FC = () => {
  const { pathname, setPathname } = usePathnameContext()

  const handleClick = () => {
    setPathname((prev) => prev.substring(0, prev.lastIndexOf('/')))
    goBack()
  }

  if (!pathname) {
    return null
  }

  return (
    <Flex
      onClick={handleClick}
      sx={{
        px: 3,
        py: 2,
        gap: 2,
        alignItems: 'center',
        cursor: 'pointer',
        ':hover': { bg: 'rgb(219, 234, 254)' },
        borderBottom: '1px solid rgb(209, 213, 219)'
      }}>
      <ArrowLeft size={16} />
      <Text fontSize={14} sx={{ textDecoration: 'underline' }}>
        Back
      </Text>
    </Flex>
  )
}
