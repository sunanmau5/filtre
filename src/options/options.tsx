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
import { Flex, Text } from 'rebass'
import { clearFilters, setStoredConfig } from '../utils/storage'

export const Options: React.FC = () => {
  const { config, setConfig } = useConfigContext()

  const [excludedKeys, setExcludedKeys] = React.useState<string[]>(
    config.excludedParameters
  )
  const [localKey, setLocalKey] = React.useState<string>('')

  const saveChanges = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    if (config.excludedParameters !== excludedKeys) {
      setConfig({ excludedParameters: excludedKeys })
      setStoredConfig({ excludedParameters: excludedKeys })
    }
  }

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onAddExcludedKey(localKey)
    }
  }

  const onAddExcludedKey = (key: string) => {
    if (localKey) {
      setExcludedKeys((prev) => [...new Set([...prev, key])])
      setLocalKey('')
    }
  }

  const onRemoveExcludedKey = (key: string) => {
    setExcludedKeys((prev) => prev.filter((p) => p !== key))
  }

  React.useEffect(() => {
    setExcludedKeys(config.excludedParameters)
  }, [config.excludedParameters])

  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <BasicCard
        sx={{
          p: 3,
          m: 3,
          borderRadius: '0.5rem',
          width: [350, 500, 750],
          boxShadow: ''
        }}>
        <BasicCardTitle>Filtre Extension Options</BasicCardTitle>
        <BasicCardContent>
          <Flex sx={{ flexDirection: 'column', gap: 4 }}>
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
                  htmlFor="exclude">
                  Exclude Parameters
                </Label>
                <Flex width={1} sx={{ gap: 2 }}>
                  <InputField
                    id="exclude"
                    name="exclude"
                    defaultValue={localKey}
                    value={localKey}
                    onKeyDown={keyDown}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLocalKey(e.target.value)
                    }
                  />
                  <PrimaryButton
                    sx={{ minWidth: 40 }}
                    onClick={() => onAddExcludedKey(localKey)}
                    disabled={!localKey}>
                    <Plus size={20} color="white" />
                  </PrimaryButton>
                </Flex>
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
                    'Are you sure you want to clear all filters? (type yes)'
                  )
                  if (confirm === 'yes') {
                    clearFilters()
                    alert('Filters cleared')
                  }
                }}>
                <Trash2 size={14} color="white" />
                Clear All Filters
              </RedButton>
              <PrimaryButton
                order={[1, 2]}
                sx={{ gap: 2 }}
                width={1}
                disabled={config.excludedParameters === excludedKeys}
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
