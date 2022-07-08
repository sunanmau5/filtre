import { formatDistance } from 'date-fns'
import React from 'react'
import { Flex } from 'rebass'
import { Param } from './param'
import { Entry } from 'src/types/entry-type'

type Props = Entry & {
  index: number
}

export const PopupEntry: React.FC<Props> = (props) => {
  const { lastUpdatedAt, uuid, paramKey, paramValue, count, index } = props

  const handleClick = () => {
    //TODO: navigate window to website with chosen param on click
  }

  return (
    <Flex
      onClick={handleClick}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        cursor: 'pointer',
        backgroundColor: index % 2 ? 'white' : 'rgb(243, 244, 246)',
        ':hover': { backgroundColor: 'rgb(219, 234, 254)' },
        ':active': { backgroundColor: 'rgb(191, 219, 254)' }
      }}>
      <Flex key={uuid} sx={{ flexDirection: 'column', gap: 2 }}>
        <Param paramKey={paramKey} value={paramValue} />
        <span>{formatDistance(lastUpdatedAt, new Date())}</span>
      </Flex>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          bg: 'rgb(96, 165, 250)',
          width: '2rem',
          height: '2rem',
          borderRadius: 9999,
          fontSize: '14px'
        }}>
        {count}
      </Flex>
    </Flex>
  )
}
