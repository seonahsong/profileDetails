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

// 이벤트 리스너 등록
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
infoForm.addEventListener('submit', handleFormSubmit);
infoForm.addEventListener('submit', saveInfo);
window.addEventListener('load', loadSavedInfo);

// 모달 열기
function openModal() {
    modal.style.display = "block";
}

// 모달 닫기
function closeModal() {
    modal.style.display = "none";
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


