import {useParams} from "react-router"
import ConstructionScreen from "@/ui/public/construction/ConstructionScreen.tsx"

export default function ProjectDetailScreen() {
  const { id } = useParams<{ id: string }>()
  return (
    <ConstructionScreen />
  )
}