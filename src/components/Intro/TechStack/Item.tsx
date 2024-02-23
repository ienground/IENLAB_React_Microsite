import {ImgIcon, InnerBoxWrapper, TextContentContent, TextContentTitle} from "../CommonComponent/CommonComponent";
import {Spacer} from "../../Component";

interface ItemProps {
    item: {icons: string[], title: string, content: string}
}

export default function Item({item} : ItemProps) {
    return (
        <InnerBoxWrapper>
            {item.icons.map((icon) => (
                <ImgIcon src={icon} style={{marginRight: "1rem"}} />
            ))}
            <Spacer orientation={"vertical"} size={"1rem"} />
            <TextContentTitle className={"black background"}>{item.title}</TextContentTitle><br />
            <TextContentContent fontWeight={"normal"} className={"black medium"}>{item.content}</TextContentContent>
        </InnerBoxWrapper>
    )
}
