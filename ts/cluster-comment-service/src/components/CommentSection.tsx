import { Comment } from "@prisma/client";
import { create, update, remove } from "../app/actions";

type Props = {
  comments: Comment[];
};

export default function CommentSection({ comments }: Props) {
  return (
    <div className="p-4 border-t mt-8">
      <h2 className="text-xl font-bold mb-4">Database Connection Test</h2>

      <form action={create} className="mb-8 flex gap-2">
        <input
          type="text"
          name="comment"
          placeholder="Write a comment..."
          className="border p-2 rounded text-black"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

      <ul className="space-y-2">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="border p-4 rounded shadow-sm bg-white text-black"
          >
            <form action={update} className="flex gap-2 items-center">
              <input type="hidden" name="id" value={comment.id} />
              <input
                type="text"
                name="content"
                defaultValue={comment.content}
                className="border p-2 rounded flex-grow"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Update
              </button>
              <button
                formAction={remove}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </form>
            <div className="text-xs text-gray-500 mt-1 ml-1">
              {comment.createdAt.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
