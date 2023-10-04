import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import { useSetState } from 'ahooks';
import { Empty, Form, Spin } from 'antd';
import to from 'await-to-js';
import lodash, { debounce } from 'lodash';
import React, { useEffect, useRef } from 'react';

interface ProSelectLoadMoreProps extends ProFormSelectProps {
  debounceTimeout?: number;
  defaultOptions?: { value: string; label: string }[];
  requestLoadMore?: (params: any) => Promise<any>;
  dataFilter?: (data: any[]) => any[];
  perPage?: number;
}

interface PaginationInterface {
  current: number;
  pageSize: number;
  keyword: string | undefined;
  stop: boolean;
}

const ProSelectLoadMore: React.FC<ProSelectLoadMoreProps> = (props) => {
  const {
    debounceTimeout = 800,
    params,
    requestLoadMore,
    defaultOptions = [],
    perPage = 20,
  } = props;
  const fieldNames = { label: 'label', value: 'value', ...props.fieldProps?.fieldNames };
  const initialPagination = { current: 1, pageSize: perPage, keyword: undefined, stop: false };
  const pagination = useRef<PaginationInterface>(initialPagination);
  const [state, setState] = useSetState<{
    options: any[];
    loadMore: boolean;
    keyword: string | undefined;
    fetching: boolean;
  }>({
    options: defaultOptions,
    loadMore: false,
    keyword: '',
    fetching: false,
  });
  const paramRef = useRef<any>('init');

  const getData = async (p: any): Promise<any[]> => {
    const { label, value } = fieldNames;

    if (requestLoadMore) {
      const [, res] = await to(requestLoadMore?.(p));
      if (props.dataFilter) return props.dataFilter(res?.data || []);
      return (
        res?.data?.map?.((it: any) => ({
          [value]: it.id,
          [label]: `(${it.code}) - ${it.name}`,
          item: it,
        })) || []
      );
    }
    return [];
  };

  const getDataLoadMore = async (p: PaginationInterface): Promise<any[]> => {
    return await getData({ ...p, ...params, stop: undefined });
  };

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = async (value: string | undefined) => {
      pagination.current = { ...initialPagination, keyword: value };
      setState({ fetching: true });
      const data = await getDataLoadMore(pagination.current);

      setState({
        keyword: value,
        fetching: false,
        options: lodash.unionBy(data, defaultOptions, fieldNames.value),
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [requestLoadMore, debounceTimeout, params]);

  useEffect(() => {
    if (!lodash.isEqual(paramRef.current, params) && requestLoadMore) debounceFetcher(undefined);
    paramRef.current = params;
  }, [params]);

  const onPopupScroll = async (e: any) => {
    const minus = e?.target?.scrollHeight - e?.target?.scrollTop;
    const clientHeight = e?.target?.clientHeight;
    const bottom = Math.floor(minus) === clientHeight || Math.ceil(minus) === clientHeight;

    if (bottom && !pagination.current.stop && !state.loadMore && requestLoadMore) {
      pagination.current.current += 1;
      setState({ loadMore: true });
      const data = await getDataLoadMore(pagination.current);
      setState({ loadMore: false, options: lodash.unionBy(state.options, data, fieldNames.value) });

      if (data.length < initialPagination.pageSize) pagination.current.stop = true;
    }
  };

  return (
    <Form.Item shouldUpdate noStyle>
      {(form) => (
        <ProFormSelect
          showSearch
          allowClear
          placeholder={(props.label && `Chọn ${String(props.label).toLowerCase()}`) || undefined}
          {...props}
          fieldProps={{
            getPopupContainer: (node) => node.parentNode,
            dropdownRender: (menu) => {
              if (state.fetching) return <Spin style={{ width: '100%' }} size="small" />;
              return (
                <>
                  {menu}
                  {state.loadMore && <Spin style={{ width: '100%' }} size="small" />}
                </>
              );
            },
            onSearch: (value) => {
              if (value || state.keyword) debounceFetcher(value);
            },
            onPopupScroll,
            filterOption: false,
            notFoundContent: state.fetching ? (
              <Spin style={{ width: '100%' }} size="small" />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ),
            fieldNames,
            value: (() => {
              if (props.request || props.mode === 'multiple') return undefined;
              if (
                (state.fetching && state.options.length === 0) ||
                (form.getFieldValue(props.name || '') && state.options.length === 0)
              )
                return '';
              return undefined;
            })(),
            ...props.fieldProps,
          }}
          options={state.options}
        />
      )}
    </Form.Item>
  );
};

export default ProSelectLoadMore;
