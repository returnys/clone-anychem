window.addEventListener("load", function () {
  // 모바일 버튼 기능
  const mbNav = document.querySelector(".mb-nav");
  const mbNavActive = "mb-nav-active";
  const mbWrap = document.querySelector(".mb-wrap");
  const mbWrapActive = "mb-wrap-active";
  const mbWidth = 1024;

  mbNav.addEventListener("click", function () {
    // mb-nav-active 클래스 적용 여부(true, false)
    let checkActive = mbNav.classList.contains(mbNavActive);
    // 토글 사용(있으면 제거, 없으면 적용)
    // mbNav.classList.toggle("mb-nav-active");
    // 조건문 사용(add, remove)
    if (checkActive === false) {
      mbNav.classList.add(mbNavActive);
      mbWrap.classList.add(mbWrapActive);
    } else {
      mbNav.classList.remove(mbNavActive);
      mbWrap.classList.remove(mbWrapActive);
    }
    // 서브메뉴 리셋
    resetSubMenu();
    // 펼칠 기록 변수 초기화
    sideOpenNumber = undefined;
  });
  // 화면의 리사이즈를 체크해서 처리
  // this.window.onresize = function(){}
  this.window.addEventListener("resize", function () {
    // 화면의 너비 체크할 때 사용
    let windowWidth = window.innerWidth;
    if (windowWidth > mbWidth) {
      mbNav.classList.remove(mbNavActive);
      mbWrap.classList.remove(mbWrapActive);
      // 서브메뉴 리셋
      resetSubMenu();
      // 펼칠 기록 변수 초기화
      sideOpenNumber = undefined;
    }
  });
  const mbGnb = document.querySelector(".mb-gnb");
  mbGnb.addEventListener("click", (e) => {
    // 이벤트 전달 막기
    e.stopPropagation();
  });
  mbWrap.addEventListener("click", () => {
    mbNav.classList.remove(mbNavActive);
    mbWrap.classList.remove(mbWrapActive);
    // 서브메뉴 리셋
    resetSubMenu();
    // 펼칠 기록 변수 초기화
    sideOpenNumber = undefined;
  });
  // 모바일 아코디언 메뉴
  const sideLis = document.querySelectorAll(".side-menu > li");
  const sideMenuA = document.querySelectorAll(".side-menu > li > a");
  const sideSubMenuA = document.querySelectorAll(".side-menu > li .submenu");
  const sideMenuOffset = 53;
  let sideOpenNumber;
  // 펼쳐질 높이값을 담아둔다
  const sideOpenHeightArray = [];
  // 각 서브 메뉴의 높이를 알아보자
  sideSubMenuA.forEach((item, index) => {
    sideOpenHeightArray[index] = item.scrollHeight + sideMenuOffset;
  });
  // 클릭 처리 시작
  sideMenuA.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      showSubMenu(index);
    });
  });
  function resetSubMenu() {
    sideLis.forEach((item) => {
      // 모든 li의 높이를 53으로 하겠다(reset하겠다)
      // item.style.height = sideMenuOffset + "px";
      anime({
        targets: item,
        height: sideMenuOffset,
        easing: "easeInOutQuad",
        duration: 350,
      });
    });
  }
  function showSubMenu(showIndex) {
    // 서브메뉴 리셋
    resetSubMenu();
    // 펼친 번호와 같은 값이 인수로 전달되면
    // return으로 빠져나가서 펼칠 코드를 실행하지 않는다
    if (showIndex === sideOpenNumber) {
      // 펼칠 기록 변수 초기화
      sideOpenNumber = undefined;
      return;
    }
    //showIndex에 해당하는 li의 높이를 변경하겠다
    sideLis.forEach((item, index) => {
      if (showIndex === index) {
        // item.style.height = sideOpenHeightArray[showIndex] + "px";
        anime({
          targets: item,
          height: sideOpenHeightArray[showIndex],
          easing: "easeInOutQuad",
          duration: 350,
        });
      }
    });
    // 펼쳤을 때 번호를 변수에 저장
    sideOpenNumber = showIndex;
  }
});
