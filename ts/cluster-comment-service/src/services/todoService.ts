export class TodoService {
  /**
   * Todoの内容を検証します。
   * @returns エラーメッセージ。問題なければ null
   */
  static validate(content: string): string | null {
    if (!content || content.trim().length === 0) {
      return "Todo content cannot be empty";
    }
    if (content.length > 200) {
      return "Todo content is too long (max 200 characters)";
    }
    return null;
  }

  static sanitize(content: string): string {
    return content.trim();
  }
}
