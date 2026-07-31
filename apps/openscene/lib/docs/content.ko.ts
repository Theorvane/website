import { downloadUrl, releaseAssets, releaseTag } from "../releases";
import type { Platform } from "../releases";
import type { DocPage, LocaleStrings } from "./types";

const platformLabels: Record<Platform, string> = { macos: "macOS", windows: "Windows", linux: "Linux" };

export const koStrings: LocaleStrings = {
	indexTitle: "OpenScene 문서",
	indexSummary: "OpenScene을 내려받거나 소스에서 실행하고, 워크스페이스와 타임라인을 익히고, Edit Agent를 활용하고, 원하는 모델 프로바이더만 연결하는 방법을 다룹니다.",
	indexLede: "OpenScene은 macOS · Windows · Linux용 패키징 빌드를 제공하며, 소스에서 실행하는 방법도 그대로 지원합니다. 이 문서에 적힌 내용은 모두 지금 빌드에 실제로 있는 동작이며, 예정된 작업은 아직 제공하지 않는다고 명시합니다.",
	sidebarLabel: "문서",
	onThisPage: "이 페이지 내용",
	previous: "이전",
	next: "다음",
	backToSite: "openscene.app",
	languageLabel: "언어",
	groups: { start: "시작하기", editing: "편집", agent: "Edit Agent", models: "모델과 생성", reference: "참고" },
};

const overview: DocPage = {
	title: "OpenScene이란",
	summary: "조언만 하지 않고 직접 타임라인을 조작하는 에이전트를 갖춘, 로컬 우선 데스크톱 영상 편집기입니다.",
	blocks: [
		{ kind: "paragraph", text: "OpenScene은 내 컴퓨터에서 영상을 편집하는 오픈소스 Electron 애플리케이션입니다. 폴더를 하나 열어 프로젝트로 삼고, 타임라인에 클립을 올리고, 시스템에 이미 설치된 FFmpeg로 H.264/AAC MP4를 내보냅니다." },
		{ kind: "paragraph", text: "일반적인 편집기와 다른 점은 **Edit Agent**입니다. 타임라인 옆에 고정된 채팅 패널이 인터페이스와 똑같은 작업을 호출합니다. 타임라인을 읽고, 클립을 배치하고 자르고, 음성과 영상을 생성하고, 내보내기를 시작할 수 있습니다. 그리고 프로젝트에 쓰기가 일어나는 작업은 그 전에 반드시 승인을 요청합니다." },
		{ kind: "note", tone: "caution", text: "OpenScene은 정식 출시 전입니다. macOS · Windows · Linux용 패키징 빌드를 배포하며, 소스에서 실행하는 방법도 그대로 지원합니다. [설치와 실행](/docs/ko/install)을 참고하세요." },
		{ kind: "heading", text: "제공하는 것" },
		{ kind: "list", items: [
			"제대로 된 타임라인 — 비디오·오디오 트랙, 자르기, 분할, 이동, 복제, 키프레임, 트랜지션, 트랙별 믹스, 되돌리기와 다시 실행",
			"내 FFmpeg 바이너리를 이용한 로컬 H.264/AAC MP4 내보내기",
			"제안만 늘어놓지 않고 편집기를 직접 조작하는, 타입이 정의된 도구 표면을 가진 에이전트",
			"같은 워크스페이스 안의 음성·영상 생성 스튜디오. 결과물은 열려 있는 프로젝트로 바로 들어옵니다",
			"약 150개 모델 프로바이더 중 선택, 또는 로컬 Ollama 엔진만으로 계정 없이 사용",
		] },
		{ kind: "heading", text: "의도적으로 넣지 않은 것" },
		{ kind: "paragraph", text: "계정, 텔레메트리, 분석, 크래시 리포팅이 없습니다. 앱은 사용자가 직접 연결한 프로바이더에, 사용자가 요청할 때만 접속합니다. 자세한 경계는 [데이터와 프라이버시](/docs/ko/data-and-privacy)에 있습니다." },
		{ kind: "heading", text: "현재 경계" },
		{ kind: "table", head: ["지금 되는 것", "아직 안 되는 것"], rows: [
			["선택한 창을 로컬 WebM으로 캡처", "전체 화면 캡처, 레코더의 마이크·시스템 오디오 믹스"],
			["로컬 프로젝트, 미디어, 타임라인 편집, 되돌리기/다시 실행", "클라우드 동기화, 호스팅 렌더링, 계정"],
			["로컬 H.264/AAC MP4 내보내기", "다른 내보내기 포맷, 프레임 단위 정확도를 보장하는 멀티트랙 마스터링"],
			["에이전트 주도 편집·생성·내보내기", "무인 실행 — 쓰기 작업은 항상 승인을 요청합니다"],
			["레퍼런스 이미지를 이용한 Google Veo image-to-video", "Sora 레퍼런스 이미지 (이 빌드가 보내지 않는 multipart 업로드 경로가 필요)"],
		] },
		{ kind: "paragraph", text: "Program Monitor는 최선을 다하는 검토용 화면입니다. 최종 결과물의 기준은 FFmpeg 내보내기입니다." },
		{ kind: "heading", text: "다음에 볼 문서" },
		{ kind: "list", ordered: true, items: [
			"[설치와 실행](/docs/ko/install) — 사전 요구사항, 클론, 첫 실행",
			"[프로젝트와 폴더](/docs/ko/projects) — 프로젝트가 선택한 폴더에 어떻게 대응되는지",
			"[워크스페이스](/docs/ko/workspace) — 편집 화면 둘러보기",
			"[Edit Agent](/docs/ko/edit-agent) — 에이전트가 할 수 있는 일과 먼저 물어보는 일",
		] },
	],
};

const install: DocPage = {
	title: "설치와 실행",
	summary: "패키징 빌드 내려받기, 저장소 클론, FFmpeg 경로 지정, 소스에서 빌드 검증까지.",
	blocks: [
		{ kind: "heading", text: "패키징 빌드 내려받기" },
		{ kind: "paragraph", text: `릴리스마다 macOS · Windows · Linux용 패키징 빌드를 함께 배포합니다. 현재 버전은 ${releaseTag}입니다.` },
		{ kind: "table", head: ["플랫폼", "빌드", "파일"], rows: releaseAssets.map((asset) => [platformLabels[asset.platform], asset.variant, `[${asset.file}](${downloadUrl(asset)})`]) },
		{ kind: "note", tone: "info", text: "macOS 빌드는 Developer ID 인증서로 서명하고 Apple 공증을 받아 그대로 열립니다. Windows 빌드는 서명하지 않아 첫 실행에서 SmartScreen 경고가 뜨는데, **추가 정보 → 실행**을 누르면 시작됩니다. Linux 빌드도 서명하지 않으며, AppImage와 deb에서는 일반적인 방식입니다." },
		{ kind: "paragraph", text: "어느 플랫폼이든 내보내기에는 FFmpeg이 필요합니다. 아래 [FFmpeg 경로 지정](#ffmpeg-경로-지정)을 참고하세요. 이 문서의 나머지는 소스에서 실행하는 방법이며, 패키징 빌드와 함께 계속 지원됩니다." },
		{ kind: "heading", text: "사전 요구사항" },
		{ kind: "list", items: [
			"Node.js 22 이상, npm 10 이상",
			"FFmpeg — MP4 내보내기에 필요합니다",
			"macOS 한정: 창 캡처를 쓴다면 OpenScene을 실행하는 터미널에 화면 기록 권한이 필요합니다",
		] },
		{ kind: "heading", text: "클론과 실행" },
		{ kind: "code", language: "bash", lines: ["git clone https://github.com/Theorvane/openscene.git", "cd openscene", "npm install", "npm run dev"] },
		{ kind: "paragraph", text: "`npm run dev`는 렌더러를 개발 모드로 두고 Electron 앱을 실행합니다. 첫 실행에서는 시작 페이지가 열리고, 여기서 첫 프로젝트로 열 폴더를 선택합니다." },
		{ kind: "heading", text: "FFmpeg 지정하기" },
		{ kind: "paragraph", text: "OpenScene은 자체 FFmpeg를 포함하지 않고 **사용자가 설치한** FFmpeg를 구동합니다. `PATH`의 절대 경로 디렉터리를 통해 `ffmpeg`를 찾을 수 있게 하거나, 바이너리를 명시적으로 지정하세요." },
		{ kind: "code", language: "bash", lines: ["VIDEO_TOOL_FFMPEG_PATH=/absolute/path/to/ffmpeg npm run dev"] },
		{ kind: "note", tone: "info", text: "상대 경로 FFmpeg는 거부됩니다. 사용 가능한 FFmpeg가 없으면 OpenScene은 끝내지 못할 내보내기를 시작하지 않고 문제를 알립니다." },
		{ kind: "heading", text: "클라우드 계정 없이 에이전트 쓰기" },
		{ kind: "paragraph", text: "로컬 [Ollama](https://ollama.com) 엔진은 키도, 계정도, 네트워크 호출도 필요하지 않습니다." },
		{ kind: "code", language: "bash", lines: ["ollama pull qwen2.5-coder", "ollama serve"] },
		{ kind: "paragraph", text: "그다음 채팅 패널의 모델 선택기에서 로컬 모델을 고르세요. 다만 영상을 보고 판단하는 기능에는 비전 지원 모델이 필요합니다. [프로바이더와 모델](/docs/ko/providers)을 참고하세요." },
		{ kind: "heading", text: "소스에서 검증" },
		{ kind: "code", language: "bash", lines: ["npm run typecheck", "npm test", "npm run build"] },
		{ kind: "paragraph", text: "`npm run build`는 main, preload, 렌더러 번들을 `out/`으로 컴파일합니다. 설치 파일을 패키징하지는 않으며, 배포되는 빌드는 릴리스 파이프라인에서 만들어집니다. 운영체제 권한, 실제 프로바이더 호출, 최종 렌더 품질처럼 수동으로만 확인할 수 있는 동작도 있습니다." },
	],
};

const projects: DocPage = {
	title: "프로젝트와 폴더",
	summary: "프로젝트는 사용자가 고른 폴더입니다. 미디어, 대화 기록, 생성 결과가 그 안에 기록됩니다.",
	blocks: [
		{ kind: "paragraph", text: "OpenScene에는 프로젝트 데이터베이스도, 숨겨진 라이브러리도 없습니다. 폴더를 지정하면 그 폴더가 프로젝트입니다. 가져온 에셋은 그 안으로 복사되고, 에이전트 대화도 그 안에 저장되며, 완료된 생성 결과도 그 안에 놓입니다." },
		{ kind: "figure", image: "projects", alt: "프로젝트 폴더 목록과 그룹으로 묶인 Edit Agent 대화 기록을 보여주는 Projects 페이지", caption: "시작 페이지는 왼쪽에 프로젝트, 오른쪽에 지난 Edit Agent 대화를 둡니다. 대화를 고르면 해당 프로젝트가 다시 열리고 대화 내용이 복원됩니다." },
		{ kind: "heading", text: "프로젝트 열기와 제거" },
		{ kind: "list", items: [
			"시작 페이지에서 폴더를 열면 프로젝트로 등록되고 워크스페이스로 들어갑니다",
			"최근 프로젝트가 목록에 남으므로 폴더를 다시 찾아 들어갈 필요가 없습니다",
			"프로젝트 제거는 등록만 해제합니다. **선택한 폴더를 재귀적으로 삭제하는 일은 없습니다**",
		] },
		{ kind: "heading", text: "프로젝트 안에 기록되는 것" },
		{ kind: "table", head: ["내용", "설명"], rows: [
			["가져온 미디어", "프로젝트 폴더로 복사되므로 타임라인이 디스크 다른 위치의 파일에 의존하지 않습니다"],
			["타임라인 상태", "프로젝트와 함께 저장되며, 되돌리기/다시 실행은 세션 안에서 동작합니다"],
			["에이전트 대화", "경로가 없는 `chats.json`으로 저장되고, 프로젝트별로 전환 가능한 세션으로 유지됩니다"],
			["생성 결과", "음성·영상 작업 결과가 열려 있는 프로젝트의 에셋으로 들어옵니다"],
		] },
		{ kind: "note", tone: "info", text: "앱이 관리하는 프로젝트와 창 녹화 파일은 Electron 사용자 데이터 아래에 있습니다. 녹화 위치는 `VIDEO_TOOL_RECORDINGS_DIR=/absolute/path/to/recordings npm run dev`로 옮길 수 있습니다." },
		{ kind: "paragraph", text: "프로젝트가 평범한 폴더이기 때문에 백업, 다른 컴퓨터로 이동, 버전 관리 등록은 모두 사용자의 선택이고 OpenScene이 관여할 필요가 없습니다." },
	],
};

const workspace: DocPage = {
	title: "워크스페이스",
	summary: "미디어 독, Program Monitor, 인스펙터, 타임라인, 고정된 에이전트 채팅까지 편집 화면 둘러보기.",
	blocks: [
		{ kind: "paragraph", text: "프로젝트를 열면 워크스페이스로 들어갑니다. 탭 하나로 편집기와 두 생성 스튜디오를 오갈 수 있고, 에이전트 채팅은 세 화면 모두에서 옆에 고정되어 있습니다." },
		{ kind: "figure", image: "editor", alt: "미디어 빈, 프로그램 모니터, 인스펙터, 타임라인, Edit Agent 채팅 패널로 구성된 OpenScene 편집 워크스페이스", caption: "편집 화면 — 왼쪽에 프로젝트·미디어 독, 가운데에 Program Monitor와 인스펙터, 아래에 타임라인, 오른쪽에 Edit Agent." },
		{ kind: "heading", text: "각 영역" },
		{ kind: "table", head: ["영역", "역할"], rows: [
			["프로젝트·미디어 독", "프로젝트에 가져온 에셋을 나열하고, 트랙으로 끌어다 놓을 수 있게 합니다"],
			["Program Monitor", "검토를 위해 타임라인을 재생합니다. 최선을 다하는 미리보기이고, 기준은 FFmpeg 내보내기입니다"],
			["인스펙터", "선택한 클립의 불투명도, 크기, 위치, 회전, 볼륨, 키프레임, 트랜지션을 편집합니다"],
			["타임라인", "비디오·오디오 트랙, 플레이헤드, 트랙별 오디오 믹스"],
			["Edit Agent", "위 모든 것을 조작할 수 있는 채팅 패널입니다. [Edit Agent](/docs/ko/edit-agent) 참고"],
		] },
		{ kind: "heading", text: "레이아웃 조절" },
		{ kind: "paragraph", text: "왼쪽 독과 인스펙터는 각각 접어서 타임라인 공간을 넓힐 수 있고, 레이아웃을 기본값으로 되돌릴 수도 있습니다. 세 동작 모두 기본 단축키가 있습니다 — `⌘1`, `⌘2`, `⌘0` — 그리고 [설정](/docs/ko/settings)에서 다시 지정할 수 있습니다." },
		{ kind: "heading", text: "스튜디오 전환" },
		{ kind: "paragraph", text: "탭 스트립으로 편집기, [음성 생성](/docs/ko/voice-generation), [영상 생성](/docs/ko/video-generation) 사이를 이동합니다. 전환해도 에이전트 채팅은 초기화되지 않으므로, 한 대화가 편집과 생성을 함께 다룰 수 있습니다." },
	],
};

const timeline: DocPage = {
	title: "타임라인 편집",
	summary: "미디어 가져오기, 클립 배치, 키프레임과 트랜지션, 기본 키보드 단축키.",
	blocks: [
		{ kind: "paragraph", text: "타임라인은 비디오와 오디오 트랙을 담습니다. 로컬 미디어를 프로젝트로 가져와 트랙에 놓고, 마우스나 키보드로 배치합니다." },
		{ kind: "heading", text: "클립 작업" },
		{ kind: "list", items: [
			"클립 자르기, 분할, 이동, 복제, 삭제",
			"편집 세션 전반에 걸친 되돌리기와 다시 실행",
			"인스펙터에서 불투명도, 크기, 위치, 회전, 볼륨 조절",
			"속성 애니메이션을 위한 키프레임, 클립 사이 트랜지션 추가",
			"트랙별 오디오 믹스 설정",
			"Program Monitor에서 플레이헤드로 검토",
		] },
		{ kind: "heading", text: "기본 단축키" },
		{ kind: "paragraph", text: "macOS의 `⌘` 기준으로 표기했습니다. Windows와 Linux에서는 `Ctrl`입니다. 모든 바인딩은 **설정 → Shortcuts**에서 바꿀 수 있고, 이미 쓰이는 조합은 조용히 덮어쓰지 않고 거부됩니다." },
		{ kind: "table", head: ["동작", "기본값"], rows: [
			["재생 / 일시정지", "`Space`"],
			["되돌리기", "`⌘Z`"],
			["다시 실행", "`⇧⌘Z`"],
			["분할", "`S`"],
			["선택 삭제", "`Delete` (`Backspace`도 가능)"],
			["클립 복제", "`⌘D`"],
			["모든 클립 선택", "`⌘A`"],
			["선택 해제", "`Escape`"],
			["타임라인 저장", "`⌘S`"],
			["뒤로 / 앞으로 한 칸", "`←` / `→`"],
			["클립 살짝 앞으로 / 뒤로", "`⌥←` / `⌥→`"],
			["처음으로 / 끝으로", "`Home` / `End`"],
			["프로젝트 독 토글", "`⌘1`"],
			["인스펙터 토글", "`⌘2`"],
			["레이아웃 초기화", "`⌘0`"],
		] },
		{ kind: "note", tone: "info", text: "에이전트도 도구 표면을 통해 같은 클립 작업을 수행합니다 — [에이전트 도구](/docs/ko/agent-tools) 참고. \"두 번째 클립을 4초로 잘라줘\"는 손으로 하는 작업의 대안이지, 별개의 기능이 아닙니다." },
	],
};

const exportPage: DocPage = {
	title: "내보내기",
	summary: "OpenScene이 내 FFmpeg로 MP4를 렌더링하는 방식과, 시작하지 않는 경우.",
	blocks: [
		{ kind: "paragraph", text: "내보내기는 사용자 컴퓨터의 FFmpeg 바이너리를 구동해 H.264/AAC MP4를 만듭니다. OpenScene은 자체 FFmpeg를 포함하지 않고, 타임라인을 업로드하지 않으며, 클라우드에서 렌더링하지 않습니다." },
		{ kind: "heading", text: "내보내기 전에" },
		{ kind: "list", ordered: true, items: [
			"`PATH`의 절대 경로 디렉터리에서 `ffmpeg`를 찾을 수 있게 하거나, `VIDEO_TOOL_FFMPEG_PATH`로 바이너리를 지정합니다",
			"Program Monitor에서 타임라인을 검토합니다. 미리보기이며 최종 렌더가 아닙니다",
			"편집기에서 내보내기를 시작하거나, 에이전트에게 시작을 요청합니다",
		] },
		{ kind: "note", tone: "caution", text: "사용 가능한 FFmpeg가 없으면 OpenScene은 완료할 수 없는 내보내기를 시작하지 않고 문제를 알립니다. 상대 경로는 거부됩니다. [트러블슈팅](/docs/ko/troubleshooting)을 참고하세요." },
		{ kind: "heading", text: "무엇이 기준인가" },
		{ kind: "paragraph", text: "Program Monitor는 빠른 반복을 위해 만든 최선의 검토 화면입니다. 모니터와 내보낸 파일이 다르면 내보낸 파일이 맞습니다. 프레임 단위 정확도를 보장하는 멀티트랙 마스터링은 이 빌드가 주장하지 않는 영역입니다." },
		{ kind: "heading", text: "에이전트가 시작하는 내보내기" },
		{ kind: "paragraph", text: "`exportProjectVideo`로 에이전트가 로컬 내보내기를 시작할 수 있습니다. 파일을 쓰는 작업이므로 먼저 승인을 요청합니다. 렌더링은 여전히 같은 FFmpeg를 통해 전부 사용자 컴퓨터에서 실행됩니다." },
		{ kind: "heading", text: "포맷" },
		{ kind: "paragraph", text: "현재 내보내기 대상은 H.264/AAC MP4 하나뿐입니다. 다른 컨테이너와 코덱 선택은 아직 제공하지 않습니다." },
	],
};

const editAgent: DocPage = {
	title: "Edit Agent",
	summary: "타입이 정의된 도구 표면으로 편집기를 조작하고, 쓰기 전에 승인을 요청하는 채팅 패널.",
	blocks: [
		{ kind: "paragraph", text: "Edit Agent는 사용자가 직접 적용할 제안을 써주는 코파일럿이 아닙니다. Electron 메인 프로세스의 타입이 정의된 도구 표면을 통해, 인터페이스가 호출하는 것과 같은 작업을 호출합니다." },
		{ kind: "heading", text: "승인 모델" },
		{ kind: "list", items: [
			"**읽기 작업은 즉시 실행됩니다** — 타임라인 읽기, 에셋 확인, 프레임 샘플링",
			"**프로젝트에 쓰거나 작업을 시작하는 것은 승인을 기다립니다** — 클립 배치와 자르기, 생성 작업, 내보내기",
			"무인 모드는 없습니다. 자리를 비운 사이에 대화가 조용히 프로젝트를 수정하는 일은 일어나지 않습니다",
		] },
		{ kind: "heading", text: "영상을 실제로 봅니다" },
		{ kind: "paragraph", text: "클립에 대해 물어보면 프레임이 샘플링되어 타임스탬프와 함께 이미지로 모델에 전달됩니다. 그래서 답이 파일 이름이 아니라 화면에 실제로 있는 것에서 나옵니다. 이 기능에는 비전 지원 모델이 필요합니다. 텍스트 전용 로컬 모델도 편집은 하지만 영상을 볼 수는 없습니다." },
		{ kind: "heading", text: "세션" },
		{ kind: "paragraph", text: "대화는 프로젝트별 세션으로 보관됩니다. 새로 시작하거나, 이전 대화로 돌아가거나, 삭제할 수 있습니다. 기록은 프로젝트 폴더 안의 경로 없는 `chats.json`에 저장되고, 시작 페이지가 지난 대화를 나열하므로 하나를 고르면 해당 프로젝트가 대화 내용과 함께 열립니다." },
		{ kind: "heading", text: "동작하는 경계" },
		{ kind: "paragraph", text: "에이전트는 타입이 정의된 도구 표면을 통해서만 프로젝트에 접근합니다. 셸 접근 권한이 없고, 렌더러는 파일시스템 경로, FFmpeg 인자, API 키, OAuth 토큰을 다루지 않습니다. 전체 목록은 [에이전트 도구](/docs/ko/agent-tools), 경계는 [데이터와 프라이버시](/docs/ko/data-and-privacy)를 참고하세요." },
		{ kind: "heading", text: "모델 선택" },
		{ kind: "paragraph", text: "에이전트 모델은 **설정 → Edit Agent**에서 지정하고, 채팅 패널에도 자체 선택기가 있습니다. 연결한 프로바이더만 모델을 제공하며, 로컬 Ollama 엔진만 쓰는 것도 가능합니다. [프로바이더와 모델](/docs/ko/providers)을 참고하세요." },
	],
};

const agentTools: DocPage = {
	title: "에이전트 도구",
	summary: "Edit Agent가 호출할 수 있는 작업 목록과, 그중 승인을 먼저 요청하는 것들.",
	blocks: [
		{ kind: "paragraph", text: "에이전트가 가진 모든 기능은 메인 프로세스에 있는 아래 이름의 도구 중 하나입니다. 대화에서 그 밖의 것에는 접근할 수 없습니다." },
		{ kind: "table", head: ["에이전트가 할 수 있는 일", "도구", "승인"], rows: [
			["프로젝트 타임라인과 에셋 메타데이터 읽기", "`getProjectTimeline`", "즉시 실행"],
			["샘플링된 프레임으로 영상 보기", "`watchProjectVideo`", "즉시 실행"],
			["타임라인에 클립 배치", "`addClipToTimeline`", "먼저 확인"],
			["타임라인 클립 자르기", "`trimTimelineClip`", "먼저 확인"],
			["클립 효과 변경", "`updateClipEffects`", "먼저 확인"],
			["음성 생성", "`createSpeechJob`", "먼저 확인"],
			["영상 생성", "`createVideoJob`", "먼저 확인"],
			["생성 작업 진행 확인", "`getJobStatus`", "즉시 실행"],
			["완료된 생성 결과를 프로젝트로 가져오기", "`importGeneratedResult`", "먼저 확인"],
			["로컬 내보내기 시작", "`exportProjectVideo`", "먼저 확인"],
		] },
		{ kind: "note", tone: "info", text: "이 규칙은 도구별 허용 목록이 아니라 구조에서 나옵니다. 읽기는 통과하고, 프로젝트에 쓰거나 작업을 시작하는 것은 사용자를 기다립니다." },
		{ kind: "heading", text: "목록에 없는 것" },
		{ kind: "list", items: [
			"셸이나 임의 명령 실행 없음",
			"대화가 속한 프로젝트 밖의 파일시스템 접근 없음",
			"프로바이더 자격 증명 접근 없음 — 키는 메인 프로세스 보안 저장소에 남습니다",
			"사용자가 연결한 프로바이더에, 사용자가 요청한 작업을 위해서가 아니면 네트워크 호출 없음",
		] },
		{ kind: "paragraph", text: "도구가 인터페이스와 같은 작업이기 때문에, 에이전트가 하는 일은 모두 사용자가 손으로 할 수 있었던 일이고 타임라인에도 똑같이 반영됩니다." },
	],
};

const providers: DocPage = {
	title: "프로바이더와 모델",
	summary: "로컬 엔진, API 키, ChatGPT 로그인 중 원하는 방식으로 연결하고, 실제로 가진 모델만 목록에 보이게 합니다.",
	blocks: [
		{ kind: "paragraph", text: "프로바이더·모델 레지스트리는 [models.dev](https://models.dev) 카탈로그 스냅샷에서 생성됩니다. 약 150개 프로바이더와 수천 개 모델이 있으므로, 선택기에는 손으로 관리한 추천 목록이 아니라 실제로 존재하는 것이 나옵니다. 모델은 연결한 프로바이더만 보여줍니다." },
		{ kind: "heading", text: "연결 방식" },
		{ kind: "table", head: ["방식", "의미"], rows: [
			["**로컬**", "[Ollama](https://ollama.com)가 키·계정·네트워크 호출 없이 내 컴퓨터에서 모델을 실행합니다"],
			["**API 키**", "**설정 → Providers**에서 프로바이더를 연결합니다. 연결한 프로바이더의 모델만 선택기에 나타납니다"],
			["**ChatGPT 로그인**", "OpenAI는 API 키 또는 ChatGPT 로그인(PKCE OAuth) 중 하나를 받으며, 해당 백엔드가 제공하는 모델 집합을 씁니다"],
		] },
		{ kind: "note", tone: "info", text: "API 키와 OAuth 토큰은 메인 프로세스의 Electron `safeStorage`에 기록되고 렌더러에 도달하지 않습니다. 인터페이스는 연결 여부만 알 수 있습니다." },
		{ kind: "heading", text: "생성 프로바이더" },
		{ kind: "table", head: ["작업", "실제 어댑터가 있는 프로바이더"], rows: [
			["음성", "ElevenLabs, OpenAI"],
			["영상", "Google Veo, OpenAI Sora"],
		] },
		{ kind: "paragraph", text: "실제 어댑터가 없는 프로바이더는 동작하는 척하지 않고 목록에 남은 채 사용할 수 없다고 표시됩니다. Google Veo는 레퍼런스 이미지로 image-to-video를 지원하고, Sora 레퍼런스 이미지는 이 빌드가 보내지 않는 multipart 업로드 경로가 필요합니다." },
		{ kind: "heading", text: "선택기에 나올 모델 고르기" },
		{ kind: "paragraph", text: "**설정 → Models**에서 카탈로그를 검색하고 선택기에 나올 모델을 정할 수 있어, 모델이 수백 개인 프로바이더를 연결해도 목록이 넘치지 않습니다. **설정 → Edit Agent**에서는 에이전트가 기본으로 사용할 모델을 지정합니다." },
		{ kind: "heading", text: "프로바이더 없이 쓰기" },
		{ kind: "paragraph", text: "편집, 타임라인, 내보내기에는 프로바이더가 필요하지 않습니다. 에이전트에는 로컬 Ollama 모델만으로도 충분하지만, 영상을 보는 기능에는 비전 지원 모델이 필요합니다. 카탈로그는 저장소에서 `scripts/generateLlmCatalog.mjs`로 재생성합니다." },
	],
};

const voiceGeneration: DocPage = {
	title: "음성 생성",
	summary: "스크립트를 쓰고 음성 모델을 고르면, 결과가 열려 있는 프로젝트로 바로 들어옵니다.",
	blocks: [
		{ kind: "paragraph", text: "음성 스튜디오는 편집기와 같은 워크스페이스의 탭이므로, 생성된 내레이션이 이미 열어 둔 프로젝트로 들어옵니다." },
		{ kind: "figure", image: "voice", alt: "음성 선택기와 스크립트 작성 영역이 있는 Voice Generation 스튜디오", caption: "음성 모델을 고르고, 스크립트를 작성하고, 생성한 뒤 완성된 오디오를 프로젝트 에셋으로 가져옵니다." },
		{ kind: "heading", text: "진행 순서" },
		{ kind: "list", ordered: true, items: [
			"**설정 → Providers**에서 음성 프로바이더(ElevenLabs 또는 OpenAI)를 연결합니다",
			"스튜디오 선택기에서 음성 모델을 고릅니다",
			"스크립트를 작성하거나 붙여넣습니다",
			"생성하고, 진행 상황을 확인합니다",
			"결과를 가져옵니다. 열려 있는 프로젝트의 에셋이 되어 타임라인 트랙에 바로 올릴 수 있습니다",
		] },
		{ kind: "note", tone: "info", text: "에이전트도 `createSpeechJob`, `getJobStatus`, `importGeneratedResult`로 같은 일을 할 수 있습니다. 작업에는 프로바이더 비용이 발생하므로 먼저 승인을 요청합니다." },
		{ kind: "heading", text: "결과가 저장되는 위치" },
		{ kind: "paragraph", text: "생성된 오디오는 다른 에셋과 함께 프로젝트 폴더에 기록됩니다 — [프로젝트와 폴더](/docs/ko/projects) 참고. 업로드되는 것은 사용자가 읽어 달라고 요청한 스크립트 텍스트뿐이고, 연결한 프로바이더로만 전송됩니다." },
		{ kind: "heading", text: "경계" },
		{ kind: "paragraph", text: "음성 생성에는 클라우드 프로바이더가 필요합니다. 이 빌드에는 로컬 음성 엔진이 없습니다. 실제 어댑터가 없는 프로바이더는 작업 중간에 실패하는 대신 사용할 수 없다고 표시됩니다." },
	],
};

const videoGeneration: DocPage = {
	title: "영상 생성",
	summary: "스타일, 화면 비율, 길이를 지정해 프롬프트하고, 필요하면 레퍼런스 이미지로 시작점을 줍니다.",
	blocks: [
		{ kind: "paragraph", text: "영상 스튜디오는 편집기와 음성 스튜디오 옆에 있습니다. 완료된 작업은 열려 있는 프로젝트의 에셋으로 들어와 타임라인에 바로 올릴 수 있습니다." },
		{ kind: "figure", image: "video", alt: "스타일, 화면 비율, 길이, 레퍼런스 이미지 컨트롤이 있는 Video Generation 스튜디오", caption: "스타일·화면 비율·길이 프롬프트 컨트롤과, image-to-video용 레퍼런스 이미지 선택." },
		{ kind: "heading", text: "진행 순서" },
		{ kind: "list", ordered: true, items: [
			"**설정 → Providers**에서 영상 프로바이더(Google Veo 또는 OpenAI Sora)를 연결합니다",
			"프롬프트를 쓰고 스타일, 화면 비율, 길이를 설정합니다",
			"필요하면 image-to-video용 레퍼런스 이미지를 고릅니다",
			"생성하고, 진행 상황을 확인합니다",
			"결과를 열려 있는 프로젝트로 가져옵니다",
		] },
		{ kind: "heading", text: "레퍼런스 이미지" },
		{ kind: "paragraph", text: "Google Veo는 레퍼런스 이미지로 image-to-video를 지원합니다. Sora 레퍼런스 이미지는 이 빌드에서 **사용할 수 없습니다**. 보내지 않는 multipart 업로드 경로가 필요하며, 스튜디오는 이미지를 조용히 버리지 않고 그 사실을 알립니다." },
		{ kind: "note", tone: "info", text: "선택한 레퍼런스 이미지는 파일시스템 경로가 아니라 바이트로 렌더러 경계를 넘습니다. 앱의 다른 부분과 같은 규칙입니다. [데이터와 프라이버시](/docs/ko/data-and-privacy)를 참고하세요." },
		{ kind: "heading", text: "비용과 승인" },
		{ kind: "paragraph", text: "생성 비용은 프로바이더가 사용자에게 직접 청구하며, OpenScene이 그 사이에 끼어들지 않습니다. 에이전트가 `createVideoJob`으로 작업을 시작할 때 먼저 승인을 요청하는 이유도 같습니다." },
	],
};

const settings: DocPage = {
	title: "설정",
	summary: "테마와 로컬 도구 준비 상태부터 프로바이더, 단축키, 업데이트까지 모든 설정 섹션.",
	blocks: [
		{ kind: "paragraph", text: "설정은 옵션을 한 화면에 늘어놓지 않고 목적별 섹션으로 나뉘어 있습니다." },
		{ kind: "table", head: ["섹션", "다루는 내용"], rows: [
			["Appearance", "테마 모드와 커맨드 데스크 프리셋"],
			["Local Tools", "데스크톱 캡처, 내레이션, 최종 내보내기를 위한 로컬 런타임 준비 상태"],
			["Voice", "클라우드 음성 생성의 경계와 모델 관리 위치"],
			["Video", "영상 모델 선호 설정과 로컬 결과 가져오기 경계"],
			["Providers", "연결된 프로바이더와, 연결할 수 있는 주요 프로바이더"],
			["Models", "카탈로그 검색과 선택기에 나올 모델 지정"],
			["Edit Agent", "고정된 에이전트 패널이 사용할 모델 선호 설정"],
			["Shortcuts", "타임라인 편집기 키보드 단축키 재지정"],
			["Updates", "설치된 버전과 새 릴리스가 이 빌드에 도달하는 방식"],
			["Data & Privacy", "로컬 저장, 프로바이더 인증, 삭제 동작"],
		] },
		{ kind: "heading", text: "단축키 재지정" },
		{ kind: "paragraph", text: "**설정 → Shortcuts**는 모든 타임라인 동작과 현재 조합을 나열합니다. 이미 쓰이는 조합을 지정하면 충돌하는 동작 이름과 함께 거부되고, 각 바인딩은 기본값으로 되돌릴 수 있습니다. 기본 조합은 [타임라인 편집](/docs/ko/timeline)에 있습니다." },
		{ kind: "heading", text: "로컬 도구 준비 상태" },
		{ kind: "paragraph", text: "**Local Tools**는 내보내기가 의존하는 로컬 런타임 요소가 실제로 있는지 알려주므로, FFmpeg가 없다면 렌더 마지막이 아니라 여기서 드러납니다. 경로는 `VIDEO_TOOL_FFMPEG_PATH`로 설정합니다 — [설치와 실행](/docs/ko/install) 참고." },
		{ kind: "heading", text: "업데이트" },
		{ kind: "note", tone: "info", text: "**Updates**는 설치된 버전을 보여줍니다. 패키징 빌드는 배포된 릴리스를 확인한 뒤 업데이트할지 먼저 묻습니다. 답하기 전에는 아무것도 내려받거나 교체하지 않습니다. 소스에서 실행하는 빌드는 저장소를 pull해 다시 빌드하면 반영됩니다." },
	],
};

const dataAndPrivacy: DocPage = {
	title: "데이터와 프라이버시",
	summary: "영상이 어디에 있는지, 무엇이 프로세스 경계를 넘는지, 무엇을 절대 수집하지 않는지.",
	blocks: [
		{ kind: "paragraph", text: "OpenScene의 프라이버시 특성은 어딘가에서 찾아 켜야 하는 설정이 아니라 구조에서 나옵니다." },
		{ kind: "heading", text: "수집하지 않는 것" },
		{ kind: "list", items: [
			"**계정 없음.** 가입할 대상이 없습니다",
			"**텔레메트리 없음.** 분석, 크래시 리포팅, 사용 추적이 없습니다",
			"**백그라운드 네트워크 호출 없음.** 사용자가 연결한 프로바이더에, 사용자가 요청할 때만 접속합니다",
		] },
		{ kind: "heading", text: "데이터가 있는 위치" },
		{ kind: "paragraph", text: "프로젝트는 사용자가 고른 폴더입니다. 에셋, 대화 기록, 생성 결과가 그 안에 기록됩니다. 앱이 관리하는 프로젝트와 창 녹화 파일은 Electron 사용자 데이터 아래에 있고, 녹화 위치는 `VIDEO_TOOL_RECORDINGS_DIR`로 바꿀 수 있습니다." },
		{ kind: "heading", text: "프로세스 경계" },
		{ kind: "paragraph", text: "렌더러는 좁게 정의된 타입 브리지 `window.videoTool` 하나로 메인 프로세스와 통신합니다. 원시 `ipcRenderer`, 파일시스템 경로, FFmpeg 인자, API 키, OAuth 토큰은 그 밖에 남습니다. 예를 들어 선택한 레퍼런스 이미지는 경로가 아니라 바이트로 건너갑니다." },
		{ kind: "table", head: ["메인 프로세스에 남는 것", "인터페이스에 도달하는 것"], rows: [
			["파일시스템 경로", "에셋 식별자와 메타데이터"],
			["FFmpeg 인자", "내보내기 진행 상황과 결과 상태"],
			["API 키와 OAuth 토큰", "프로바이더 연결 여부"],
		] },
		{ kind: "heading", text: "캡처 범위" },
		{ kind: "paragraph", text: "창 캡처는 선택한 하나의 소스에만 접근 권한을 주고, 로컬 WebM 파일로 기록합니다. 전체 화면 캡처와 마이크·시스템 오디오 믹싱은 레코더에 아직 없습니다." },
		{ kind: "heading", text: "삭제" },
		{ kind: "paragraph", text: "프로젝트 제거는 목록에서 등록을 해제하는 것입니다. 선택한 폴더를 재귀적으로 삭제하지 않습니다. 대화는 개별적으로 삭제할 수 있습니다. 서버 사본이 애초에 없으므로, 로컬에서 지운 것은 사라진 것입니다." },
		{ kind: "heading", text: "프로바이더가 받는 것" },
		{ kind: "paragraph", text: "프로바이더는 사용자가 에이전트나 스튜디오에 보내라고 요청한 것만 받습니다. 프롬프트 텍스트, 스크립트, 영상에 대해 물었을 때 샘플링된 프레임, 직접 고른 레퍼런스 이미지입니다. 프로젝트 폴더가 색인되거나 업로드되지는 않습니다." },
	],
};

const troubleshooting: DocPage = {
	title: "트러블슈팅",
	summary: "내보내기 실패, FFmpeg 누락, 캡처 권한, 프로바이더 오류, 에이전트 한계.",
	blocks: [
		{ kind: "heading", text: "내보내기가 시작되지 않습니다" },
		{ kind: "paragraph", text: "OpenScene은 렌더링 전에 FFmpeg를 확인하고, 중간에 실패하는 대신 문제를 알립니다. `PATH`의 **절대 경로** 디렉터리에서 바이너리를 찾을 수 있는지 확인하거나 명시적으로 지정하세요. 상대 경로는 거부됩니다." },
		{ kind: "code", language: "bash", lines: ["VIDEO_TOOL_FFMPEG_PATH=/absolute/path/to/ffmpeg npm run dev"] },
		{ kind: "paragraph", text: "**설정 → Local Tools**가 로컬 런타임 준비 상태를 알려주므로 먼저 확인하세요." },
		{ kind: "heading", text: "내보낸 결과가 Program Monitor와 다릅니다" },
		{ kind: "paragraph", text: "모니터는 최선을 다하는 검토 화면이고 기준은 FFmpeg 출력입니다. 프레임 단위 정확도를 보장하는 멀티트랙 마스터링은 이 빌드가 약속하는 범위가 아닙니다 — [내보내기](/docs/ko/export) 참고." },
		{ kind: "heading", text: "macOS에서 창 캡처에 아무것도 녹화되지 않습니다" },
		{ kind: "paragraph", text: "macOS는 OpenScene을 실행하는 터미널에 화면 기록 권한을 요구합니다. 시스템 설정에서 권한을 준 뒤 앱을 다시 시작하세요. 전체 화면 캡처와 레코더의 마이크·시스템 오디오 믹스는 아직 제공하지 않습니다." },
		{ kind: "heading", text: "선택기에 모델이 없습니다" },
		{ kind: "paragraph", text: "연결한 프로바이더만 모델을 보여줍니다. **설정 → Providers**에서 하나를 연결한 뒤, **설정 → Models**에서 어떤 모델을 표시할지 고르세요. 아무것도 연결하지 않았다면 로컬 Ollama 모델을 실행하면 됩니다 — [설치와 실행](/docs/ko/install) 참고." },
		{ kind: "heading", text: "에이전트가 제 영상을 보지 못합니다" },
		{ kind: "paragraph", text: "`watchProjectVideo`는 샘플링한 프레임을 이미지로 모델에 전달하므로 비전 지원 모델이 필요합니다. 텍스트 전용 로컬 모델도 타임라인 편집은 하지만 화면에 무엇이 있는지에는 답할 수 없습니다." },
		{ kind: "heading", text: "생성 프로바이더가 목록에 있는데 사용할 수 없습니다" },
		{ kind: "paragraph", text: "실제 어댑터가 없는 프로바이더는 동작하는 척하지 않고, 보이는 상태로 사용 불가라고 표시됩니다. 음성은 ElevenLabs 또는 OpenAI, 영상은 Google Veo 또는 OpenAI Sora에서 동작합니다. Sora 레퍼런스 이미지는 이 빌드에서 지원하지 않습니다." },
		{ kind: "heading", text: "에이전트가 멈춘 채 기다립니다" },
		{ kind: "paragraph", text: "멈춘 것이 아니라 승인 게이트입니다. 프로젝트에 쓰거나 작업을 시작하는 것은 먼저 물어봅니다 — [Edit Agent](/docs/ko/edit-agent) 참고." },
		{ kind: "heading", text: "그래도 해결되지 않으면" },
		{ kind: "paragraph", text: "`npm run typecheck`, `npm test`, `npm run build`로 깨끗한 빌드에서 재현한 뒤, 플랫폼·Node 버전·FFmpeg 버전을 적어 [github.com/Theorvane/openscene/issues](https://github.com/Theorvane/openscene/issues)에 이슈를 열어 주세요." },
	],
};

export const koPages: Readonly<Record<string, DocPage>> = {
	overview,
	install,
	projects,
	workspace,
	timeline,
	export: exportPage,
	"edit-agent": editAgent,
	"agent-tools": agentTools,
	providers,
	"voice-generation": voiceGeneration,
	"video-generation": videoGeneration,
	settings,
	"data-and-privacy": dataAndPrivacy,
	troubleshooting,
};
