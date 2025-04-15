import { create } from "zustand";
import { Id } from "../../../convex/_generated/dataModel";

export type Conversation = {
	_creationTime: number;
	_id: Id<"conversations">;
	email?: string;
	image?: string;
	admin?: string;
	groupImage?: string;
	groupName?: string;
	isGroup: boolean;
	isOnline?: boolean;
	lastMessage?: {
		_creationTime: number;
		_id: Id<"messages">;
		content: string;
		conversationId: Id<"conversations">;
		messageType: "image" | "text" | "video";
		sender: string;
	};
	name?: string;
	participants: string[];
	uid?: string;
};

type ConversationState = {
	selectedConversation: Conversation | null;
	setSelectedConversation: (conversation: Conversation | null) => void;
};

export const useConversationStore = create<ConversationState>((set) => ({
	selectedConversation: null,
	setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
}));

export interface IMessage {
	_id: Id<"messages">;
	content: string;
	_creationTime: number;
	messageType: "text" | "image" | "video";
	conversationId: Id<"conversations">
	sender: {
		_id: Id<"users">;
		uid: string;
		image: string;
		name: string;
		email: string;
		_creationTime: number;
		isOnline: boolean;
	} | null;
}