export interface TextMessagePayload {
  number: string
  text: string
  linkPreview: boolean
}

export interface IMessageAPI {
  sendTextMessage(payload: TextMessagePayload): Promise<void>
}
