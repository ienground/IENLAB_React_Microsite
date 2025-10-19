import {type DocumentSnapshot, type QueryDocumentSnapshot, serverTimestamp, type Timestamp, DocumentReference} from "firebase/firestore";
import {snapshotToData} from "../../ui/utils/utils.ts";
import {FirestorePath} from "../../constant/FirestorePath.ts";

export type Notice = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  categoryRef: DocumentReference;
  category: NoticeCategory | undefined;
  title: string;
  content: string;
  imageUrls: string[];
  fixed: boolean;
}

export type NoticeCategory = {
  id: string;
  createAt: Timestamp;
  updateAt: Timestamp;
  delete: boolean;
  label: string;
}

export function DocToNotice(snapshot: QueryDocumentSnapshot | DocumentSnapshot): Notice {
  const doc = snapshotToData(snapshot);
  return {
    id: doc.id,
    createAt: doc[FirestorePath.CREATE_AT],
    updateAt: doc[FirestorePath.UPDATE_AT],
    delete: doc[FirestorePath.DELETE],
    categoryRef: doc[FirestorePath.Notice.CATEGORY],
    category: undefined,
    title: doc[FirestorePath.Notice.TITLE],
    content: doc[FirestorePath.Notice.CONTENT],
    imageUrls: doc[FirestorePath.Notice.IMAGE_URLS],
    fixed: doc[FirestorePath.Notice.FIXED]
  };
}

export function DocToNoticeCategory(snapshot: QueryDocumentSnapshot | DocumentSnapshot): NoticeCategory {
  const doc = snapshotToData(snapshot);
  return {
    id: doc.id,
    createAt: doc[FirestorePath.CREATE_AT],
    updateAt: doc[FirestorePath.UPDATE_AT],
    delete: doc[FirestorePath.DELETE],
    label: doc[FirestorePath.Notice.Category.LABEL]
  };
}

export function NoticeToHashMap(item: Notice, isUpdate: boolean = false) {
  const map = {
    [FirestorePath.UPDATE_AT]: serverTimestamp(),
    [FirestorePath.DELETE]: item.delete,
    [FirestorePath.Notice.CATEGORY]: item.categoryRef,
    [FirestorePath.Notice.TITLE]: item.title,
    [FirestorePath.Notice.CONTENT]: item.content,
    [FirestorePath.Notice.IMAGE_URLS]: item.imageUrls,
    [FirestorePath.Notice.FIXED]: item.fixed
  };

  if (!isUpdate) {
    map[FirestorePath.CREATE_AT] = serverTimestamp();
  }

  return map;
}

export function NoticeCategoryToHashmap(item: NoticeCategory, isUpdate: boolean = false) {
  const map = {
    [FirestorePath.UPDATE_AT]: serverTimestamp(),
    [FirestorePath.DELETE]: item.delete,
    [FirestorePath.Notice.Category.LABEL]: item.label
  };

  if (!isUpdate) {
    map[FirestorePath.CREATE_AT] = serverTimestamp();
  }
}