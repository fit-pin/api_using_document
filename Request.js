/**  데이터 백엔드에 get 요청을 보냅니다.
 * @param {str} url 요청주소
 * @returns 응답 json
 * @example
 * // async, await 방식
 * async function any() {
 *   const data = await reqGet('url');
 *   console.log(data.아무개);
 * }
 * // callback 방식
 * reqGet('url')
 *  .then(data => console.log(data.아무개))
 *  .catch(err => console.log(err));
 */
export async function reqGet(url) {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
  
    return await res.json();
  }
  
/** 데이터 백엔드에 post 요청을 보냅니다.
 * @param {str} url 요청주소
 * @param {object} body 요청 js객체
 * @returns 응답 json
 * @example
 * // async, await 방식
 * async function any() {
 *   const data = await reqGet('url', {키: '값'});
 *   console.log(data.아무개);
 * }
 * // callback 방식
 * reqGet('url', {키: '값'})
 *  .then(data => console.log(data.아무개))
 *  .catch(err => console.log(err));
 */
export async function reqPost(url, body) {
  const res = await fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return await res.json();
}
  
