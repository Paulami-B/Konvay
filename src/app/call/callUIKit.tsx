import { randomID } from "@/utils/functions/randomId";
import { AuthStateType } from "@/utils/store/authStore";
import { ZegoUIKitPrebuilt, ZegoCloudRoomConfig } from "@zegocloud/zego-uikit-prebuilt";

export function getUrlParams(url: string = window.location.href): URLSearchParams {
	const urlStr = url.split("?")[1];
	return new URLSearchParams(urlStr);
}

// Global flag to prevent repeated room joins
let hasJoinedRoom = false;

type MeetingProps = {
	container?: HTMLDivElement; 
	user: AuthStateType;
}

let zpInstance: any | null = null;

export async function initZegoMeeting({ container, user }: MeetingProps): Promise<void> {
	if (hasJoinedRoom){
		return;
	}
	hasJoinedRoom = true;

	const roomID = getUrlParams().get("roomID") || randomID(5);
	const type = getUrlParams().get("type");
	const isGroup = getUrlParams().get("group")
	const res = await fetch(`/api/zegocloud?userID=${user?._id}`);

	const { token, appID } = await res.json();

	const username = user?.name;

	const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID, user?._id!, username);

	const zp = ZegoUIKitPrebuilt.create(kitToken);
	zpInstance = zp;
	zp.joinRoom({
		container,
		sharedLinks: [
			{
				name: "Personal link",
				url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
			},
		],
		scenario: {
			mode: isGroup ? ZegoUIKitPrebuilt.GroupCall : ZegoUIKitPrebuilt.OneONoneCall,
		},
		showVideoCall: type === "video",
		turnOnCameraWhenJoining: type === "video",
	} as ZegoCloudRoomConfig);
}