import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once and re-export for every prototype.
// 플러그인을 한 번만 등록하고 모든 프로토타입에서 가져다 씁니다.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
