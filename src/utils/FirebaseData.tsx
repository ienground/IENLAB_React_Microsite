import {collection, doc, DocumentData, Firestore, getDoc, getDocs} from "firebase/firestore";

export async function getFirestoreData(db: Firestore, packageName: string) {
    const versionRef = collection(db, "ienlab_microsite", packageName, "version");
    const infoRef = doc(db, "ienlab_microsite", packageName);

    const versionSnapshot = await getDocs(versionRef);
    const infoSnapshot = await getDoc(infoRef);

    let result: Map<string, DocumentData> = new Map();
    result.set("app_name", infoSnapshot.get("app_name"));
    result.set("app_desc", infoSnapshot.get("app_desc"));
    versionSnapshot.forEach((doc) => {
        result.set(doc.id, doc.data());
    })
    return result;
}
