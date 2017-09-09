const routerUtils = {
  isSameParamsAsPrev: props => {
    if (
      !props ||
      !props.history ||
      !props.history.location ||
      !props.history.location.state ||
      !props.history.location.state.prevParams ||
      !props.match ||
      !props.match.params ||
      props.history.action === 'POP' // Browser refresh
    ) {
      return false;
    }
    const { params } = props.match;
    const { prevParams } = props.history.location.state;
    if (Object.keys(params).length !== Object.keys(prevParams).length) {
      return false;
    }
    let same = true;
    Object.keys(params).forEach(key => {
      if (params[key] !== prevParams[key]) {
        same = false;
      }
    });
    return same;
  },
};

export default routerUtils;
