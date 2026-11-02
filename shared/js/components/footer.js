const REPO_URL = "https://github.com/hpyhdm/motion-archive/tree/main";

// Pure: options → footer HTML string (no DOM access).
// 순수 함수: 옵션 → 푸터 HTML 문자열 (DOM에 접근하지 않음)
const createFooter = ({ sourcePath, year }) => `
    <footer id="footer" class="footer">
        <p>All code rewritten from scratch. Images are placeholders.</p>
        <div class="footer_links">
            <a href="${REPO_URL}${sourcePath}" target="_blank" rel="noopener">View source</a>
            <span class="footer_copy">© ${year} hpyhdm</span>
        </div>
    </footer>
`;

// Side effect: insert the markup at the end of the target and return the footer element.
// 부수효과: 마크업을 대상 요소의 맨 끝에 삽입하고 푸터 요소를 반환
const insertFooter = (html, target) => {
    target.insertAdjacentHTML("beforeend", html);
    return target.lastElementChild;
};

// Public entry: reads the page path and year, then mounts into #wrap.
// 진입점: 현재 페이지 경로와 연도를 읽어서 #wrap 맨 끝에 삽입
export const mountFooter = (selector = "#wrap") => {
    const target = document.querySelector(selector) ?? document.body;
    const options = {
        sourcePath: window.location.pathname,
        year: new Date().getFullYear(),
    };
    return insertFooter(createFooter(options), target);
};
