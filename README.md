# api_using_document

핏핀 API 사용법

## 설명

-   앱은 제가 utills 폴더에 [Request.ts](https://github.com/fit-pin/fitpin_frontend/blob/ff73e669f01a6b2e9d1ad86887f724488fffd365/android/app/src/utills/Request.ts) 만들어서 그거 그대로 쓰시면 되요

    -   그리고 [Constant.ts](https://github.com/fit-pin/fitpin_frontend/blob/ff73e669f01a6b2e9d1ad86887f724488fffd365/android/app/src/Constant.ts) 여기에 요청 URL들 상수로 정의 해놨는데 추후 서버 배포 되면 주소 바꿔서 사용 하심 되요

-   웹은 `Request.js` 파일 다운 받아서 어딘가에 놓고 쓰면 되요

-   함수 설명도 다 처리 했으니 함수설명도 봐주심 좋아요

## 예제코드

### 실전예제

```ts
// post 요청 예시
// api 요청 문서에 body를 함수 인자로 두는거다
// 그리고 path.join() 에 , 를 나누는 기준은 "/""
// api/test/ps 면
// path.join("api", "test", "ps")
// DATA_URL 은 Constant.ts 에 정의된 DB 요청 원본 주소를 가르킨다 (http://localhost/)
reqPost(path.join(DATA_URL, "/items"), {
    itemKey: 1,
    itemNum: 1,
    itemName: "테스트용 요청 옷",
    itemType: "상의",
    ItemBrand: "테스트용 브랜드",
    itemImg1: "img1.png",
    itemImg2: "img2.png",
    itemImg3: "img3.png",
    itemCnt: "5000",
    itemContent: "테스트 아이템입니다",
    itemPrice: 300,
    itemDate: "2023-06-05",
}).then((item) => {
    console.log(item); // 이제 데이터가 오면 여기 콘솔로그가 찍힐 것
    console.log("테스트");
});

console.log("아아"); // 이친구는 위 테스트 보다 먼저 찍힌다. 왜냐면 위 로직이 비동기이다

// get 요청 예시
reqGet(path.join(DATA_URL, "/itemdetails", "1")).then((item) => console.log(item));
```

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
    .catch((e) => {
        // 예외 발생시
        console.log(e);
    });
```

#### 파일 업로드 (앱)

```js
import { reqFileUpload } from "./Request.ts";

const formData = new FormData();
// 입력값이 일반적인 경우
formData.append("키1", "일반값");
formData.append("키2", "일반값");

// 입력값이 파일인경우
formData.append('키3', {
    uri: '이미지 uri',
    name: 'test.jpg',
    type: 'image/jpeg',
} as FormDataValue);

// async, await 방식 으로 요청 할려면
const res = await reqFileUpload(path.join("url"), formData);
console.log(res);

// callback 방식 으로 요청 할려면
reqFileUpload(path.join("url"), formData)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        // 예외 발생시
        console.log(e);
    });
```

#### 파일 업로드 (웹)

-   참고로 GPT가 짜준거 수정한거라 테스트는 못해봐서 안될수도 있어요

```tsx
import React from "react";
import { reqFileUpload } from "./Request.js";

function App() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        // async, await 방식
        const res = await reqFileUpload("url", formData);
        console.log(res);

        // callback 방식
        reqFileUpload("url", formData)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* input 에 name 속성을 api 문서 키값과 맞출것  */}
                <div>
                    Name: <input type="text" name="name" required />
                </div>
                <div>
                    File: <input type="file" name="file" required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
```

### AR 백엔드 요청

-   AR은 [Camera.tsx](https://github.com/fit-pin/fitpin_frontend/blob/ff73e669f01a6b2e9d1ad86887f724488fffd365/android/app/src/screens/Main/Camera.tsx#L98-L117) 에 제가 연결 해둔거 참고 해주세요

-   `path.join()` 은 `http://localhost`, `/api` -> `http://localhost/api` 이런식으로 url 합치는 함수입니다.
