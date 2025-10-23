export default async function handleShare(shareData: { title: string, url: string, text: string }) {
  // 1. Web Share API 지원 여부 확인
  if (navigator.share) {
    try {
      // 2. 공유 요청
      await navigator.share(shareData);
      console.log('공유가 성공적으로 완료되었습니다.');
    } catch (err) {
      // 3. 사용자가 공유를 취소하거나 오류 발생 시
      console.error('Web Share API 오류 또는 취소:', err);
    }
  } else {
    // 4. API 미지원 시 대체 로직 실행 (아래 2번 방법으로 폴백)
    alert('이 브라우저는 웹 공유 기능을 지원하지 않습니다.');
    // Fallback: URL 복사 기능 등을 구현할 수 있습니다.
  }
}