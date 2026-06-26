import {inject, InjectionToken} from "@needle-di/core"
import type {Firestore} from "firebase/firestore"
import type {FirebaseStorage} from "firebase/storage"
import type {Auth} from "firebase/auth"
import type {Functions} from "firebase/functions"
import type {PortfolioRepository} from "@/domain/repository/PortfolioRepository.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository.ts"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import type {EstimateRepository} from "@/domain/repository/EstimateRepository.ts"
import type {EnvRepository} from "@/domain/repository/EnvRepository.ts"
import type {OutsourceRequestRepository} from "@/domain/repository/OutsourceRequestRepository.ts"
import type {OutsourceRevisionRepository} from "@/domain/repository/OutsourceRevisionRepository.ts"
import type {OutsourceLogRepository} from "@/domain/repository/OutsourceLogRepository.ts"
import {fbAuth, fbFirestore, fbFunctions, fbStorage} from "@/constant/FirebaseConfig.ts"
import {PortfolioRepositoryImpl} from "@/data/portfolio/PortfolioRepositoryImpl.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"
import {CompanyRepositoryImpl} from "@/data/company/CompanyRepositoryImpl.ts"
import {OutsourceRepositoryImpl} from "@/data/outsource/OutsourceRepositoryImpl.ts"
import {EstimateRepositoryImpl} from "@/data/estimate/EstimateRepositoryImpl.ts"
import {EnvRepositoryImpl} from "@/data/env/EnvRepositoryImpl.ts"
import {OutsourceRequestRepositoryImpl} from "@/data/outsource/OutsourceRequestRepositoryImpl.ts"
import {OutsourceRevisionRepositoryImpl} from "@/data/outsource/OutsourceRevisionRepositoryImpl.ts"
import {OutsourceLogRepositoryImpl} from "@/data/outsource/OutsourceLogRepositoryImpl.ts"

const FirebaseToken = {
  Firestore: new InjectionToken<Firestore>("firestore", { factory: () => fbFirestore }),
  Storage: new InjectionToken<FirebaseStorage>("storage", { factory: () => fbStorage }),
  Auth: new InjectionToken<Auth>("auth", { factory: () => fbAuth }),
  Functions: new InjectionToken<Functions>("functions", { factory: () => fbFunctions })
}

// const FactoryTokens = {
//   OutsourceRequest: new InjectionToken<(itemId: string) => OutsourceRequestRepository>("createOutsourceRequestRepo", { factory: () => (itemId: string) => new OutsourceRequestRepositoryImpl(inject(FirebaseToken.Firestore), inject(FirebaseToken.Storage), itemId, false) }),
//   OutsourceRevision: new InjectionToken<(itemId: string) => OutsourceRevisionRepository>("createOutsourceRevisionRepo", { factory: () => (itemId: string) => new OutsourceRevisionRepositoryImpl(inject(FirebaseToken.Firestore), inject(FirebaseToken.Storage), itemId, false) }),
//   OutsourceLog: new InjectionToken<(itemId: string) => OutsourceLogRepository>("createOutsourceLogRepo", { factory: () => (itemId: string) => new OutsourceLogRepositoryImpl(inject(FirebaseToken.Firestore), inject(FirebaseToken.Storage), itemId) }),
// }

export const DiToken = {
  Firebase: FirebaseToken,
  // Repo: RepoTokens,
  // Factory: FactoryTokens
}