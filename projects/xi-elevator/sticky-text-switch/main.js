import "@common/js/setup/base.js"; // must come before ./style.scss
import "./style.scss";
import { mountHeader } from "@common/js/components/header.js";
import { mountFooter } from "@common/js/components/footer.js";
import { gsap, ScrollTrigger } from "@common/js/setup/gsap.js";
import { initSmoothScroll } from "@common/js/setup/smooth-scroll.js";

mountHeader({
    project: "XI Elevator",
    title: "Sticky text switch",
    meta: "Scroll · Pin · 2023",
});
mountFooter();
initSmoothScroll();

// .sec_visual_intro
function secVisualIntro() {
    ScrollTrigger.create({
        trigger: ".sec_visual_intro .bg_area",
        start: "top bottom",
        end: "bottom top",
        toggleClass: "active",     // trigger 요소에 붙음
        markers: false,
    });
}

// .sec_sticky_text_switch
// Pure: scroll progress (0–1) → active index (0 ~ count - 1)
// 순수 함수: 스크롤 진행률(0~1) → 활성 인덱스(0 ~ 개수-1)
const getActiveIdx = (progress, count) =>
    Math.min(count - 1, Math.floor(progress * count));

// Side effect: add .active only to the item at the given index
// 부수효과: 해당 인덱스의 요소에만 .active 부여
const setActive = (items, idx) => {
    items.forEach((item, i) => item.classList.toggle("active", i === idx));
};

function secStickyTextSwitch() {
    const section = document.querySelector(".sec_sticky_text_switch");
    const txts = [...section.querySelectorAll(".txt")];
    const imgs = [...section.querySelectorAll(".img")];
    let current = 0; // index currently shown / 현재 보이는 인덱스

    // Side effect: show the item that matches the progress (skips if unchanged).
    // 부수효과: 진행률에 맞는 항목을 보여줌 (번호가 같으면 건너뜀)
    const sync = (progress) => {
        const idx = getActiveIdx(progress, txts.length);
        if (idx === current) return;

        current = idx;
        setActive(txts, idx);
        setActive(imgs, idx);
    };

    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        markers: false,
        onUpdate: ({ progress }) => sync(progress),
        onRefresh: ({ progress }) => sync(progress), // load + resize / 로드 및 리사이즈 시
    });

    // Cleanup: restore the first item when leaving PC size.
    // 정리: PC 크기를 벗어날 때 첫 번째 항목 상태로 되돌림
    return () => {
        setActive(txts, 0);
        setActive(imgs, 0);
    };
}

// PC only (≥1025px, matches media(false, tablet) in SCSS): motions are reverted automatically below it.
// PC 전용 (1025px 이상, SCSS의 media(false, tablet)과 같은 기준): 그 아래로 내려가면 모션이 자동으로 정리됨
const mm = gsap.matchMedia();

mm.add("(min-width: 1025px)", () => {
    secVisualIntro();
    return secStickyTextSwitch();
});
