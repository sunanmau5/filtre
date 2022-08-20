import { BasicCardSubtitle } from '@components/BasicCard/subtitle'
import { Parameter } from '@components/Parameter'
import { useUrlContext } from '@contexts/url'
import { withHover, withPadding, withTransition } from '@hoc/styles'
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
  const { state, mergeParameters } = useMergeParameters(
    search,
    paramKey,
    paramValue
  )

  const Wrapper = withHover(withTransition(withPadding(Flex)))

  const handleClick = () => {
    const parameters =
      path !== pathname ? `?${paramKey}=${paramValue}` : mergeParameters()
    const newUrl = `${origin}${path}${parameters}`
    updateCurrentTab(newUrl)
    setUrl({ ...url, search: parameters })
  }

  if (state === 'loading') return null
  if (state === 'error') throw Error('Error merging parameters')

  return (
    <Wrapper
      key={uuid}
      as="li"
      sx={{
        flexDirection: 'column',
        cursor: 'pointer',
        bg: 'white',
        borderRadius: 10
      }}
      onClick={handleClick}>
      <BasicCardSubtitle fontSize={12} truncate>
        {customPathname}
      </BasicCardSubtitle>
      <Parameter paramKey={paramKey} paramValue={paramValue} />
    </Wrapper>
  )
}
