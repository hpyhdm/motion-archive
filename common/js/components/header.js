// Pure: options → header HTML string (no DOM access).
// 순수 함수: 옵션 → 헤더 HTML 문자열 (DOM에 접근하지 않음)
const createHeader = ({ project, title, meta = "" }) => `
    <header id="header" class="header">
        <a class="header_back" href="/">/ Back</a>
        <div class="header_info">
            <span class="header_project">${project}</span>
            <h1 class="header_title">${title}</h1>
            ${meta ? `<span class="header_meta">${meta}</span>` : ""}
        </div>
    </header>
`;

// Side effect: insert the markup at the start of the target and return the header element.
// 부수효과: 마크업을 대상 요소의 맨 앞에 삽입하고 헤더 요소를 반환
const insertHeader = (html, target) => {
    target.insertAdjacentHTML("afterbegin", html);
    return target.firstElementChild;
};

// Public entry: mounts into #wrap by default, falls back to <body> if missing.
// 진입점: 기본은 #wrap 맨 앞에 삽입하고, #wrap이 없으면 <body>에 삽입
export const mountHeader = (options, selector = "#wrap") => {
    const target = document.querySelector(selector) ?? document.body;
    return insertHeader(createHeader(options), target);
};
