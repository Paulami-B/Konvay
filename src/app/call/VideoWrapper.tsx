"use client";

import { useEffect, useRef } from "react";
import { initZegoMeeting } from "./callUIKit";
import { useAuthStore } from "@/utils/store/authStore";

export default function VideoWrapper() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { currentUser } = useAuthStore();
	useEffect(() => {
		if (containerRef.current) {
			initZegoMeeting({ container: containerRef.current, user: currentUser! });
		}
	}, []);

	return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}