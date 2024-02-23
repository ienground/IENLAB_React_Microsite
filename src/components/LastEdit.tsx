import styled from "styled-components";
import {LastEditData} from "../data/LastEditData";

interface LastEditProps {
    link: string
}

export default function LastEdit({link}: LastEditProps) {
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

    // return (
    //     <LastEditWrapper>마지막 수정 시각 : {date.toLocaleString("ko-kr")}</LastEditWrapper>
    // );

    return (
        <Wrapper>
            <div>
                마지막 수정 시각 : {date.toLocaleString("ko-kr")}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > div {
        max-width: 1440px;
        width: 100%;
        font-style: italic;
        text-align: end;

        @media ${({ theme }) => theme.device.pc} {
            width: calc(100% - 2rem);
            padding: 0 1rem;
        }
    }
    
`


const LastEditWrapper = styled.div`
    width: calc(100% - 2rem);
    margin: 1rem;
    font-style: italic;
    text-align: end;

    @media ${({ theme }) => theme.device.mobile} {
        font-size: x-small;
    }
`
