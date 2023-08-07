export const initialLoadingMsg = ["Загрузка", "."];
export const getLoadingMsgEffect = (isLoading, setLoadingMsg) => () => {
  let id;
  if (isLoading) {
    id = setInterval(() => {
      setLoadingMsg((msg) => {
        return msg.length < 6 ? [...msg, msg.at(-1)] : msg.slice(0, 2);
      });
    }, 300);
  }

  return () => {
    clearInterval(id);
    setLoadingMsg((msg) => msg.slice(0, 2));
  };
};
