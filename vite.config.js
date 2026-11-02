import { existsSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

// Recursively collect every index.html under a directory (empty if it doesn't exist).
// 디렉터리 아래의 모든 index.html 경로를 재귀적으로 수집합니다 (폴더가 없으면 빈 배열).
const findIndexHtml = (dir) =>
    !existsSync(dir) ? [] : readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) return findIndexHtml(fullPath);
        return entry.name === "index.html" ? [fullPath] : [];
    });

// Turn a file path into a Rollup input key, e.g. "projects/xi-elevator/customer-focus".
// 파일 경로를 Rollup 입력 키로 변환합니다. 예: "projects/xi-elevator/customer-focus"
const toInputKey = (filePath) =>
    relative(root, filePath).replace(/\\/g, "/").replace(/\/?index\.html$/, "") || "main";

// Build the multi-page input map: the archive index plus every prototype page.
// 멀티 페이지 입력 맵 생성: 아카이브 목록 페이지 + 모든 프로토타입 페이지
const buildInputs = () =>
    Object.fromEntries(
        [resolve(root, "index.html"), ...findIndexHtml(resolve(root, "projects"))].map(
            (filePath) => [toInputKey(filePath), filePath]
        )
    );

export default defineConfig({
    resolve: {
        alias: {
            // Shortcut to shared assets: import "@shared/js/gsap.js"
            // 공통 자원 경로 단축: import "@shared/js/gsap.js"
            "@shared": resolve(root, "shared"),
        },
    },
    build: {
        rollupOptions: {
            input: buildInputs(),
        },
    },
});
