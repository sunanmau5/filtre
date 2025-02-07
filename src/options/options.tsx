import { BasicCard } from '@components/BasicCard'
import { BasicCardContent } from '@components/BasicCard/content'
import { BasicCardTitle } from '@components/BasicCard/title'
import { PrimaryButton } from '@components/Button/primary'
import { RedButton } from '@components/Button/red'
import { InputField } from '@components/InputField'
import { useConfigContext } from '@contexts/config'
import { Label } from '@rebass/forms'
import React from 'react'
import { Plus, Save, Trash2, X } from 'react-feather'
import { Flex, Image, Text } from 'rebass'
import {
  DEFAULT_TOP_FILTERS_COUNT,
  MAX_TOP_FILTERS_COUNT,
  MIN_TOP_FILTERS_COUNT
} from '../constants'
import { clearFilters, setStoredConfig } from '../utils/storage'

const ExcludeInput: React.FC<{
  onAdd: (key: string) => void
}> = ({ onAdd }) => {
  const [localKey, setLocalKey] = React.useState('')

  const handleAdd = () => {
    if (localKey) {
      onAdd(localKey)
      setLocalKey('')
    }
  }

  return (
    <Flex width={1} sx={{ gap: 2 }}>
      <InputField
        id="exclude"
        name="exclude"
        value={localKey}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.code === 'Enter') handleAdd()
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLocalKey(e.target.value)
        }
      />
      <PrimaryButton
        sx={{ minWidth: 40 }}
        onClick={handleAdd}
        disabled={!localKey}>
        <Plus size={20} color="white" />
      </PrimaryButton>
    </Flex>
  )
}

export const Options: React.FC = () => {
  const { loading, config, setConfig } = useConfigContext()

  const [excludedKeys, setExcludedKeys] = React.useState<string[]>(
    config.excludedParameters
  )
  const [filtersCount, setFiltersCount] = React.useState<string>(
    config.topFiltersCount.toString()
  )

  const saveChanges = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    const newConfig = {
      excludedParameters: excludedKeys,
      topFiltersCount: filtersCount
        ? Math.round(Number(filtersCount))
        : DEFAULT_TOP_FILTERS_COUNT
    }
    setConfig(newConfig)
    setStoredConfig(newConfig)
  }

  const onRemoveExcludedKey = (key: string) => {
    setExcludedKeys((prev) => prev.filter((p) => p !== key))
  }

  React.useEffect(() => {
    if (!loading) {
      if (config.excludedParameters) {
        setExcludedKeys(config.excludedParameters)
      }
      if (config.topFiltersCount) {
        setFiltersCount(config.topFiltersCount.toString())
      }
    }
  }, [loading, config])

  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <BasicCard
        sx={{
          m: 3,
          width: [350, 500, 800]
        }}>
        <Flex sx={{ alignItems: 'center', gap: 3 }}>
          <Image src="icons/filtre-icon-48.png" width={28} height={28} />
          <BasicCardTitle>Filtre Options</BasicCardTitle>
        </Flex>
        <BasicCardContent>
          <Flex
            p={3}
            sx={{
              flexDirection: 'column',
              gap: 4,
              bg: 'white',
              borderRadius: '0.5rem'
            }}>
            <Flex
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2
              }}>
              <Flex
                sx={{
                  flexDirection: ['column', 'row'],
                  alignItems: 'center',
                  gap: 2
                }}>
                <Label
                  width={[1, 1 / 2]}
                  sx={{ fontSize: 14 }}
                  htmlFor="topFilters">
                  Max. Number of Top Filters
                </Label>
                <InputField
                  id="topFilters"
                  name="topFilters"
                  type="number"
                  value={filtersCount}
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                    const value = Math.max(
                      MIN_TOP_FILTERS_COUNT,
                      Math.min(MAX_TOP_FILTERS_COUNT, Number(e.target.value))
                    )
                    setFiltersCount(value.toString())
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFiltersCount(e.target.value)
                  }
                />
              </Flex>
              <Flex
                sx={{
                  flexDirection: ['column', 'row'],
                  alignItems: 'center',
                  gap: 2
                }}>
                <Label
                  width={[1, 1 / 2]}
                  sx={{ fontSize: 14 }}
                  htmlFor="exclude">
                  Exclude Parameters
                </Label>
                <ExcludeInput
                  onAdd={(key) =>
                    setExcludedKeys((prev) => [...new Set([...prev, key])])
                  }
                />
              </Flex>
              <Flex
                as="ul"
                sx={{
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                  padding: 0
                }}>
                {excludedKeys.map((excludedKey) => (
                  <Flex
                    as="li"
                    key={excludedKey}
                    p={2}
                    sx={{
                      bg: 'rgb(229, 231, 235)',
                      alignItems: 'center',
                      borderRadius: 5,
                      gap: 2
                    }}>
                    <Text>{excludedKey}</Text>
                    <Flex
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderRadius: 9999,
                        p: '2px',
                        ':hover': { bg: 'rgb(209, 213, 219)' }
                      }}
                      onClick={() => onRemoveExcludedKey(excludedKey)}>
                      <X size={14} />
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
            <Flex flexDirection={['column', 'row']} sx={{ gap: 2 }}>
              <RedButton
                order={[2, 1]}
                sx={{ gap: 2 }}
                width={[1, 1 / 2]}
                onClick={() => {
                  const confirm = prompt(
                    'Are you sure you want to delete all filters? (type yes)'
                  )
                  if (confirm === 'yes') {
                    clearFilters()
                    alert('Filters cleared')
                  }
                }}>
                <Trash2 size={14} color="white" />
                Delete All Filters
              </RedButton>
              <PrimaryButton
                order={[1, 2]}
                sx={{ gap: 2 }}
                width={1}
                disabled={
                  config.excludedParameters === excludedKeys &&
                  !!filtersCount &&
                  config.topFiltersCount.toString() === filtersCount
                }
                onClick={saveChanges}>
                <Save size={14} color="white" />
                Save Changes
              </PrimaryButton>
            </Flex>
          </Flex>
        </BasicCardContent>
      </BasicCard>
    </Flex>
  )
}
