export const convertCamelCaseToSnakeCase = (handlerName: string): string => {
  // 將大寫字母轉換為底線加小寫字母，例如：PaHomeBugsHandler -> pa_home_bugs_handler
  const snakeCase = handlerName.replace(/([A-Z])/g, '_$1').toLowerCase();

  // 移除開頭的底線（如果有）並移除結尾的 "handler"
  const result = snakeCase.replace(/^_/, '').replace(/_handler$/, '');

  return result;
};
