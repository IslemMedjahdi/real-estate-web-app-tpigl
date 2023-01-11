class MessageService {
  private static instance: MessageService;

  public static getInstance(): MessageService {
    if (!this.instance) {
      this.instance = new MessageService();
    }
    return this.instance;
  }
}

export default MessageService;
