import {createZustandContext, type InfScrollStateList} from "@ienlab/react-library"
import {createStore} from "zustand"
import {container} from "@/di/container.ts"
import {Notice} from "@/domain/model/Notice.ts"
import type {NoticeContentRepository} from "@/domain/repository/NoticeContentRepository.ts"
import {NoticeContentRepositoryImpl} from "@/data/notice/NoticeContentRepositoryImpl.ts"

type Props = {}

interface Store {
  noticeInfoStateList: InfScrollStateList<Notice.Content>

  init: () => void
  onDisposed: () => void
  loadNextPage: () => void
  refresh: () => void
}

const noticeContentRepository: NoticeContentRepository = container.get(NoticeContentRepositoryImpl)

const toPublishedList = (stateList: InfScrollStateList<Notice.Content>): InfScrollStateList<Notice.Content> => {
  const itemList = new Map(
    [...stateList.itemList].filter(([, item]) => item.state === Notice.Content.State.PUBLISHED)
  )

  return {
    ...stateList,
    itemList,
  }
}

const createViewModel = (_props: Props) => createStore<Store>((set, get) => ({
  noticeInfoStateList: toPublishedList(noticeContentRepository.contentInfoStateList),

  init: () => {
    noticeContentRepository.reset()
    set({noticeInfoStateList: toPublishedList(noticeContentRepository.contentInfoStateList)})
    get().loadNextPage()
  },

  onDisposed: () => {
    noticeContentRepository.reset()
  },

  loadNextPage: async () => {
    await noticeContentRepository.loadNextPage()
    const noticeInfoStateList = toPublishedList(noticeContentRepository.contentInfoStateList)
    set({noticeInfoStateList})

    if (noticeInfoStateList.isInitialized && noticeInfoStateList.itemList.size === 0 && noticeInfoStateList.hasMore) {
      get().loadNextPage()
    }
  },

  refresh: () => {
    noticeContentRepository.reset()
    set({noticeInfoStateList: toPublishedList(noticeContentRepository.contentInfoStateList)})
    get().loadNextPage()
  }
}))

export const NoticeListViewModel = createZustandContext<Store, Props>(createViewModel)
