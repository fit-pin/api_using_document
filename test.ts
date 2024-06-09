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
        console.log(e);
    });
