// Entry point for this prototype: shared styles → page styles → header → smooth scroll → motions.
// 이 프로토타입의 진입점: 공통 스타일 → 페이지 스타일 → 헤더 → 부드러운 스크롤 → 모션
import "@shared/js/setup/base.js";
import "./style.scss";
import { mountHeader } from "@shared/js/components/header.js";
import { gsap, ScrollTrigger } from "@shared/js/setup/gsap.js";
import { initSmoothScroll } from "@shared/js/setup/smooth-scroll.js";

mountHeader({
    project: "XI Elevator",
    title: "Sticky text switch",
    meta: "Scroll · Pin · 2023",
});
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

function secStickyTextSwitch() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sec_sticky_text_switch",
            start: "top top",
            end: "bottom bottom",
            markers: true
        }
    });
}

secStickyTextSwitch();
