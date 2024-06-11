// 변수 선언
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close-btn');
const modal = document.getElementById('modal');
const infoForm = document.getElementById('infoForm');
const outputName = document.getElementById('outputName');
const outputEmail = document.getElementById('outputEmail');
const outputPhoneNumber = document.getElementById('outputPhoneNumber');
const outputPosition = document.getElementById('outputPosition');
const outputImage = document.getElementById('outputImage');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phoneNumber');
const positionInput = document.getElementById('position');
const imageInput = document.getElementById('image');

// 드래그 상태를 추적할 변수들
let isDragging = false;
let startX, startY, initialX, initialY;

// 이벤트 리스너 등록
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
infoForm.addEventListener('submit', handleFormSubmit);
infoForm.addEventListener('submit', saveInfo);
window.addEventListener('load', loadSavedInfo);
modal.addEventListener('mousedown', onMouseDown); // 수정된 부분: modalHeader -> modal

// 모달 열기
function openModal() {
    modal.style.display = "flex";
    modal.style.position = "absolute"; // 모달을 절대 위치로 설정
    modal.style.left = "50%"; // 중앙에 위치시키기 위한 초기 위치 설정
    modal.style.top = "50%";
    modal.style.transform = "translate(-50%, -50%)"; // 중앙에 위치시키기 위한 변환 설정
}

// 모달 닫기
function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
}

// 폼 제출 시 정보 출력 및 이미지 업로드
function handleFormSubmit(event) {
    event.preventDefault(); // 폼 기본 동작 막기

    // 입력된 정보 가져오기
    const nameValue = nameInput.value;
    const emailValue = emailInput.value;
    const phoneNumberValue = phoneNumberInput.value;
    const positionValue = positionInput.value;
    const imageFile = imageInput.files[0];

    // 정보 출력
    outputName.textContent = "이름 : " + nameValue;
    outputEmail.textContent = "이메일 : " + emailValue;
    outputPhoneNumber.textContent = "전화번호 : " + phoneNumberValue;
    outputPosition.textContent = "직책 : " + positionValue;

    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = function(e) {
        outputImage.src = e.target.result;
        outputImage.style.display = "block";
    };
    reader.readAsDataURL(imageFile);

    // 이미지 업로드
    const formData = new FormData();
    formData.append('name', nameValue);
    formData.append('email', emailValue);
    formData.append('phoneNumber', phoneNumberValue);
    formData.append('position', positionValue);
    formData.append('image', imageFile);

    // 서버로 formData 전송 (이 부분은 서버에 맞게 수정해야 합니다)
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('서버 응답:', data);
    })
    .catch(error => {
        console.error('오류 발생:', error);
    });

    // 모달 닫기
    closeModal();
}

// 페이지가 로드될 때 저장된 정보를 불러와서 입력 필드에 채움
function loadSavedInfo() {
    const savedName = localStorage.getItem('name');
    const savedPosition = localStorage.getItem('position');
    const savedEmail = localStorage.getItem('email');
    const savedPhoneNumber = localStorage.getItem('phoneNumber');
    
    if (savedName) {
        nameInput.value = savedName;
    }
    if (savedPosition) {
        positionInput.value = savedPosition;
    }
    if (savedEmail) {
        emailInput.value = savedEmail;
    }
    if (savedPhoneNumber) {
        phoneNumberInput.value = savedPhoneNumber;
    }
}

// 폼 제출 시 정보 저장
function saveInfo(event) {
    event.preventDefault(); // 폼 기본 동작 막기

    // 입력된 정보 가져오기
    const nameValue = nameInput.value;
    const positionValue = positionInput.value;
    const emailValue = emailInput.value;
    const phoneNumberValue = phoneNumberInput.value;

    // 로컬 스토리지에 정보 저장
    localStorage.setItem('name', nameValue);
    localStorage.setItem('position', positionValue);
    localStorage.setItem('email', emailValue);
    localStorage.setItem('phoneNumber', phoneNumberValue);
}

// 모달 드래그 기능
function onMouseDown(e) {
    if (e.button !== 0) return; // 마우스 왼쪽 버튼이 아니면 종료
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
