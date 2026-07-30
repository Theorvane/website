import { ImageResponse } from "next/og";

export const alt = "OpenVideo — the local-first video editor that edits with you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "72px 80px",
					background: "radial-gradient(circle at 82% 0%, #202943 0%, #090b10 55%)",
					color: "#f4f7fb",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800, letterSpacing: "0.08em" }}>
					<div style={{ width: 40, height: 40, borderRadius: 10, background: "#78f7bc" }} />
					<div style={{ display: "flex" }}>
						OPEN<span style={{ color: "#78f7bc" }}>VIDEO</span>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
					<div style={{ display: "flex", fontSize: 28, letterSpacing: "0.11em", color: "#78f7bc", textTransform: "uppercase" }}>
						Open source · MIT · Local-first
					</div>
					<div style={{ display: "flex", flexDirection: "column", fontSize: 82, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.02 }}>
						<div style={{ display: "flex" }}>The video editor</div>
						<div style={{ display: "flex", color: "#a690ff" }}>that edits with you.</div>
					</div>
					<div style={{ display: "flex", fontSize: 30, lineHeight: 1.45, color: "#a5afc0", maxWidth: 900 }}>
						A desktop editor with an agent at the controls. Your media stays on your machine.
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a5afc0", letterSpacing: "0.06em" }}>
					<div style={{ display: "flex" }}>open-video.app</div>
					<div style={{ display: "flex" }}>Theorvane</div>
				</div>
			</div>
		),
		size,
	);
}
