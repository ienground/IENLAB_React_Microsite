import {PortfolioRepositoryImpl} from "@/data/portfolio/PortfolioRepositoryImpl.ts"
import {fbAuth, fbFirestore, fbFunctions, fbStorage} from "@/constant/FirebaseConfig.ts"
import type {PortfolioRepository} from "@/domain/repository/PortfolioRepository.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"
import type {CompanyRepository} from "@/domain/repository/CompanyRepository.ts"
import {CompanyRepositoryImpl} from "@/data/company/CompanyRepositoryImpl.ts"

export const portfolioRepository: PortfolioRepository = new PortfolioRepositoryImpl(fbFirestore, fbStorage)
export const userRepository: UserRepository = new UserRepositoryImpl(fbFirestore, fbStorage, fbAuth, fbFunctions)
export const companyRepository: CompanyRepository = new CompanyRepositoryImpl(fbFirestore)