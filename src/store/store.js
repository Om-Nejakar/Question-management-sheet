import { create } from 'zustand';

const useSheetStore = create((set) => ({
  questions: [],
  sheetInfo: {},

  initialize: (initialData) => set({ 
    questions: initialData.data.questions,
    sheetInfo: initialData.data.sheet 
  }),

  // CRUD operations
  addQuestion: (newQ) => set((state) => ({ 
    questions: [
      { 
        ...newQ, 
        _id: Date.now().toString(),
        questionId: {
          difficulty: newQ.difficulty || 'Easy',
          problemUrl: newQ.problemUrl || ''
        }
      }, 
      ...state.questions 
    ] 
  })),

  editQuestion: (id, updatedFields) => set((state) => ({
    questions: state.questions.map(q => q._id === id ? { ...q, ...updatedFields } : q)
  })),

  deleteQuestion: (id) => set((state) => ({
    questions: state.questions.filter(q => q._id !== id)
  })),

  reorderQuestions: (newOrder) => set({ questions: newOrder }),

  deleteTopic: (topicName) => set((state) => ({
    questions: state.questions.filter(q => q.topic !== topicName)
  })),
  editQuestion: (id, updatedFields) => set((state) => ({
  questions: state.questions.map(q => q._id === id ? { ...q, ...updatedFields } : q)
}))
}));

export default useSheetStore;