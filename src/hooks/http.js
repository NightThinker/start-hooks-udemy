import { useReducer, useCallback } from 'react';

const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return { loading: true, error: null, data: null, extra: null, identifier: action.identifier };
		case 'RESPONSE':
			return { ...curHttpState, loading: false, data: action.resData, extra: action.extra };
		case 'ERROR':
			return { loading: false, error: action.errorMessage };
		case 'CLEAR':
			return { ...curHttpState, error: null };

		default:
			throw Error('Should not be reached!');
	}
};

const useHttp = () => {
	const [ httpState, dispatchHttp ] = useReducer(httpReducer, {
		loading: false,
		error: null,
		data: null,
		extra: null,
		identifier: null
	});

	const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifer) => {
		// console.log('url', url);
		dispatchHttp({ type: 'SEND', identifier: reqIdentifer });
		fetch(url, {
			method: method,
			body: body,
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				return res.json();
			})
			.then(resData => {
				dispatchHttp({ type: 'RESPONSE', resData: resData, extra: reqExtra });
			})
			.catch(err => {
				dispatchHttp({ type: 'ERROR', errorMessage: 'Somethine went wrong!' });
			});
	}, []);

	return {
		isLoading: httpState.loading,
		data: httpState.data,
		error: httpState.error,
		sendRequest: sendRequest,
		reqExtra: httpState.extra,
		reqIdentifer: httpState.identifier
	};
};

export default useHttp;
