export interface AIProvider {
  generateResponse(message: string): Promise<any>;
}