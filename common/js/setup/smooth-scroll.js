import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@common/js/setup/gsap.js";

// Lenis runs only on mouse/trackpad devices with motion allowed.
// Touch devices (pointer: coarse) keep native scrolling.
// 마우스·트랙패드 기기 + '동작 줄이기' 꺼짐일 때만 Lenis 실행
// 터치 기기(pointer: coarse)는 네이티브 스크롤 그대로 사용
const SMOOTH_QUERY =
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Ignore address-bar show/hide resizes on mobile (avoids needless refresh).
// 모바일 주소창 접힘/펼침 리사이즈 무시 (불필요한 refresh 방지)
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis = null;

// Current Lenis instance, or null when native scrolling is in use.
// 현재 Lenis 인스턴스 (네이티브 스크롤 중이면 null)
export const getLenis = () => lenis;

// Side effect: start/stop Lenis as the media query matches/unmatches,
// and keep it in sync with GSAP's ticker and ScrollTrigger.
// 부수효과: 미디어쿼리 일치 여부에 따라 Lenis를 켜고 끄며 GSAP ticker·ScrollTrigger와 동기화
export const initSmoothScroll = (options = {}) => {
    const mm = gsap.matchMedia();

    mm.add(SMOOTH_QUERY, () => {
        lenis = new Lenis(options);

        const raf = (time) => lenis.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        // Cleanup: runs when the query stops matching (e.g. reduced motion turned on).
        // 정리: 조건이 풀릴 때 실행 (예: '동작 줄이기'를 켰을 때)
        return () => {
            gsap.ticker.remove(raf);
            gsap.ticker.lagSmoothing(500, 33); // GSAP default / 기본값 복원
            lenis.destroy();
            lenis = null;
        };
    });

    return mm;
};
