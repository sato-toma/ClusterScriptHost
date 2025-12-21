import { describe, it, expect } from "vitest";
import { CommentService } from "./commentService";

describe("CommentService", () => {
  describe("validate", () => {
    it("should return null for valid comment", () => {
      const result = CommentService.validate("This is a valid comment.");
      expect(result).toBeNull();
    });

    it("should return error for empty comment", () => {
      const result = CommentService.validate("   ");
      expect(result).toBe("Comment cannot be empty");
    });

    it("should return error for too long comment", () => {
      const longComment = "a".repeat(501);
      const result = CommentService.validate(longComment);
      expect(result).toContain("too long");
    });
  });

  describe("sanitize", () => {
    it("should trim whitespace", () => {
      expect(CommentService.sanitize("  hello  ")).toBe("hello");
    });
  });
});
