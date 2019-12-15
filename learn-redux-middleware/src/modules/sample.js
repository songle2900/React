import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
// import createRequestThunk from '../lib/createRequestThunk';
import { startLoading, finishLoading } from './loading';

// declare action type
// 3 reducers for 1 request
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
// saga
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
// saga
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// creating thunk
// different action will be dispatch when start, success or failure
// export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// saga version
export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action) {
    yield put(startLoading(GET_POST)); // start loading
    try {
        const post = yield call(api.getPost, action.payload); // apit.getPost(action.payload)
        yield put({
            type: GET_POST_SUCCESS,
            payload: post.data
        });
    } catch (e) {
        yield put({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_POST)); // loading complete
}

function* getUsersSaga() {
    yield put(startLoading(GET_USERS));
    try {
        const users = yield call(api.getUsers);
        yield put({
            type: GET_USERS_SUCCESS,
            payload: users.data
        });
    } catch (e) {
        yield put({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_USERS));
}

export function* sampleSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
}

// declare initial stae
// loading object will manage when request is loading state
const initialState = {
    post: null,
    users: null
};

const sample = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        })
    }, initialState
);

export default sample;