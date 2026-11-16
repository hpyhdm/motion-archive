import "@common/js/setup/base.js"; // must come before ./style.scss
import "./style.scss";
import { mountHeader } from "@common/js/components/header.js";
import { mountFooter } from "@common/js/components/footer.js";
import { gsap, ScrollTrigger } from "@common/js/setup/gsap.js";
import { initSmoothScroll } from "@common/js/setup/smooth-scroll.js";

mountHeader({
    project: "XI Elevator",
    title: "Circle counter reveal",
    meta: "Scroll · Pin · Scrub · 2023",
});

mountFooter();
initSmoothScroll();

// Side effect: play or pause a video (ignores autoplay-block errors).
// 부수효과: 비디오 재생/정지 (자동 재생 차단 오류는 무시)
const controlVideo = (video, isPlay) => {
    if (!video) return;
    isPlay ? video.play().catch(() => {}) : video.pause();
};

// .sec_intro — video play/pause (all sizes)
// .sec_intro — 영상 재생/정지 (모든 화면 크기)
function secIntroVideo() {
    const section = document.querySelector(".sec_intro");
    const video = section.querySelector("video");

    ScrollTrigger.create({
        trigger: section,
        start: "top bottom", // section top reaches viewport bottom / 섹션 상단이 화면 하단에 닿을 때
        end: "bottom top",   // section bottom leaves viewport top / 섹션 하단이 화면 상단을 벗어날 때
        markers: false,
        refreshPriority: -1, // always measured after the pin, even when the pin is recreated on resize / 리사이즈로 pin이 다시 생겨도 항상 pin 다음에 계산
        onToggle: ({ isActive }) => controlVideo(video, isActive), // enter/leave both ways / 위아래 진입·이탈 모두
    });
}

// .sec_intro — pinned circle motion (PC only)
// .sec_intro — 고정된 상태에서 원 모션 (PC 전용)
function secIntroMotion() {
    const section = document.querySelector(".sec_intro");
    const q = gsap.utils.selector(section);
    const items = q(".circle_item");
    const list = q(".circle_list")[0];

    // Read: distance from a side circle to the middle one (circle width + gap), in px.
    // Read again on every refresh because the sizes are vw-based.
    // 읽기 전용: 양옆 원이 가운데 원까지 가야 하는 거리 (원 너비 + 간격, px)
    // 크기가 vw 기반이라 refresh 때마다 다시 읽음
    const getShift = () => items[0].offsetWidth + parseFloat(getComputedStyle(list).columnGap);

    const tl = gsap.timeline({
        defaults: { ease: "none" }, // scrub: let scroll decide the speed / scrub이므로 속도는 스크롤이 결정
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%",            // pinned for 2.5 screens of scroll / 화면 2.5개 분량 스크롤 동안 고정
            pin: true,
            scrub: true,
            invalidateOnRefresh: true, // recalc vh/vw-based values on resize / 리사이즈 시 vh·vw 값 다시 계산
            markers: false,
        },
    });

    tl
        // 1. hide scroll hint, dim the video, bring circles up
        // 1. 스크롤 안내 숨김, 영상 어둡게, 원 영역 올라옴
        // Every tween is fromTo: with invalidateOnRefresh, a plain .to() re-reads its start value
        // from GSAP's own inline styles on resize, which then survive matchMedia's revert.
        // 모두 fromTo로 작성: invalidateOnRefresh 상태에서 .to()는 리사이즈 때 GSAP가 넣은 인라인 값을
        // 시작 값으로 다시 읽어서, matchMedia가 정리한 뒤에도 그 값이 남음 (태블릿에서 내용이 안 보이던 원인)
        .fromTo(q(".ic_scroll_down"), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 40, duration: 0.5 }, "intro")
        .fromTo(q(".bg_dim"), { opacity: 0 }, { opacity: 0.8, duration: 0.5 }, "intro")
        .fromTo(q(".circle_inner"),
            { y: () => window.innerHeight, visibility: "hidden" },
            { y: 0, visibility: "visible", duration: 1 }, "intro")

        // 2. spread first/last circles to the sides
        // 2. 첫 번째·마지막 원이 양옆으로 펼쳐짐
        .fromTo(items[0], { x: () => getShift() }, { x: 0, duration: 1 }, "intro+=0.5")
        .fromTo(items[items.length - 1], { x: () => -getShift() }, { x: 0, duration: 1 }, "intro+=0.5")

        // 3. contents fade in one by one
        // 3. 원 안의 내용이 하나씩 나타남
        .fromTo(q(".circle_txt"), { y: 0, yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.5 })

        // 4. numbers fill from the bottom one by one
        // 4. 숫자가 아래부터 하나씩 채워짐
        .fromTo(q(".num.fill"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, stagger: 0.5 });
}

// PC only (≥1025px, matches media(false, tablet) in SCSS): reverted automatically below it.
// PC 전용 (1025px 이상, SCSS의 media(false, tablet)과 같은 기준): 그 아래로 내려가면 자동으로 정리됨
const mm = gsap.matchMedia();

mm.add("(min-width: 1025px)", () => {
    secIntroMotion();
});

// Create after the pin so the end position includes the pinned distance.
// pin보다 나중에 만들어야 고정된 구간까지 포함해서 end 위치가 계산됨
secIntroVideo();
