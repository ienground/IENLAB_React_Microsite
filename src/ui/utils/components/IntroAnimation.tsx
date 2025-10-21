import styled from "styled-components";
import {motion} from "framer-motion";
import {useMemo} from "react";

export default function IntroAnimation() {
  // 💡 원본 문구와 최종 문구를 분리
  // const originalTitle = "모바일 개발자 & 디자이너";
  // const finalTitle = "모바일 크리에이터";
  // const finalTitleArray = Array.from(finalTitle);

  const { originalTitle, finalTitleArray } = useMemo(() => {
    const original = "모바일 개발자 & 디자이너";
    const final = "모바일 크리에이터";
    return {
      originalTitle: original,
      finalTitleArray: Array.from(final)
    };
  }, []);

  return (
    <div className="title">
      안녕하세요, <br />

      {/* 💡 핵심: 기존 span 태그를 Wrapper로 사용하고 내부에서 애니메이션 처리 */}
      <TitleWrapper>
        {/* 1. 선 긋기 및 교체 애니메이션 적용 영역 */}
        <AnimatedTextContainer>

          {/* 1-A. 원본 텍스트 (사라짐 애니메이션 적용) */}
          <OriginalText
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.1 }}
          >
            {originalTitle}
          </OriginalText>

          {/* 1-B. 선 긋기 애니메이션 (원본 텍스트 위에 겹쳐짐) */}
          <Underline
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
          />

          {/* 1-C. 최종 문구 (타이핑 애니메이션) */}
          <FinalTextContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.1 }}
          >
            <motion.span
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {finalTitleArray.map((char, index) => (
                <motion.span key={index} variants={textVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </FinalTextContainer>

        </AnimatedTextContainer>
      </TitleWrapper>

      <br />
      아이엔입니다
    </div>
  );
}

const TitleWrapper = styled.span`
  /* 💡 원본 문구가 가지고 있던 스타일을 그대로 적용 */
  font-weight: bold; 
  font-size: 2rem; /* 예시 크기 */
  
  /* 내부 요소들을 감싸기 위한 컨테이너 속성 */
  position: relative; 
  display: inline-block; /* 너비를 콘텐츠에 맞춥니다. */
`;

const AnimatedTextContainer = styled.div`
  /* 이 컨테이너 안의 모든 요소를 겹치게 만듭니다. */
  position: relative; 
  display: inline-block;
`;

const OriginalText = styled(motion.span)`
  /* 💡 원본 텍스트는 문서 흐름을 유지 */
  position: relative; 
  z-index: 5;
  background-color: black;
  color: white;
  padding: 0 5px;
`;

const Underline = styled(motion.div)`
  /* 선은 원본 텍스트 위에 겹쳐져야 함 */
  height: 10px; 
  background: white; 
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 10; 
`;

const FinalTextContainer = styled(motion.span)`
  /* 최종 텍스트는 원본 텍스트와 동일한 위치에 겹쳐져야 함 */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 15;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};