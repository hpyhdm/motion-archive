import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@shared/js/setup/gsap.js";

// Pure: check the user's reduced-motion setting.
// 순수 함수: 사용자의 '동작 줄이기' 설정 확인
const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Side effect: start Lenis and sync it with GSAP's ticker and ScrollTrigger.
// 부수효과: Lenis를 시작하고 GSAP ticker·ScrollTrigger와 동기화
export const initSmoothScroll = (options = {}) => {
    if (prefersReducedMotion()) return null;

    const lenis = new Lenis(options);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return lenis;
};
