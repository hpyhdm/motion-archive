# Motion Archive

Interaction motion prototypes rebuilt from web projects I worked on.
구축 프로젝트에서 작업했던 인터랙션 모션을 프로토타입으로 재구성해 기록하는 아카이브입니다.

> All code is rewritten from scratch. Client assets (images, logos) are replaced with placeholders.
> 모든 코드는 새로 작성했으며, 클라이언트 리소스(이미지, 로고)는 플레이스홀더로 대체했습니다.

## Stack / 기술 스택

- HTML, SCSS, JavaScript (ES Modules)
- [GSAP](https://gsap.com/) + ScrollTrigger
- [Lenis](https://github.com/darkroomengineering/lenis) (smooth scroll / 부드러운 스크롤)
- [Vite](https://vite.dev/) (multi-page / 멀티 페이지)

## Getting started / 실행 방법

Requires Node.js 20.19+ or 22.12+.
Node.js 20.19 이상 또는 22.12 이상이 필요합니다.

```bash
npm install
npm run dev      # local dev server / 로컬 개발 서버
npm run build    # build to dist/ / dist/로 빌드
npm run preview  # preview the build / 빌드 결과 미리보기
```

## Structure / 폴더 구조

```
motion-archive/
├─ index.html              # archive list / 전체 목록 페이지
├─ style.scss              # archive list styles only / 목록 페이지 전용 스타일
├─ vite.config.js          # auto-registers projects/**/index.html / 프로토타입 페이지 자동 등록
├─ public/                 # copied as-is / 빌드 시 그대로 복사
├─ common/                 # common to every prototype / 모든 프로토타입 공통
│  ├─ scss/
│  │  ├─ _variables.scss   # font, breakpoints / 폰트, 브레이크포인트
│  │  ├─ _mixins.scss      # media(), to_vw(), fontSize(), ellipsis(), flex(), wordBreak
│  │  ├─ _reset.scss
│  │  ├─ _layout.scss      # :root vars for to_vw() / to_vw()용 :root 변수
│  │  └─ index.scss        # shared CSS entry / 공통 CSS 진입점
│  ├─ js/
│  │  ├─ setup/            # loaded once per page / 페이지마다 한 번 불러오는 설정
│  │  │  ├─ base.js        # web font + Lenis CSS + shared CSS / 웹폰트 + Lenis CSS + 공통 CSS
│  │  │  ├─ gsap.js        # GSAP + plugin registration / GSAP·플러그인 등록
│  │  │  └─ smooth-scroll.js # Lenis synced with ScrollTrigger / ScrollTrigger와 동기화된 Lenis
│  │  ├─ components/       # UI parts / 화면 요소
│  │  │  ├─ header.js      # top bar / 상단 바
│  │  │  └─ footer.js      # footer with source link / 소스 링크가 있는 푸터
│  │  └─ utils/
│  │     └─ utils.js       # pure helpers / 순수 유틸 함수
│  └─ images/              # placeholders / 플레이스홀더
└─ projects/
   └─ <project>/
      └─ <motion>/
         ├─ index.html
         ├─ style.scss
         ├─ main.js
         └─ README.md      # notes: context, motion, improvements / 기록
```

## Adding a prototype / 프로토타입 추가하기

1. Create `projects/<project>/<motion>/index.html`. It is picked up by the build automatically.
   Use `main.js` as the only script, and keep the shared favicon.
   `projects/<project>/<motion>/index.html`을 만들면 빌드에 자동으로 등록됩니다.
   스크립트는 `main.js` 하나만 연결하고, 공통 파비콘을 유지합니다.

   ```html
   <!doctype html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link rel="icon" type="image/svg+xml" href="/favicon.svg">
       <title>Motion Name — Project Name | Motion Archive</title>
   </head>
   <body>
   <div id="wrap">
       <div id="container" class="container">
           <!-- prototype markup / 프로토타입 마크업 -->
       </div>
   </div>
   <script type="module" src="./main.js"></script>
   </body>
   </html>
   ```

2. In `main.js` (the page entry point), load the shared base styles first, then mount the header and footer:
   `main.js`(페이지 진입점)에서 공통 기본 스타일을 가장 먼저 불러오고, 헤더와 푸터를 붙입니다.

   ```js
   import "@common/js/setup/base.js"; // must come before ./style.scss / ./style.scss보다 먼저
   import "./style.scss";
   import { mountHeader } from "@common/js/components/header.js";
   import { mountFooter } from "@common/js/components/footer.js";
   import { gsap, ScrollTrigger } from "@common/js/setup/gsap.js";
   import { initSmoothScroll } from "@common/js/setup/smooth-scroll.js";

   mountHeader({ project: "Project Name", title: "Motion Name", meta: "Scroll · Pin · 2023" });
   mountFooter(); // source link is built from the page path / 소스 링크는 페이지 경로로 자동 생성
   initSmoothScroll(); // skipped when reduced motion is on / '동작 줄이기' 설정 시 건너뜀
   ```

3. In `style.scss`, load the shared variables and mixins (no CSS output):
   `style.scss`에서 공통 변수와 mixin을 불러옵니다 (CSS는 출력되지 않음).

   ```scss
   @use "@common/scss/variables" as *;
   @use "@common/scss/mixins" as *;
   ```

4. Add a link to the root `index.html`.
   최상위 `index.html` 목록에 링크를 추가합니다.

## Naming / 이름 규칙

Folders use lowercase kebab-case, e.g. `xi-elevator/customer-focus`.
폴더명은 소문자 + 하이픈(kebab-case)을 사용합니다. 예: `xi-elevator/customer-focus`
