export function transformSheet(apiData) {
  const topicMap = {};

  apiData.questions.forEach((item) => {
    const topic = item.topic;
    const subTopic = item.subTopic;

    if (!topicMap[topic]) {
      topicMap[topic] = {
        id: crypto.randomUUID(),
        title: topic,
        subTopics: {}
      };
    }

    if (!topicMap[topic].subTopics[subTopic]) {
      topicMap[topic].subTopics[subTopic] = {
        id: crypto.randomUUID(),
        title: subTopic,
        questions: []
      };
    }

    topicMap[topic].subTopics[subTopic].questions.push({
      id: item.questionId._id,
      title: item.questionId.name,
      difficulty: item.questionId.difficulty,
      url: item.questionId.problemUrl
    });
  });

  return {
    id: apiData.sheet._id,
    title: apiData.sheet.name,
    topics: Object.values(topicMap).map((t) => ({
      ...t,
      subTopics: Object.values(t.subTopics)
    }))
  };
}
