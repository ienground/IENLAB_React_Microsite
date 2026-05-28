import {useParams} from "react-router"

export default function NoticeDetailScreen() {
  const { id } = useParams<{ id: string }>()
  return (
    <>About {id}</>
  )
}