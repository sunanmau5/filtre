import { useParameterContext } from '@contexts/parameter'
import { usePathnameContext } from '@contexts/pathname'
import React from 'react'
import { goBack } from 'react-chrome-extension-router'
import { ChevronLeft } from 'react-feather'
import { Flex } from 'rebass'

export const BackButton: React.FC = () => {
  const { pathname, setPathname } = usePathnameContext()
  const { setSearchParameters } = useParameterContext()

  const handleClick = () => {
    setPathname((prev) => prev.substring(0, prev.lastIndexOf('/')))
    setSearchParameters({})
    goBack()
  }

  if (!pathname) {
    return null
  }

  return (
    <Flex
      p={1}
      onClick={handleClick}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ':hover': { bg: 'rgb(229, 231, 235)' },
        borderRadius: 5
      }}>
      <ChevronLeft size={16} />
    </Flex>
  )
}
