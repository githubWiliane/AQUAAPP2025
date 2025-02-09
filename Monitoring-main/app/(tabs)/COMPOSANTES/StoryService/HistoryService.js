// HistoryService.js

let historyRecords = [];

export const addHistoryRecord = (record) => {
  historyRecords.push(record);
};

export const getHistoryRecords = () => {
  return historyRecords;
};

export const clearHistoryRecords = () => {
  historyRecords = [];
};
