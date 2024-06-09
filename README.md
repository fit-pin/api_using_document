# api_using_document

핏핀 API 사용법

## 설명

-   앱은 제가 utills 폴더에 [Request.ts](https://github.com/fit-pin/fitpin_frontend/blob/ff73e669f01a6b2e9d1ad86887f724488fffd365/android/app/src/utills/Request.ts) 만들어서 그거 그대로 쓰시면 되요

    -   그리고 [Constant.ts](https://github.com/fit-pin/fitpin_frontend/blob/ff73e669f01a6b2e9d1ad86887f724488fffd365/android/app/src/Constant.ts) 여기에 요청 URL들 상수로 정의 해놨는데 추후 서버 배포 되면 주소 바꿔서 사용 하심 되요

-   웹은 `Request.js` 파일 다운 받아서 어딘가에 놓고 쓰면 되요

-   함수 설명도 다 처리 했으니 함수설명도 봐주심 좋아요

## 예제코드

### 데이터 백엔드 요청

-   응답 Body 가 이렇다고 가정

    ```json
    { "name": "아무개" }
    ```

#### GET 요청

-   async, await 방식

```ts
import { reqGet } from "./Request.ts"; // 이건 경로 잘 바꿀것

async function name() {
    const res = await reqGet("http://localhost/api");
    console.log(res.name); // 아무개 출력
}
```

-   callback 방식

```ts
import { reqGet } from "./Request.ts"; // 이건 경로 잘 바꿀것

reqGet("http://localhost/api")
    .then((res) => {
        console.log(res.name); // 아무개 출력
    })
    .catch((e) => {
        // 예외 발생시
        console.log(e);
    });
```

#### POST 요청

-   async, await 방식

```ts
import { reqPost } from "./Request.ts"; // 이건 경로 잘 바꿀것

// 요청 body 만드는거
const body = {
    data: "test",
};

async function name() {
    const res = await reqPost("http://localhost/api", body);
    console.log(res.name); // 아무개 출력
}
```

-   callback 방식

```ts
import { reqPost } from "./Request.ts"; // 이건 경로 잘 바꿀것

// 요청 body 만드는거
const body = {
    data: "test",
};

reqPost("http://localhost/api", body)
    .then((res) => {
        console.log(res.name);
    })
    .then((e) => {
        // 예외 발생시
        console.log(e);
    });
```

### AR 백엔드 요청

-   AR은 [Camera.tsx](https://github.com/fit-pin/fitpin_frontend/blob/ff73e669f01a6b2e9d1ad86887f724488fffd365/android/app/src/screens/Main/Camera.tsx#L98-L117) 에 제가 연결 해둔거 참고 해주세요

-   `path.join()` 은 `http://localhost`, `/api` -> `http://localhost/api` 이런식으로 url 합치는 함수입니다.

```ts
import { ArRequest } from "./Request.ts"; // 이건 경로 잘 바꿀것

const formData = new FormData(); // multipart/form-data 만들기
const name = data.uri.split("/").pop();

// 키값이 anaFile, 요청해야 되는게 파일
formData.append("anaFile", {
    uri: "파일 uri", // 파일 uri
    name: "test.jpg", // 파일 이름 (아무거나 상관x)
    type: "image/jpeg", // 파일 타입
} as FormDataValue);

// 키값이 personKey, 요청해야 되는게 숫자
formData.append("personKey", "174");

// await, async  방식
async function name() {
    const res = await ArRequest(path.join(AR_URL, "bodymea"), formData);

    // 응답이 json 이면
    console.log(await res.json());

    // 응답이 파일이면
    console.log(await res.blob());
}

// callback 방식
ArRequest(path.join(AR_URL, "bodymea"), formData)
    .then(async (res) => {
        // 응답이 json 이면
        console.log(await res.json());

        // 응답이 파일이면
        console.log(await res.blob());
    })
    .catch((e) => console.log(e));
```
