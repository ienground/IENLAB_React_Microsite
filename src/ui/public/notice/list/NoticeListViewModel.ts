import {createZustandContext, type InfScrollStateList, Localized} from "@ienlab/react-library"
import {createStore} from "zustand"
import {container} from "@/di/container.ts"
import {Notice} from "@/domain/model/Notice.ts"
import type {NoticeContentRepository} from "@/domain/repository/NoticeContentRepository.ts"
import {NoticeContentRepositoryImpl} from "@/data/notice/NoticeContentRepositoryImpl.ts"
import {extractNoticeEditorTextSummary} from "@/ui/public/notice/detail/NoticeEditorContentMapper.ts"

type Props = {}

export type NoticeListItemState = {
  item: Notice.Content
  title: string
  category: string
  summary: string
}

interface Store {
  contentInfoStateList: InfScrollStateList<NoticeListItemState>

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
}

const contentRepository: NoticeContentRepository = container.get(NoticeContentRepositoryImpl)

const toListItemState = (item: Notice.Content): NoticeListItemState => ({
  item,
  title: Localized.get(item.title),
  category: item.category ? Localized.get(item.category.name) : "",
  summary: extractNoticeEditorTextSummary(Localized.get(item.content)),
})

const toListState = (stateList: InfScrollStateList<Notice.Content>): InfScrollStateList<NoticeListItemState> => ({
  ...stateList,
  itemList: new Map([...stateList.itemList].map(([id, item]) => [id, toListItemState(item)])),
})

const createViewModel = (_props: Props) => createStore<Store>((set, get) => ({
  contentInfoStateList: toListState(contentRepository.contentInfoStateList),

  init: () => {
    contentRepository.setState(Notice.Content.State.PUBLISHED)
    contentRepository.reset()
    set({contentInfoStateList: toListState(contentRepository.contentInfoStateList)})
    get().loadNextPage()
  },

  onDisposed: () => {
    contentRepository.reset()
  },

  loadNextPage: async () => {
    await contentRepository.loadNextPage()
    set({ contentInfoStateList: toListState(contentRepository.contentInfoStateList) })
  },

  refresh: () => {
    contentRepository.reset()
    set({ contentInfoStateList: toListState(contentRepository.contentInfoStateList) })
    get().loadNextPage()
  }
}))

export const NoticeListViewModel = createZustandContext<Store, Props>(createViewModel)
