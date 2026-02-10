import { useState } from "react";
import { useSheetStore } from "../store/sheetStore";
import Question from "./Question";

export default function SubTopic({ topicId, subTopic }) {
  const [q, setQ] = useState("");
  const { addQuestion, deleteSubTopic, deleteQuestion } = useSheetStore();

  return (
    <div className="border border-gray-700 rounded p-3 bg-zinc-800">
      <div className="flex justify-between mb-2">
        <span>{subTopic.title}</span>
        <button
          onClick={() => deleteSubTopic(topicId, subTopic.id)}
          className="text-red-400 text-sm"
        >
          Delete
        </button>
      </div>

      <div className="flex gap-2 mb-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="New question"
          className="bg-zinc-900 border border-gray-700 px-2 py-1 rounded"
        />
        <button
          onClick={() => {
            if (!q.trim()) return;
            addQuestion(topicId, subTopic.id, q);
            setQ("");
          }}
          className="bg-blue-600 px-3 rounded"
        >
          Add
        </button>
      </div>

      {subTopic.questions.map((q) => (
        <Question
          key={q.id}
          question={q}
          onDelete={() =>
            deleteQuestion(topicId, subTopic.id, q.id)
          }
        />
      ))}
    </div>
  );
}
