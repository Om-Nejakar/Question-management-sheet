import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2, Edit2, PlusCircle, ExternalLink } from 'lucide-react';
import useSheetStore from '../store/store';

const QuestionSheet = () => {
  const { questions, reorderQuestions, deleteQuestion, deleteTopic } = useSheetStore();
  const { addQuestion } = useSheetStore();
  const hierarchy = questions.reduce((acc, q) => {
    if (!acc[q.topic]) {
      acc[q.topic] = {};
    } 
    if (!acc[q.topic][q.subTopic]) {
      acc[q.topic][q.subTopic] = [];
    }

    acc[q.topic][q.subTopic].push(q);

    return acc;
  }, {});

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    reorderQuestions(items);
  };

  const handleAdd = (topicName, subTopicName) => {
    const title = prompt("Enter Question Title:");
    const link = prompt("Enter Problem URL:");
    
    if (title) {
      addQuestion({
        title: title,
        topic: topicName,   
        subTopic: subTopicName,
        difficulty: 'Easy',
        problemUrl: link
      });
    }
  };

  const { editQuestion } = useSheetStore();


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="main-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-8">
            {Object.entries(hierarchy).map(([topic, subTopics], topicIdx) => (
              <section key={topic} className="bg-white rounded-2xl shadow-sm border border-slate-200 ">
                <div className="bg-slate-50 p-5 rounded-t-2xl border-b flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-md flex items-center justify-center text-xs">
                      {topicIdx + 1}
                    </span>
                    {topic}
                  </h2>
                  <button onClick={() => deleteTopic(topic)} className="text-red-400 hover:text-red-600 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
                {Object.entries(subTopics).map(([subTopic, qs]) => (
                  <div key={subTopic} className="p-6 border-b last:border-b-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                        {subTopic}
                      </h3>
                      <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
                      onClick={() => handleAdd(topic, subTopic)} >
                        <PlusCircle size={14} /> Add Question
                      </button>
                    </div>
                    <div className="space-y-3">
                      {qs.map((q, index) => (
                        <Draggable key={q._id} draggableId={q._id} index={questions.findIndex(item => item._id === q._id)}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="group flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-transparent hover:border-blue-200 hover:bg-white transition shadow-none hover:shadow-md"
                            >
                              <div {...provided.dragHandleProps} className="text-slate-300">
                                <GripVertical size={20} />
                              </div>
                              
                              <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                              
                              <div className="flex-1">
                                <p className="font-medium text-slate-800">{q.title}</p>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                  q.questionId?.difficulty === 'Hard' ? 'bg-red-100 text-red-600' :
                                  q.questionId?.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                  {q.questionId?.difficulty}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href={q.questionId?.problemUrl} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-blue-600">
                                  <ExternalLink size={18} />
                                </a>
                                <button 
                                  onClick={() => {
                                    const newTitle = prompt("Edit Question Title:", q.title);
                                    if (newTitle && newTitle !== q.title) {
                                      // Call the store function
                                      editQuestion(q._id, { title: newTitle });
                                    }
                                  }}
                                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                  title="Edit title"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button onClick={() => deleteQuestion(q._id)} className="p-2 text-slate-400 hover:text-red-500">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionSheet;