run-p 为并行执行
run-s 为顺序执行

    "build": "run -s build-only move-style",
    "build-only": "run -p build-es build-umd",
    "build-umd": "vite build --config vite.config.ts --mode production",
