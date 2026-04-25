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

  /**
   * 親子関係の作成が可能かを検証します。
   * @param parentId 親タスクID
   * @param childId 子タスクID
   * @returns エラーメッセージ。問題なければ null
   */
  static validateParentChildRelationship(
    parentId: string,
    childId: string,
  ): string | null {
    if (parentId === childId) {
      return "A task cannot be its own parent";
    }
    return null;
  }

  /**
   * 関連付けが可能かを検証します。
   * @param todoId タスクID
   * @param relatedId 関連付けるタスクID
   * @returns エラーメッセージ。問題なければ null
   */
  static validateRelatedTask(todoId: string, relatedId: string): string | null {
    if (todoId === relatedId) {
      return "A task cannot be related to itself";
    }
    return null;
  }
}
