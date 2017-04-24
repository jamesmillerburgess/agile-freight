export const search = (state = { text: 'SEARCH' }, action) => {
  switch (action.type) {
    case 'APP_SEARCH':
      return { text: action.text };
    default:
      return state;
  }
};

export const packageLines = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PACKAGE_LINE':
      return [
        ...state,
        { num: action.num || 0, packageType: action.packageType || 'Packages' },
      ];
    case 'REMOVE_PACKAGE_LINE':
      return state.filter((packageLine, index) => index === (action.index || 0));
    case 'EDIT_PACKAGE_LINE':
      return state.map((packageLine, index) => {
        if (index !== action.index) {
          return packageLine;
        }
        return action.packageLine || { num: 0, packageType: 'Packages' };
      });
    default:
      return state;
  }
};

export const focusObject = (state = { id: '', objectType: '' }, action) => {
  switch (action.type) {
    case 'CHANGE_FOCUS_OBJECT':
      return {
        id: action.id,
        objectType: action.objectType,
      };
    default:
      return state;
  }
};
