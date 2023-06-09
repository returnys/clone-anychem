/**
 * 작성자 : 손용수
 * 작성일 : 2023-05-26
 * 기능 업데이트 : 메뉴 네비 작업 완료
 */
// 웹브라우저에 html, css, js, image를 모두 불러들여서 렌더링 준비가 끝나면
// 그 때 function의 블럭 안쪽 {} 실행
window.addEventListener("load", function () {
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
  // 메뉴 바 만들기
  let gnbA = document.querySelectorAll(".gnb > li");
  let navBlueBar = document.querySelector(".nav-blue-bar");
  // 최초 위치 및 너비
  let posX = gnbA[0].getBoundingClientRect().left;
  let widthX = gnbA[0].getBoundingClientRect().width;
  navBlueBar.style.left = posX + "px";
  navBlueBar.style.width = widthX + "px";

  gnbA.forEach((item) => {
    item.addEventListener("mouseenter", function (e) {
      // 기준으로 부터 떨어진 값
      let posX = this.getBoundingClientRect().left;
      let widthX = this.getBoundingClientRect().width;
      // navBlueBar.style.left = posX + "px";
      // navBlueBar.style.width = widthX + "px";
      anime({
        targets: navBlueBar,
        left: posX,
        width: widthX,
        easing: "easeInOutQuad",
        duration: 400,
      });
    });
  });
  // 스크롤에 의한 position:fixed, relative 교체
  const visual = document.querySelector(".visual");
  window.addEventListener("scroll", function () {
    // 스크롤 위치값을 파악
    let scY = window.scrollY;
    // classList.add()와 classList.remove() 활용
    if (scY > 0) {
      // 스크롤바가 아래로 조금이라도 이동
      // position: fixed;
      header.classList.add("header-fixed");
      visual.classList.add("visual-fixed");
    } else {
      // 스크롤바가 최상단에 위치
      // position: relative;
      header.classList.remove("header-fixed");
      visual.classList.remove("visual-fixed");
    }
  });
});
