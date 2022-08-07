import { NavigateButton } from '@components/Button/navigate'
import { InputField } from '@components/InputField'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { useParameterContext } from '../contexts/parameter'
import { usePathnameContext } from '../contexts/pathname'
import { useUrlContext } from '../contexts/url'

export const PopupAction: React.FC = () => {
  const [localParams, setLocalParams] = useState<string>('')

  const { url } = useUrlContext()
  const { searchParameters } = useParameterContext()
  const { pathname } = usePathnameContext()

  useEffect(() => {
    if (!isEmpty(searchParameters)) {
      let str = '?'
      Object.entries(searchParameters).map(([key, value], i) => {
        str = str.concat(
          key,
          '=',
          encodeURIComponent(value),
          i !== Object.keys(searchParameters).length - 1 ? '&' : ''
        )
      })
      setLocalParams(str)
    }
  }, [searchParameters])

  return (
    <Flex
      sx={{
        p: 3,
        gap: 3,
        borderTop: '1px solid rgb(209, 213, 219)'
      }}>
      <InputField
        value={url.hostname + pathname + localParams}
        title={url.hostname + pathname + localParams}
        disabled
      />
      <NavigateButton url={url.origin + pathname + localParams} />
    </Flex>
  )
}
