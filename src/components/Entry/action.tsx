import { NavigateButton } from '@components/Button/navigate'
import { InputField } from '@components/InputField'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { useParameterContext } from '../../contexts/parameter'
import { usePathnameContext } from '../../contexts/pathname'
import { useUrlContext } from '../../contexts/url'

export const EntryAction: React.FC = () => {
  const {
    url: { origin, hostname }
  } = useUrlContext()
  const { searchParameters } = useParameterContext()
  const { pathname } = usePathnameContext()
  const [localParams, setLocalParams] = useState<string>('')

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
    } else {
      setLocalParams('')
    }
  }, [searchParameters])

  return (
    <Flex p={3} sx={{ gap: 3 }}>
      <InputField
        value={hostname + pathname + localParams}
        title={hostname + pathname + localParams}
        disabled
      />
      <NavigateButton url={origin + pathname + localParams} />
    </Flex>
  )
}
