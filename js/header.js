// 웹브라우저에 html, css, js, image를 모두 불러들여서 렌더링 준비가 끝나면
// 그 때 function의 블럭 안쪽 {} 실행
window.onload = function () {
  // nav에 마우스 오버하면 header 높이 260px 변경하기
  // nav에 마우스 아웃하면 header 높이 100px 변경하기
  // header를 js로 저장해보자(변수 정의 해보자)
  const header = document.querySelector(".header");
  // nav를 js로 저장해보자(변수 정의 해보자)
  let nav = document.querySelector(".nav");
  // console.log(header);
  // console.log(nav);

  // nav에 마우스 오버 처리
  // html 요소에 마우스 오버 처리하는 법
  nav.addEventListener("mouseenter", function () {
    // header의 높이를 260px로 변경하고 싶다
    // header.style.height = "260px";
    // 우리는 260px로 변경되는 class를 작성해 두었다
    header.classList.add("header-active");
  });
  // nav에 마우스 아웃 처리
  // html 요소에 마우스 아웃 처리하는 법
  nav.addEventListener("mouseleave", function () {
    // header의 높이를 100px로 변경하고 싶다
    // header.style.height = "100px";
    // 클래스를 제거한다
    header.classList.remove("header-active");
  });
};
