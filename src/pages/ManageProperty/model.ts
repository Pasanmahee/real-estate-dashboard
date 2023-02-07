import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import {
  getProperties,
  postProperty,
  uploadPropertyImage,
  deleteProperty,
  updateProperty
} from './service';
import type { PropertyData } from './data';

export interface ModelType {
  namespace: string;
  state: PropertyData;
  effects: {
    createProperty: Effect;
    uploadImage: Effect;
    updateProperty: Effect;
    deleteProperty: Effect;
    loadInitialData: Effect;
  };
  reducers: {
    save: Reducer<PropertyData>;
    clear: Reducer<PropertyData>;
  };
}

const initState = {
  propertyData: []
};

const Model: ModelType = {
  namespace: 'propertyManager',

  state: initState,

  effects: {
    *createProperty({ payload }, { call }) {
      const yieldCallResponse = yield call(postProperty, payload);
      if (yieldCallResponse) {
        message.success('Property added successfully');
      }
    },
    *uploadImage({payload, property_id}, { call, put }) {
      const yieldCallResponse = yield call(uploadPropertyImage, payload, property_id);
      if (yieldCallResponse) {
        message.success('Image uploaded successfully');
      }
    },
    *updateProperty({payload, property_id}, { call, put }) {
      const yieldCallResponse = yield call(updateProperty, payload, property_id);
      if (yieldCallResponse) {
        message.success('Property updated successfully');
      }
    },
    *deleteProperty({property_id}, { call, put }) {
      const yieldCallResponse = yield call(deleteProperty, property_id);
      if (yieldCallResponse) {
        message.success('Property deleted successfully');
      }
    },
    *loadInitialData(_, { call, put }) {
      const propertyResponse = yield call(getProperties);
      initState.propertyData = propertyResponse

      yield put({
        type: 'save',
        payload: initState
      });
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
