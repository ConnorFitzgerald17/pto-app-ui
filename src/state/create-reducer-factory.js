export const reducerFactory =
  (actionMap, defaults) =>
  (state = defaults, action) => {
    const doAction = actionMap[action.type];
    return doAction ? doAction({ state, action }) : state;
  };
