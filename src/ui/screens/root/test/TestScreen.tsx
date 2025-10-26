import styled from "styled-components";
import DefaultLayout from "../../../utils/layout/DefaultLayout.tsx";

export default function TestScreen() {

  const keys = ['-50', '-100', '-200', '-300', '-400', '-500', '-600', '-700', '-800', '-900', '', '-foreground'];
  const colors = [
    {
      type: "default",
      category: "layout",
      colors: ["background", "foreground", "divider", "focus"]
    },
    {
      type: "default",
      category: "content",
      colors: ["content1", "content2", "content3", "content4"]
    },
    {
      type: "base",
      category: "default",
    },
    {
      type: "base",
      category: "primary",
    },
    {
      type: "base",
      category: "secondary"
    },
    {
      type: "base",
      category: "success"
    },
    {
      type: "base",
      category: "warning"
    },
    {
      type: "base",
      category: "danger"
    },
  ];

  return (
    <DefaultLayout>
      <ContentWrapper>
        {
          colors.map((item) => (
            <div className="items">
              <div className="category">category: {item.category}</div>
              <div className="colors">
                {
                  item.type === "default" ?
                    <>
                      {
                        item.colors?.map((color) => (
                          <div style={{
                            backgroundColor: `hsl(var(--heroui-${color}))`,
                            color: isColorDarkFromHsl(getCssVariableValue(`--heroui-${color}`)) ? 'white' : 'black'
                          }}>{`hsl(var(--heroui-${color}))`} {getCssVariableValue(`--heroui-${color}`)}</div>
                        ))
                      }
                    </> :
                    <>{
                      keys.map((key) => (
                        <div style={{
                          backgroundColor: `hsl(var(--heroui-${item.category}${key}))`,
                          color: isColorDarkFromHsl(getCssVariableValue(`--heroui-${item.category}${key}`)) ? 'white' : 'black'
                        }}>{`hsl(var(--heroui-${item.category}${key}))`} {getCssVariableValue(`--heroui-${item.category}${key}`)}</div>
                      ))
                    }</>
                }
              </div>
            </div>
          ))
        }
      </ContentWrapper>
    </DefaultLayout>
  );
}

// HSL 값의 밝기(Lightness)를 기준으로 어두움을 판단하는 임계값 (0~100)
// 50% 미만이면 어두운 것으로 간주합니다.
const HSL_DARK_THRESHOLD = 50;

/**
 * HSL 문자열을 파싱하여 밝기(Luminosity)를 기준으로 어두운지 확인합니다.
 * @param hslString CSS 변수에서 읽어온 HSL 값 문자열 (예: "0 0% 96.86%")
 * @returns 밝기(L)가 50% 미만이면 true를 반환합니다.
 */
function isColorDarkFromHsl(hslString: string): boolean {
  if (!hslString) return false;

  // 1. 정규식을 사용하여 HSL 문자열에서 L (밝기) 값만 추출합니다.
  //    (예: "0 0% 96.86%" 에서 "96.86" 추출)
  //    L 값은 마지막에 % 기호로 끝나는 숫자입니다.
  const match = hslString.trim().match(/(\d+\.?\d*)\s*%$/);

  if (!match) {
    // HSL 형식이 아닌 경우 (예: RGB, HEX) 오류 방지
    console.warn("Input is not a standard HSL string or parsing failed:", hslString);
    return false;
  }

  // 2. 밝기(L) 값을 숫자로 변환합니다.
  const lightness = parseFloat(match[1]);

  // 3. 임계값과 비교: HSL은 L값이 낮을수록 어둡습니다.
  return lightness < HSL_DARK_THRESHOLD;
}

function getCssVariableValue(variableName: string): string {
  // 런타임에 :root 또는 body에서 변수 값을 가져옵니다.
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

const ContentWrapper = styled.div`
  & > .items {
    display: flex;
    flex-direction: column;
    
    & > .category {
      display: flex;
      font-size: large;
    }
    
    & > .colors {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
