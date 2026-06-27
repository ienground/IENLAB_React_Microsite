import {InjectionToken} from "@needle-di/core"
import type {Firestore} from "firebase/firestore"
import type {FirebaseStorage} from "firebase/storage"
import type {Auth} from "firebase/auth"
import type {Functions} from "firebase/functions"
import {fbAuth, fbFirestore, fbFunctions, fbStorage} from "@/constant/FirebaseConfig.ts"

const FirebaseToken = {
  Firestore: new InjectionToken<Firestore>("firestore", { factory: () => fbFirestore }),
  Storage: new InjectionToken<FirebaseStorage>("storage", { factory: () => fbStorage }),
  Auth: new InjectionToken<Auth>("auth", { factory: () => fbAuth }),
  Functions: new InjectionToken<Functions>("functions", { factory: () => fbFunctions })
}

export const DiToken = {
  Firebase: FirebaseToken
}