import {PortfolioRepositoryImpl} from "@/data/portfolio/PortfolioRepositoryImpl.ts"
import {fbAuth, fbFirestore, fbFunctions, fbStorage} from "@/constant/FirebaseConfig.ts"
import type {PortfolioRepository} from "@/domain/repository/PortfolioRepository.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository.ts"
import {CompanyRepositoryImpl} from "@/data/company/CompanyRepositoryImpl.ts"
import type {OutsourceRepository} from "@/domain/repository/OutsourceRepository.ts"
import {OutsourceRepositoryImpl} from "@/data/outsource/OutsourceRepositoryImpl.ts"
import type {OutsourceRevisionRepository} from "@/domain/repository/OutsourceRevisionRepository.ts"
import {OutsourceRevisionRepositoryImpl} from "@/data/outsource/OutsourceRevisionRepositoryImpl.ts"
import type {OutsourceRequestRepository} from "@/domain/repository/OutsourceRequestRepository.ts"
import {OutsourceRequestRepositoryImpl} from "@/data/outsource/OutsourceRequestRepositoryImpl.ts"
import type {OutsourceLogRepository} from "@/domain/repository/OutsourceLogRepository.ts"
import {OutsourceLogRepositoryImpl} from "@/data/outsource/OutsourceLogRepositoryImpl.ts"

export const portfolioRepository: PortfolioRepository = new PortfolioRepositoryImpl(fbFirestore, fbStorage)
export const userRepository: UserRepository = new UserRepositoryImpl(fbFirestore, fbStorage, fbAuth, fbFunctions)
export const companyRepository: CompanyRepository = new CompanyRepositoryImpl(fbFirestore)
export const outsourceRepository: OutsourceRepository = new OutsourceRepositoryImpl(fbFirestore, fbStorage)

export const createOutsourceRequestRepository = (itemId: string): OutsourceRequestRepository => new OutsourceRequestRepositoryImpl(fbFirestore, fbStorage, itemId, false)
export const createOutsourceRevisionRepository = (itemId: string): OutsourceRevisionRepository => new OutsourceRevisionRepositoryImpl(fbFirestore, fbStorage, itemId)
export const createOutsourceLogRepository = (itemId: string): OutsourceLogRepository => new OutsourceLogRepositoryImpl(fbFirestore, fbStorage, itemId)