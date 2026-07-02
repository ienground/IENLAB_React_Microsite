import {createZustandContext, Localized} from "@ienlab/react-library"
import {createStore} from "zustand"
import type {Unsubscribe} from "firebase/firestore"
import {container} from "@/di/container.ts"
import {Notice} from "@/domain/model/Notice.ts"
import type {NoticeContentRepository} from "@/domain/repository/NoticeContentRepository.ts"
import {NoticeContentRepositoryImpl} from "@/data/notice/NoticeContentRepositoryImpl.ts"
import {
  normalizeNoticeEditorContent,
  type NoticeContentBlock,
} from "@/ui/public/notice/detail/NoticeEditorContentMapper.ts"

type Props = {
  id: string
}

export interface NoticeDetailInfoState {
  item: Notice.Content | null
  title: string
  category: string
  contentBlocks: NoticeContentBlock[]
  isInitialized: boolean
}

interface Store {
  infoState: NoticeDetailInfoState

  init: () => void
  onDisposed: () => void
  unsubscribe?: Unsubscribe
}

const contentRepository: NoticeContentRepository = container.get(NoticeContentRepositoryImpl)

const toInfoState = (item: Notice.Content | null): NoticeDetailInfoState => {
  if (!item || item.state !== Notice.Content.State.PUBLISHED) {
    return {
      item: null,
      title: "",
      category: "",
      contentBlocks: [],
      isInitialized: true,
    }
  }

  return {
    item,
    title: Localized.get(item.title),
    category: item.category ? Localized.get(item.category.name) : "",
    contentBlocks: normalizeNoticeEditorContent(Localized.get(item.content)),
    isInitialized: true,
  }
}

const createViewModel = (props: Props) => createStore<Store>((set, get) => ({
  infoState: {
    item: null,
    title: "",
    category: "",
    contentBlocks: [],
    isInitialized: false,
  },

  init: () => {
    get().unsubscribe?.()

    const unsubscribe = contentRepository.observe(props.id, item => {
      set({infoState: toInfoState(item)})
    })

    set({unsubscribe})
  },

  onDisposed: () => {
    get().unsubscribe?.()
  },
}))

export const NoticeDetailViewModel = createZustandContext<Store, Props>(createViewModel)
