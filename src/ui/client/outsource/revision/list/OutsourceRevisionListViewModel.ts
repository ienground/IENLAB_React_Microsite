import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import type {Outsource} from "@/domain/model/Outsource.ts"
import {createStore} from "zustand"
import type {OutsourceRevisionRepository} from "@/domain/repository/OutsourceRevisionRepository.ts"

type Props = {
  id: string
  revisionRepository: OutsourceRevisionRepository
}

interface Store {
  requestInfoStateList: InfScrollStateList<Outsource.RevisionRequest>

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
  deleteItems: (ids: string[], onSuccess: () => void, onFailure: (errorKey: string) => void) => Promise<void>
  setSearchKeyword: (keyword: string) => void
  clearSearch: () => void
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  requestInfoStateList: props.revisionRepository.requestInfoStateList,

  init: () => {
    get().loadNextPage()
  },

  onDisposed: () => {},

  loadNextPage: async () => {
    await props.revisionRepository.loadNextPage()
    set({ requestInfoStateList: props.revisionRepository.requestInfoStateList })
  },

  refresh: () => {
    props.revisionRepository.reset()
    set({ requestInfoStateList: props.revisionRepository.requestInfoStateList })
    get().loadNextPage()
  },

  deleteItems: async (ids, onSuccess, onFailure) => {
    try {
      await Promise.all(ids.map(id => props.revisionRepository.delete(id)))
      get().refresh()
      onSuccess()
    } catch (e) {
      if (e instanceof Error) onFailure(e.message); else onFailure(String(e))
    }
  },

  setSearchKeyword: (keyword) => {
    props.revisionRepository.setSearchKeyword(keyword)
    get().loadNextPage()
  },

  clearSearch: () => {
    props.revisionRepository.clearSearch()
    get().loadNextPage()
  }
}))

export const OutsourceRevisionListViewModel = createZustandContext<Store, Props>(createViewModel)