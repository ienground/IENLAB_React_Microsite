import styled from "styled-components";
import {LastEditData} from "../data/LastEditData";

interface LastEditProps {
    link: string
}

function LastEdit({link}: LastEditProps) {
    const date = new Date();
    const data = LastEditData.get(link);

    if (data !== undefined) {
        date.setFullYear(data[0], data[1] - 1, data[2]);
        date.setHours(data[3], data[4], 0);
    }

    // const options = {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "numeric",
    //     day: "numeric"
    // };

    return (
        <LastEditWrapper>마지막 수정 시각 : {date.toLocaleString("ko-kr")}</LastEditWrapper>
    );
}

const LastEditWrapper = styled.div`
    width: calc(100% - 2rem);
    margin: 1rem;
    font-style: italic;
    text-align: end;

    @media ${({ theme }) => theme.device.mobile} {
        font-size: x-small;
    }
`

export default LastEdit;
