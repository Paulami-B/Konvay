import { ZegoUIKitPrebuilt, ZegoCloudRoomConfig } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len: number): string {
	let result = "";
	const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
	for (let i = 0; i < len; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

export function getUrlParams(url: string = window.location.href): URLSearchParams {
	const urlStr = url.split("?")[1];
	return new URLSearchParams(urlStr);
}

const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

// 🔒 Global flag to prevent repeated room joins
let hasJoinedRoom = false;

export function initZegoMeeting(container: HTMLDivElement): void {
	if (hasJoinedRoom) return;
	hasJoinedRoom = true;

	const roomID = getUrlParams().get("roomID") || randomID(5);
	const userID = randomID(5);
	const userName = `User_${userID}`;

	const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
		appID,
		serverSecret,
		roomID,
		userID,
		userName
	);

	const zp = ZegoUIKitPrebuilt.create(kitToken);

	zp.joinRoom({
		container,
		sharedLinks: [
			{
				name: "Personal link",
				url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
			},
		],
		scenario: {
			mode: ZegoUIKitPrebuilt.GroupCall,
		},
	} as ZegoCloudRoomConfig);
}