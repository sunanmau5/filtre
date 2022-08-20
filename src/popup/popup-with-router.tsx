import { BodyLoader } from '@components/Loader/body'
import { withLoadingIndicator } from '@hoc/indicator'
import useStoredFilters from '@hooks/use-stored-filters'
import React from 'react'
import { Router } from 'react-chrome-extension-router'
import { IPaths } from '../types'

interface Props {
  emptyView: () => React.ReactElement
  children(data: IPaths): React.ReactElement
}

export const PopupWithRouter: React.FC<Props> = (props) => {
  const { emptyView, children } = props
  const { state, entries } = useStoredFilters()

  const RouterWithLoader = withLoadingIndicator(Router)

  return entries ? (
    <RouterWithLoader isLoading={state === 'loading'} loader={<BodyLoader />}>
      {children(entries)}
    </RouterWithLoader>
  ) : (
    emptyView()
  )
}
