const loggerMiddleware = store => next => action => {
    console.log(action && action.type); // Grouping log by action type
    console.log('Previous state', store.getState());
    console.log('Action', action);
    next(action);
    console.log('Next state', store.getState());
    console.groupEnd();
};

export default loggerMiddleware;