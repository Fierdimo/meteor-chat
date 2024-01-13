export interface Selector {
  children: React.ReactElement;
}
export interface ChatType {
  id: string;
  users_ids: string[] | string;
  visible: boolean;
}

export interface ChatListType {
  _id: string;
  createdAt: Date;
  chats: ChatType[];
}
