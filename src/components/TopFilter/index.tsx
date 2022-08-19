import { BasicCardSubtitle } from '@components/BasicCard/subtitle'
import { Parameter } from '@components/Parameter'
import { useUrlContext } from '@contexts/url'
import useCustomPathname from '@hooks/use-custom-pathname'
import useMergeParameters from '@hooks/use-merge-parameters'
import React from 'react'
import { Flex } from 'rebass'
import { ITopFilter } from '../../types'
import { updateCurrentTab } from '../../utils/tabs'

interface Props {
  topFilter: ITopFilter
}

export const TopFilter: React.FC<Props> = (props) => {
  const {
    topFilter: { uuid, path, paramKey, paramValue }
  } = props
  const { url, setUrl } = useUrlContext()
  const { origin, hostname, pathname, search } = url

  const { customPathname } = useCustomPathname(hostname, path)
  const { state, mergedParameters } = useMergeParameters(
    pathname,
    search,
    path,
    paramKey,
    paramValue
  )

  const handleClick = () => {
    const newUrl = `${origin}${path}${mergedParameters}`
    updateCurrentTab(newUrl)
    setUrl({ ...url, search: mergedParameters })
  }

  if (state === 'loading') return null
  if (state === 'error') throw Error('Error loading top filter')

  return (
    <Flex
      key={uuid}
      as="li"
      sx={{
        flexDirection: 'column',
        px: 3,
        py: 2,
        cursor: 'pointer',
        bg: 'white',
        ':hover': { bg: 'rgb(219, 234, 254)' },
        ':active': { bg: 'rgb(191, 219, 254)' },
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        borderRadius: 10
      }}
      onClick={handleClick}>
      <BasicCardSubtitle fontSize={12} truncate>
        {customPathname}
      </BasicCardSubtitle>
      <Parameter paramKey={paramKey} paramValue={paramValue} />
    </Flex>
  )
}
