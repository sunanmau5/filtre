import { Input } from '@rebass/forms'
import React, { useEffect, useState } from 'react'
import { Button, Flex } from 'rebass'
import { useParamContext } from '../utils/param-context'
import { navigateToUrl } from '../utils/tabs'
import { useUrlContext } from '../utils/url-context'

export const NavigateAction: React.FC = () => {
  const [localParams, setLocalParams] = useState<string | null>(null)
  const { searchParams } = useParamContext()
  const { url } = useUrlContext()

  useEffect(() => {
    if (searchParams) {
      let str = '?'
      Object.entries(searchParams).map(([key, value], i) => {
        str = str.concat(
          key,
          '=',
          encodeURIComponent(value),
          i !== Object.keys(searchParams).length - 1 ? '&' : ''
        )
      })
      setLocalParams(str)
    }
  }, [searchParams])

  return (
    <Flex
      sx={{
        p: 3,
        gap: 3,
        borderTop: '1px solid rgb(209, 213, 219)'
      }}>
      <Input
        sx={{
          cursor: 'text',
          ':disabled': {
            backgroundColor: 'rgb(243, 244, 246)'
          }
        }}
        value={url.hostname + url.pathname + localParams}
        disabled
      />
      <Button
        sx={{
          minWidth: 75,
          py: 1,
          px: 2,
          cursor: 'pointer',
          borderRadius: 0,
          backgroundColor: 'rgb(96, 165, 250)',
          ':hover': { backgroundColor: 'rgb(59, 130, 246)' },
          ':active': { backgroundColor: 'rgb(37, 99, 235)' }
        }}
        onClick={() => navigateToUrl(url.origin + url.pathname + localParams)}>
        Navigate
      </Button>
    </Flex>
  )
}
