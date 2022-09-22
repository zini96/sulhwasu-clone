$(function () {
  const btn_tab = $(".recomm_tab a.btn_tab");
  const recomm_list = $(".recomm_list");

  btn_tab.click(recomm);

  function recomm(e) {
    e.preventDefault();

    const idx = $(this).index(); //내가 현재 누른 탭 btn의 index 구하기
    console.log(idx);

    btn_tab.removeClass("On"); //전체 class 삭제하고
    $(this).addClass("On"); //내가 누른 탭만 addClass

    recomm_list.removeClass("Act");
    recomm_list.eq(idx).addClass("Act");
  }
});
