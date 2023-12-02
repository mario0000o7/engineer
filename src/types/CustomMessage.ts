import { IMessage, QuickReplies, User } from 'react-native-gifted-chat';

export interface CustomFile {
  name: string;
  extension: string;
  mimeType: string;
  uri: string;
}

export default class CustomMessage implements IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
  file?: CustomFile;

  constructor(props: IMessage, file?: CustomFile) {
    this._id = props._id;
    this.audio = props.audio;
    this.createdAt = props.createdAt;
    this.image = props.image;
    this.pending = props.pending;
    this.quickReplies = props.quickReplies;
    this.received = props.received;
    this.sent = props.sent;
    this.system = props.system;
    this.text = props.text;
    this.user = props.user;
    this.video = props.video;
    this.file = file;
  }
}
