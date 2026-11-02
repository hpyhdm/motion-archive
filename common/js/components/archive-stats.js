// Read: count project groups and motion items in the list (DOM read only).
// 읽기: 목록의 프로젝트 그룹과 모션 항목 개수를 셈 (DOM을 읽기만 함)
const countArchive = (root) => ({
    projects: root.querySelectorAll(".archive_group").length,
    motions: root.querySelectorAll(".archive_item").length,
});

// Pure: "1 project" / "3 projects"
// 순수 함수: 단수/복수 처리
const pluralize = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

// Pure: counts → display text
// 순수 함수: 개수 → 표시 문구
const formatStats = ({ projects, motions }) =>
    [pluralize(projects, "project"), pluralize(motions, "motion"), "Rewritten from scratch"].join(" · ");

// Side effect: write the text into the placeholder element.
// 부수효과: 자리 요소에 문구를 넣음
export const renderArchiveStats = (selector = "[data-archive-stats]") => {
    const target = document.querySelector(selector);
    if (!target) return;
    target.textContent = formatStats(countArchive(document));
};
