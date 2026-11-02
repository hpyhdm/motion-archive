# Motion Archive

Interaction motion prototypes rebuilt from web projects I worked on.
구축 프로젝트에서 작업했던 인터랙션 모션을 프로토타입으로 재구성해 기록하는 아카이브입니다.

> All code is rewritten from scratch. Client assets (images, logos) are replaced with placeholders.
> 모든 코드는 새로 작성했으며, 클라이언트 리소스 (이미지, 로고)는 플레이스홀더로 대체했습니다.

## Stack / 기술 스택

- HTML, SCSS, JavaScript (ES Modules)
- [GSAP](https://gsap.com/) + ScrollTrigger
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
├─ vite.config.js          # auto-registers projects/**/index.html / 프로토타입 페이지 자동 등록
├─ public/                 # copied as-is / 빌드 시 그대로 복사
├─ shared/                 # shared by every prototype / 모든 프로토타입 공통
│  ├─ scss/
│  │  ├─ _variables.scss   # font, breakpoints / 폰트, 브레이크포인트
│  │  ├─ _mixins.scss      # media(), to_vw(), fontSize(), ellipsis(), flex(), wordBreak
│  │  ├─ _reset.scss
│  │  ├─ _layout.scss      # :root vars for to_vw() / to_vw()용 :root 변수
│  │  └─ index.scss        # shared CSS entry / 공통 CSS 진입점
│  ├─ js/
│  │  ├─ base.js           # web font + shared CSS / 웹폰트 + 공통 CSS
│  │  ├─ gsap.js           # GSAP + plugin registration / GSAP·플러그인 등록
│  │  ├─ utils.js          # pure helpers / 순수 유틸 함수
│  │  └─ layout.js         # top bar / 상단 바
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
   `projects/<project>/<motion>/index.html`을 만들면 빌드에 자동으로 등록됩니다.
2. In `main.js`, load the shared base styles first, then the layout and GSAP:
   `main.js`에서 공통 기본 스타일을 가장 먼저 불러오고, 그다음 레이아웃과 GSAP을 불러옵니다.

   ```js
   import "@shared/js/base.js"; // must come before ./style.scss / ./style.scss보다 먼저
   import { mountLayout } from "@shared/js/layout.js";
   import { gsap, ScrollTrigger } from "@shared/js/gsap.js";
   import "./style.scss";

   mountLayout({ project: "Project Name", title: "Motion Name" });
   ```

3. In `style.scss`, load the shared variables and mixins (no CSS output):
   `style.scss`에서 공통 변수와 mixin을 불러옵니다 (CSS는 출력되지 않음).

   ```scss
   @use "@shared/scss/variables" as *;
   @use "@shared/scss/mixins" as *;
   ```

4. Add a link to the root `index.html`.
   최상위 `index.html` 목록에 링크를 추가합니다.

## Naming / 이름 규칙

Folders use lowercase kebab-case, e.g. `xi-elevator/customer-focus`.
폴더명은 소문자 + 하이픈 (kebab-case)을 사용합니다. 예: `xi-elevator/customer-focus`
