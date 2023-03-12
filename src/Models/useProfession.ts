import { useEffect, useState } from 'react'
import { KeywordType, PresetType, Profession } from '../types'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { LocalStorageInteraction, withLocalStorage } from '../utils/general'

export const useProfession = (professionId?: string) => {
  const [profession, setProfession] = useState<Profession | null>(null)
  const [addedKeywords, setAddedKeywords] = useState<KeywordType[]>([])
  const [removedKeywords, setRemovedKeywords] = useState<KeywordType[]>([])
  const [presets, setPresets] = useState<PresetType[]>([])
  const [selectedPresetIds, setSelectedPresetIds] = useState<string[]>([])
  const [isFirstRender, setIsFirstRender] = useState(true)

  const [displayPresets, setDisplayPresets] = useState<PresetType[]>([])
  const [selectedPresets, setSelectedPresets] = useState<PresetType[]>([])
  const [displayKeywords, setDisplayKeywords] = useState<KeywordType[]>([])
  const [allSelectedKeywordIds, setAllSelectedKeywordIds] = useState<string[]>([])

  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const getPresets = async () => {
    await axios
      .get(`${BASE_URL}presets/`)
      .then(({ data }) => setPresets(data))
      .catch(setError)

    setSelectedPresetIds(
      withLocalStorage({ selectedPresetIds: [] }, LocalStorageInteraction.load)
        .selectedPresetIds,
    )
  }

  const updateAllSelectedKeywordIds = () => {
    if (!profession || !profession.related_keywords) {
      return []
    }
    let allIds = profession.related_keywords.map(keyword => keyword.id)
    allIds = [...allIds, ...addedKeywords.map(keyword => keyword.id)]
    selectedPresets.forEach(preset => {
      allIds = allIds.concat(preset.keywords.map(keyword => keyword.id))
    })
    allIds = allIds.filter(id => !removedKeywords.map(keyword => keyword.id).includes(id))
    if (allIds !== allSelectedKeywordIds) {
      setAllSelectedKeywordIds(allIds)
    }
  }

  const getProfession = async (id: string | undefined) => {
    const professionFromLocal = withLocalStorage(
      { profession: {} },
      LocalStorageInteraction.load,
    ).profession

    if (
      !professionId ||
      (professionFromLocal &&
        professionFromLocal.id &&
        professionFromLocal.id === professionId)
    ) {
      setProfession(professionFromLocal)
    } else {
      await axios
        .get(`${BASE_URL}professions/${id}/`)
        .then(({ data }) => {
          withLocalStorage({ profession: data }, LocalStorageInteraction.save)
          setProfession(data)
        })
        .catch(setError)
    }

    setAddedKeywords(
      withLocalStorage({ addedKeywords: [] }, LocalStorageInteraction.load).addedKeywords,
    )

    setRemovedKeywords(
      withLocalStorage({ removedKeywords: [] }, LocalStorageInteraction.load)
        .removedKeywords,
    )

    await getPresets()
    updateAllSelectedKeywordIds()
  }

  useEffect(() => {
    getProfession(professionId)
  }, [])

  const updateSelectedPresets = () => {
    setSelectedPresets(presets.filter(preset => selectedPresetIds.includes(preset.id)))
  }

  const updateDisplayPresets = () => {
    setDisplayPresets(presets.filter(preset => !selectedPresetIds.includes(preset.id)))
  }

  const updateDisplayKeywords = () => {
    if (!profession || !profession.related_keywords) {
      return []
    }
    setDisplayKeywords(
      profession.related_keywords.filter(
        keyword => !removedKeywords.map(word => word.id).includes(keyword.id),
      ),
    )
  }

  useEffect(() => {
    if (!isFirstRender) {
      withLocalStorage({ selectedPresetIds }, LocalStorageInteraction.save)
      updateDisplayPresets()
      updateSelectedPresets()
    }
  }, [selectedPresetIds])

  useEffect(() => {
    if (!isFirstRender) {
      withLocalStorage({ addedKeywords }, LocalStorageInteraction.save)
      withLocalStorage({ removedKeywords }, LocalStorageInteraction.save)
      updateDisplayKeywords()
      updateAllSelectedKeywordIds()
    }
  }, [addedKeywords, removedKeywords])

  // <editor-fold desc="Actions">
  const selectPreset = (presetId: string) => {
    if (!selectedPresetIds.includes(presetId)) {
      setSelectedPresetIds([...selectedPresetIds, presetId])
    }
  }

  const deSelectPreset = (presetId: string) => {
    setSelectedPresetIds(selectedPresetIds.filter(id => id !== presetId))
  }

  const addKeyword = (keyword: KeywordType) => {
    if (!allSelectedKeywordIds.includes(keyword.id)) {
      setAddedKeywords([...addedKeywords, keyword])
    }
  }

  const addKeywordsBulk = (keywords: KeywordType[]) => {
    setAddedKeywords([
      ...addedKeywords,
      ...keywords.filter(keyword => !allSelectedKeywordIds.includes(keyword.id)),
    ])
  }

  const removeKeyword = (keyword: KeywordType) => {
    if (addedKeywords.includes(keyword)) {
      setAddedKeywords(
        addedKeywords.filter(addedKeyword => addedKeyword.id !== keyword.id),
      )
    } else {
      setRemovedKeywords([...removedKeywords, keyword])
    }
  }

  const clearKeywords = () => {
    setAddedKeywords([])
    setRemovedKeywords([])
  }

  const clearPresets = () => {
    setSelectedPresetIds([])
  }
  // </editor-fold>

  return {
    profession,
    presets: {
      all: presets,
      selected: selectedPresets,
      display: displayPresets,
      select: selectPreset,
      deSelect: deSelectPreset,
      clear: clearPresets,
    },
    keywords: {
      added: addedKeywords,
      display: displayKeywords,
      allIds: allSelectedKeywordIds,
      add: addKeyword,
      addBulk: addKeywordsBulk,
      remove: removeKeyword,
      clear: clearKeywords,
    },
    error: error,
  }
}
