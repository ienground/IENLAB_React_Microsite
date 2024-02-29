import {collection, doc, DocumentData, Firestore, getDoc, getDocs, Timestamp, updateDoc, deleteDoc, addDoc} from "firebase/firestore";

export async function getAppInfo(db: Firestore, packageName: string) {
    const versionRef = collection(db, "ienlab_microsite", packageName, "version");
    const infoRef = doc(db, "ienlab_microsite", packageName);

    const versionSnapshot = await getDocs(versionRef);
    const infoSnapshot = await getDoc(infoRef);

    const result: Map<string, DocumentData> = new Map();
    result.set("app_name", infoSnapshot.get("app_name"));
    result.set("app_desc", infoSnapshot.get("app_desc"));
    versionSnapshot.forEach((doc) => {
        result.set(doc.id, doc.data());
    });
    return result;
}

export async function getNoticeboards(db: Firestore) {
    const noticeRef = collection(db, "ienlab_microsite", "manage", "notice");
    const noticeSnapshot = await getDocs(noticeRef);

    const result: { id: string, title: string, content: string, create_time: Date, edit_time: Date, category: string }[] = [];
    noticeSnapshot.forEach((doc) => {
        let data = {
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            create_time: doc.data().create_time.toDate(),
            edit_time: doc.data().edit_time.toDate(),
            category: doc.data().category
        }
        result.push(data);
    });

    return result;
}

export async function getRecentNoticeDate(db: Firestore) {
    const noticeRef = collection(db, "ienlab_microsite", "manage", "notice");
    const noticeSnapshot = await getDocs(noticeRef);

    let recentDate = new Date();
    recentDate.setFullYear(2020, 1, 1);
    recentDate.setHours(0, 0, 0, 0);

    noticeSnapshot.forEach((doc) => {
        if (recentDate < doc.data().create_time.toDate()) {
            recentDate = doc.data().create_time.toDate();
        }
    });

    return recentDate;
}

export async function getNoticeItem(db: Firestore, id: string) {
    const itemRef = doc(db, "ienlab_microsite", "manage", "notice", id);
    const itemSnapshot = await getDoc(itemRef);

    const result: { id: string, title: string, content: string, create_time: Date, edit_time: Date, category: string } = {
        "id" : itemSnapshot.id,
        "title" : itemSnapshot.get("title"),
        "content" : itemSnapshot.get("content"),
        "create_time" : itemSnapshot.get("create_time").toDate(),
        "edit_time" : itemSnapshot.get("edit_time").toDate(),
        "category": itemSnapshot.get("category")
    };
    return result;
}

export async function updateNoticeItem(db: Firestore, id: string, title: string, content: string, category: string) {
    const itemRef = doc(db, "ienlab_microsite", "manage", "notice", id);

    await updateDoc(itemRef, {
        "title": title,
        "content": content,
        "category": category,
        "edit_time": Timestamp.fromDate(new Date())
    });
}

export async function addNoticeItem(db: Firestore, title: string, content: string, category: string) {
    const noticeRef = collection(db, "ienlab_microsite", "manage", "notice");
    const noticeSnapshot = await getDocs(noticeRef);

    await addDoc(noticeRef, {
        "title": title,
        "content": content,
        "category": category,
        "edit_time": Timestamp.fromDate(new Date()),
        "create_time": Timestamp.fromDate(new Date())
    });
}

export async function deleteNoticeItem(db: Firestore, id: string) {
    const itemRef = doc(db, "ienlab_microsite", "manage", "notice", id);

    await deleteDoc(itemRef);
}
