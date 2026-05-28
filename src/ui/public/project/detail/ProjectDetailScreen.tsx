import {useParams} from "react-router"

export default function ProjectDetailScreen() {
  const { id } = useParams<{ id: string }>()
  return (
    <>ProfileDetail {id}</>
  )
}