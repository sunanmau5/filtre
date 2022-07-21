import { Input } from '@rebass/forms'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Button, Flex } from 'rebass'
import { useParamContext } from '../utils/param-context'
import { usePathnameContext } from '../utils/pathname-context'
import { navigateToUrl } from '../utils/tabs'
import { useUrlContext } from '../utils/url-context'

export const NavigateAction: React.FC = () => {
  const [localParams, setLocalParams] = useState<string>('')

  const { url } = useUrlContext()
  const { searchParams } = useParamContext()
  const { pathname } = usePathnameContext()

  useEffect(() => {
    if (!isEmpty(searchParams)) {
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
          borderColor: 'rgb(209, 213, 219)',
          ':disabled': { bg: 'rgb(243, 244, 246)' }
        }}
        value={url.hostname + pathname + localParams}
        title={url.hostname + pathname + localParams}
        disabled
      />
      <Button
        sx={{
          minWidth: 75,
          py: 1,
          px: 2,
          cursor: 'pointer',
          borderRadius: 0,
          bg: 'rgb(96, 165, 250)',
          ':hover': { bg: 'rgb(59, 130, 246)' },
          ':active': { bg: 'rgb(37, 99, 235)' }
        }}
        onClick={() => navigateToUrl(url.origin + pathname + localParams)}>
        Navigate
      </Button>
    </Flex>
  )
}
