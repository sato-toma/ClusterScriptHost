export class CommentService {
  /**
   * コメントの内容を検証します。
   * @returns エラーメッセージ。問題なければ null
   */
  static validate(content: string): string | null {
    if (!content || content.trim().length === 0) {
      return "Comment cannot be empty";
    }
    if (content.length > 500) {
      return "Comment is too long (max 500 characters)";
    }
    return null;
  }

  static sanitize(content: string): string {
    return content.trim();
  }
}
