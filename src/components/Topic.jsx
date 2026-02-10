import { useState } from "react";
import QuestionRow from "./QuestionSheet";

export default function Topic({ topic }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full mb-4">
      <div
        onClick={() => setOpen(!open)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded cursor-pointer"
      >
        <div className="h-1 bg-orange-500 rounded-t" />
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">
              {topic.title}
            </span>
            <span className="text-sm text-zinc-400">
              {topic.subTopics.reduce(
                (acc, st) => acc + st.questions.length,
                0
              )}{" "}
              questions
            </span>
          </div>
        </div>
      </div>
      
      {open && (
        <div className="space-y-2">
          {topic.subTopics.map((sub) =>
            sub.questions.map((q) => (
              <QuestionRow
                key={q.id}
                question={q}
                subTopic={sub.title}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
