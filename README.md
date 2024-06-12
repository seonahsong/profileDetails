# 팀프로젝트

1. 요구사항 분석 - 인트라넷 구현
2. 프로젝트 관리 - 매주 월수금
3. 역할분담 - 프로필 상세페이지
4. 아키텍처 설계 - 프레임워크 정하기, 유저플로우 작성
5. 기술 선택 - vscode, html,css, js
6. 보안 - x
7. 테스트 및 품질 보증 - 서로 확인
8. 배포 및 유지보수 - 유지보수가 가능하게 코드 짜기
9. 사용자 피드백 및 개선 - 서로 피드백해주기
10. 문서화 -git, 노션 회의록

## 팀원들과 할일

- 프레임워크 정하기
- 유저플로우 작성

## 나의 할일

- 코드 피드백
- 디자인 손보기
- 아무것도 입력안했을때 예시 사진과 글 넣기


# profileDetails

## 초기 디자인

![처음구상](https://github.com/seonahsong/profileDetails/assets/170864632/9d7d474f-1c77-44b3-9765-f399db4c395c)



## 기본틀 완성

![완성1](https://github.com/seonahsong/profileDetails/assets/170864632/5f65b341-b621-49eb-9a34-8130d1bd4473)
![완성2](https://github.com/seonahsong/profileDetails/assets/170864632/9eb9d3c1-3656-43d5-a82e-baeed27fe872)

## 업데이트 1 (6/11)
1. 모달 열었을때 가운데로 위치하게 변경
```js
// 모달 열기
function openModal() {
    modal.style.display = "flex";
    modal.style.position = "absolute"; // 모달을 절대 위치로 설정
    modal.style.left = "50%"; // 중앙에 위치시키기 위한 초기 위치 설정
    modal.style.top = "50%";
    modal.style.transform = "translate(-50%, -50%)"; // 중앙에 위치시키기 위한 변환 설정
}
```
2. 모달 드래그, 모달뒤 스크린 잠금. -> 업뎃 2-2 참고


## 업데이트 2-1 (6/12)
1. 모달 컨텐츠 클릭할때 움직이지 않게 함
2. 모달핸들을 만들었음.

## 업데이트 2-2
1. 모달 전체가 아니라 모달핸들을 드래그했을때만 움직이게 바꿈
```js
// 변수 선언
const modal = document.getElementById('modal');
const modalHeader = document.querySelector('.modal-handle'); // 모달 헤더 선택

// 드래그 상태를 추적할 변수들
let isDragging = false;
let startX, startY, initialX, initialY;

// 이벤트 리스너 등록
modalHeader.addEventListener('mousedown', onMouseDownModalHeader);

// 모달 헤더 드래그 기능
function onMouseDownModalHeader(e) {
    if (e.button !== 0) return;     // 마우스 왼쪽 버튼이 아니면 종료
    if (e.target !== modalHeader) return; // 드래그 시작 요소가 모달 헤더가 아니면 종료
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = modal.offsetLeft;
    initialY = modal.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// 마우스 무브 이벤트 핸들러
function onMouseMove(e) {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        modal.style.left = initialX + deltaX + 'px';
        modal.style.top = initialY + deltaY + 'px';
        // 모달 뒤의 요소들도 함께 이동
        document.body.style.overflow = 'hidden'; // 페이지 스크롤 잠금
    }
}

// 마우스 업 이벤트 핸들러
function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    // 페이지 스크롤 다시 활성화
    document.body.style.overflow = 'auto';
}
```

2. 모달을 움직일때 텍스트 드래그가 되지않게 변경

```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color:#EEE;
    color: #333;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    }
```
