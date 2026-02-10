export default function Question({ question, onDelete }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span>{question.title}</span>
      <button onClick={onDelete} className="text-red-400">
        Delete
      </button>
    </div>
  );
}
