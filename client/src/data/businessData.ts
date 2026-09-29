// 2026 KAIGA AX Support Program - Business Solutions and Notices Data
export interface SolutionGroup {
  title: string;
  chips: string[];
}

export interface NoticeRound {
  name: string;
  badge: string;
  status: string;
  info: Record<string, string>;
  pdfHref: string;
}

export const SOLUTION_GROUPS: SolutionGroup[] = [
  {
    "title": "01 기획 5종 +",
    "chips": [
      "ChatGPT",
      "Gemini",
      "Claude",
      "Claude API",
      "PixAI"
    ]
  },
  {
    "title": "02 프로그래밍 9종 +",
    "chips": [
      "GitHub Copilot",
      "Tabnine",
      "Lovable",
      "Bolt",
      "Cursor",
      "JetBrains",
      "Kiro",
      "Windsurf",
      "Kimi"
    ]
  },
  {
    "title": "03 프로그래밍 보조 2종 +",
    "chips": [
      "v0 by Vercel",
      "Perplexity"
    ]
  },
  {
    "title": "04 아트 19종 +",
    "chips": [
      "Typecast",
      "Aether AI",
      "Stable Diffusion",
      "Grok",
      "Dreamina Seedance",
      "Cascadeur",
      "Kling",
      "Layer",
      "Leonardo",
      "Midjourney",
      "OpenArt",
      "Pixel Engine",
      "PixelLab",
      "Scenario",
      "Yeri",
      "Gen-4.5 Runway",
      "hailuo",
      "Ludo AI",
      "Novel AI"
    ]
  },
  {
    "title": "05 3D 에셋 5종 +",
    "chips": [
      "PicoBerry",
      "Tencent HY 3D",
      "Tripo",
      "Meshy AI",
      "Vox AI"
    ]
  },
  {
    "title": "06 3D 에셋 애니메이션 3종 +",
    "chips": [
      "comfy",
      "Higgsfield",
      "BytePlus Seedance"
    ]
  },
  {
    "title": "07 사운드 8종 +",
    "chips": [
      "Gamesound.ai",
      "AIVA",
      "Soundraw",
      "ElevenLabs",
      "mix audio",
      "mureka.ai",
      "SUNO",
      "CapCut"
    ]
  },
  {
    "title": "08 더빙 2종 +",
    "chips": [
      "Respeecher",
      "VOLI"
    ]
  },
  {
    "title": "09 게임개발통합 9종 +",
    "chips": [
      "NC AI VARCO",
      "Hive (AI)",
      "GameAIfy",
      "OCI for Gaming",
      "One Google",
      "OpenRouter",
      "DeepL",
      "WhisperFlow",
      "Unity AI"
    ]
  }
];

export const NOTICE_ROUNDS: NoticeRound[] = [
  {
    "name": "1차 모집",
    "badge": "05.18 — 05.27",
    "status": "접수 마감",
    "info": {
      "접수 마감": "2026.05.27 15:00",
      "협약 기간": "2026.06.01 ~ 11.30",
      "모집 기준": "144개사 내외 KAIGA 할당 규모"
    },
    "pdfHref": "/notices/kaiga-ax-2026-round1.pdf"
  },
  {
    "name": "2차 모집",
    "badge": "07.01 — 07.07",
    "status": "접수 마감",
    "info": {
      "접수 마감": "2026.07.07 17:00",
      "협약 기간": "협약체결일 ~ 2026.11.30",
      "모집 기준": "89개사 내외 추가 모집 공고 기준"
    },
    "pdfHref": "/notices/kaiga-ax-2026-round2.pdf"
  },
  {
    "name": "3차 모집",
    "badge": "08.21 — 09.04",
    "status": "접수 마감",
    "info": {
      "접수 마감": "2026.09.04 17:00",
      "협약 기간": "협약체결일 ~ 2026.12.31",
      "모집 기준": "11인 이상 우선 적격기업 통합추첨 후 잔여분 배정"
    },
    "pdfHref": "/notices/kaiga-ax-2026-round3.pdf"
  },
  {
    "name": "4차 모집",
    "badge": "09.14 — 09.21",
    "status": "접수 마감",
    "info": {
      "접수 마감": "2026.09.21 11:00",
      "협약 기간": "협약체결일 ~ 2026.12.31",
      "모집 기준": "11인 이상 우선 적격기업 통합추첨 후 잔여분 배정"
    },
    "pdfHref": "/notices/kaiga-ax-2026-round4.pdf"
  }
];
