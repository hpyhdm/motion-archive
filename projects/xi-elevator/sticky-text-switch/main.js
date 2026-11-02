// Entry point for this prototype: shared styles → page styles → header/footer → smooth scroll → motions.
// 이 프로토타입의 진입점: 공통 스타일 → 페이지 스타일 → 헤더/푸터 → 부드러운 스크롤 → 모션
import "@shared/js/setup/base.js";
import "./style.scss";
import { mountHeader } from "@shared/js/components/header.js";
import { mountFooter } from "@shared/js/components/footer.js";
import { gsap, ScrollTrigger } from "@shared/js/setup/gsap.js";
import { initSmoothScroll } from "@shared/js/setup/smooth-scroll.js";

mountHeader({
    project: "XI Elevator",
    title: "Sticky text switch",
    meta: "Scroll · Pin · 2023",
});
mountFooter();
initSmoothScroll();

function secVisualIntro() {
    ScrollTrigger.create({
        trigger: ".sec_visual_intro .bg_area",
        start: "top bottom",
        end: "bottom top",
        toggleClass: "active",     // trigger 요소에 붙음
        markers: false,
    });
}

secVisualIntro();

// .sec_sticky_text_switch
const getActiveIdx = (progress, count) =>
    Math.min(count - 1, Math.floor(progress * count));

const setActive = (items, idx) => {
    items.forEach((item, i) => item.classList.toggle("active", i === idx));
}

function secStickyTextSwitch() {
    const section = document.querySelector(".sec_sticky_text_switch");
    const txts = [...section.querySelectorAll(".txt")];
    const imgs = [...section.querySelectorAll(".img")];
    let current = 0; // index currently shown / 현재 보이는 인덱스

    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        markers: false,
        onUpdate: ({ progress }) => {
            const index = getActiveIdx(progress, txts.length);
            if (index === current) return;

            current = index;
            setActive(txts, index);
            setActive(imgs, index);
        },
    });
}

secStickyTextSwitch();
