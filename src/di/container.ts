import {PortfolioRepositoryImpl} from "@/data/portfolio/PortfolioRepositoryImpl.ts"
import {fbAuth, fbFirestore, fbStorage} from "@/constant/FirebaseConfig.ts"
import type {PortfolioRepository} from "@/domain/repository/PortfolioRepository.ts"
import type {UserRepository} from "@/domain/repository/UserRepository.ts"
import {UserRepositoryImpl} from "@/data/user/UserRepositoryImpl.ts"

export const portfolioRepository: PortfolioRepository = new PortfolioRepositoryImpl(fbFirestore, fbStorage)
export const userRepository: UserRepository = new UserRepositoryImpl(fbFirestore, fbAuth)