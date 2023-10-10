import { history, useAccess } from '@umijs/max';

const Access = () => {
  const access = useAccess();

  const accessible = (
    actionType: (
      | 'READ'
      | 'IMPORT'
      | 'UPDATE'
      | 'CREATE'
      | 'DELETE'
      | 'EXPORT'
      | 'BROWSE'
      | 'UPDATE_STATUS'
      | 'UPDATE_PASSWORD'
      | 'SYNC'
      | 'COPY'
      | 'APPROVE'
    )[],
  ) => {
    if (
      typeof access[`${history.location.pathname.replace(/\//g, '')}_permissions`] === 'function'
    ) {
      return access[`${history.location.pathname.replace(/\//g, '')}_permissions`](actionType);
    }
    return false;
  };

  const className = (
    actionType: (
      | 'READ'
      | 'IMPORT'
      | 'UPDATE'
      | 'CREATE'
      | 'DELETE'
      | 'EXPORT'
      | 'BROWSE'
      | 'UPDATE_STATUS'
      | 'UPDATE_PASSWORD'
      | 'SYNC'
      | 'COPY'
      | 'APPROVE'
    )[],
  ) => {
    if (
      typeof access[`${history.location.pathname.replace(/\//g, '')}_permissions`] === 'function'
    ) {
      return access[`${history.location.pathname.replace(/\//g, '')}_permissions`](actionType)
        ? ''
        : 'hidden';
    }
    return 'hidden';
  };

  const classNamePath = (
    actionType: (
      | 'READ'
      | 'IMPORT'
      | 'UPDATE'
      | 'CREATE'
      | 'DELETE'
      | 'EXPORT'
      | 'BROWSE'
      | 'UPDATE_STATUS'
      | 'UPDATE_PASSWORD'
      | 'SYNC'
      | 'COPY'
      | 'APPROVE'
    )[],
    pathname: string,
  ) => {
    if (typeof access[`${pathname.replace(/\//g, '')}_permissions`] === 'function') {
      return access[`${pathname.replace(/\//g, '')}_permissions`](actionType) ? '' : 'hidden';
    }
    return 'hidden';
  };

  return {
    accessible,
    className,
    classNamePath,
  };
};

export default Access;
