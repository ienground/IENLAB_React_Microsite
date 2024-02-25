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

    return (
        <Wrapper>
            <div>
                마지막 수정 시각 : {date.toLocaleString("ko-kr")}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    
    & > div {
        max-width: 1440px;
        width: 100%;
        font-style: italic;
        text-align: end;
        transition: color 0.5s ease;

        @media ${({ theme }) => theme.device.pc} {
            width: calc(100% - 2rem);
            padding: 0 1rem;
        }
        
        @media ${({ theme }) => theme.device.mobile} {
            font-size: small;
        }
    }
    
`
