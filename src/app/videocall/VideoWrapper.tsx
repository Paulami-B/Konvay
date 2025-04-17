"use client";

import { useEffect, useRef } from "react";
import { initZegoMeeting } from "./videoUIKit"; // .ts file

export default function VideoWrapper() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			initZegoMeeting(containerRef.current);
		}
	}, []);

	return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}