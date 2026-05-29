import {PortfolioRepositoryImpl} from "@/data/portfolio/PortfolioRepositoryImpl.ts"
import {fbFirestore} from "@/constant/FirebaseConfig.ts"
import type {PortfolioRepository} from "@/domain/repository/PortfolioRepository.ts"

export const portfolioRepository: PortfolioRepository = new PortfolioRepositoryImpl(fbFirestore)