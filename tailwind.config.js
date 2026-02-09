/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind CSS가 적용될 파일들을 지정합니다.
  // src 디렉토리 아래의 모든 .html, .js, .ts, .jsx, .tsx 파일에 Tailwind CSS가 적용됩니다.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
