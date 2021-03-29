// 쿠키 조회하기 or 파싱하기
// const getCookie = (name) => {
//   let value = ';' + document.cookie;
//   let parts = value.split('; ' + name + '=');
//   if (parts.length === 2) {
//     return parts.pop().split(';').shift();
//   }
// };

// 쿠키에 저장
const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  // 날짜 생성
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 24);
  // 쿠키 저장
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};
// 쿠키 삭제
const deleteCookie = (name) => {
  // 예전 날짜로 설정해서 제거
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};

export { setCookie, deleteCookie };
