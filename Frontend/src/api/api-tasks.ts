import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { IScrinTaskFull, IScrinTaskPost, IScrinTaskPut } from '../models';
import { ApiError, ApiErrorCode } from '.';

class ApiTasks {
  private static instance: ApiTasks | null = null;

  private constructor() {}

  static getInstance(): ApiTasks {
    if (ApiTasks.instance == null) {
      ApiTasks.instance = new ApiTasks();
    }

    return ApiTasks.instance;
  }

  async getAll(isCompleteFilter?: boolean): Promise<IScrinTaskFull[]> {
    const address = `http://localhost:5108/tasks`;

    const params: any = {};
    if (isCompleteFilter !== undefined && isCompleteFilter !== null) {
      params['isCompleteFilter'] = isCompleteFilter;
    }

    const config: AxiosRequestConfig = {
      method: 'get',
      params: params,
      url: address,
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      const result = await axios<IScrinTaskFull[]>(config);
      return result.data as IScrinTaskFull[];
    } catch (e) {
      if (!(e instanceof AxiosError)) {
        throw e;
      }

      const errorCode =
        e.response?.status == null ? null : Number(e.response.status);

      if (errorCode === ApiErrorCode.BadRequest) {
        throw new ApiError(ApiErrorCode.BadRequest);
      } else if (errorCode === ApiErrorCode.NotFound) {
        throw new ApiError(ApiErrorCode.NotFound);
      } else if (errorCode === ApiErrorCode.Conflict) {
        throw new ApiError(ApiErrorCode.Conflict);
      } else if (errorCode === ApiErrorCode.Unauthorized) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      } else if (errorCode === ApiErrorCode.Forbidden) {
        throw new ApiError(ApiErrorCode.Forbidden);
      } else {
        throw new ApiError(ApiErrorCode.Unexpected);
      }
    }
  }

  async getById(taskId: string): Promise<IScrinTaskFull> {
    const address = `http://localhost:5108/tasks/${taskId}`;

    const config: AxiosRequestConfig = {
      method: 'get',
      url: address,
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      const result = await axios<IScrinTaskFull>(config);
      return result.data as IScrinTaskFull;
    } catch (e) {
      if (!(e instanceof AxiosError)) {
        throw e;
      }

      const errorCode =
        e.response?.status == null ? null : Number(e.response.status);

      if (errorCode === ApiErrorCode.BadRequest) {
        throw new ApiError(ApiErrorCode.BadRequest);
      } else if (errorCode === ApiErrorCode.NotFound) {
        throw new ApiError(ApiErrorCode.NotFound);
      } else if (errorCode === ApiErrorCode.Conflict) {
        throw new ApiError(ApiErrorCode.Conflict);
      } else if (errorCode === ApiErrorCode.Unauthorized) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      } else if (errorCode === ApiErrorCode.Forbidden) {
        throw new ApiError(ApiErrorCode.Forbidden);
      } else {
        throw new ApiError(ApiErrorCode.Unexpected);
      }
    }
  }

  async delete(taskId: string) {
    const address = `http://localhost:5108/tasks/${taskId}`;

    const config: AxiosRequestConfig = {
      method: 'delete',
      url: address,
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      await axios(config);
    } catch (e) {
      if (!(e instanceof AxiosError)) {
        throw e;
      }

      const errorCode =
        e.response?.status == null ? null : Number(e.response.status);

      if (errorCode === ApiErrorCode.BadRequest) {
        throw new ApiError(ApiErrorCode.BadRequest);
      } else if (errorCode === ApiErrorCode.NotFound) {
        throw new ApiError(ApiErrorCode.NotFound);
      } else if (errorCode === ApiErrorCode.Conflict) {
        throw new ApiError(ApiErrorCode.Conflict);
      } else if (errorCode === ApiErrorCode.Unauthorized) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      } else if (errorCode === ApiErrorCode.Forbidden) {
        throw new ApiError(ApiErrorCode.Forbidden);
      } else {
        throw new ApiError(ApiErrorCode.Unexpected);
      }
    }
  }

  async update(taskId: string, description: string, isComplete: boolean) {
    const address = `http://localhost:5108/tasks/${taskId}`;

    const request: IScrinTaskPut = {
      description: description,
      isComplete: isComplete,
    };

    const config: AxiosRequestConfig = {
      method: 'put',
      url: address,
      data: request,
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      await axios(config);
    } catch (e) {
      if (!(e instanceof AxiosError)) {
        throw e;
      }

      const errorCode =
        e.response?.status == null ? null : Number(e.response.status);

      if (errorCode === ApiErrorCode.BadRequest) {
        throw new ApiError(ApiErrorCode.BadRequest);
      } else if (errorCode === ApiErrorCode.NotFound) {
        throw new ApiError(ApiErrorCode.NotFound);
      } else if (errorCode === ApiErrorCode.Conflict) {
        throw new ApiError(ApiErrorCode.Conflict);
      } else if (errorCode === ApiErrorCode.Unauthorized) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      } else if (errorCode === ApiErrorCode.Forbidden) {
        throw new ApiError(ApiErrorCode.Forbidden);
      } else {
        throw new ApiError(ApiErrorCode.Unexpected);
      }
    }
  }

  async create(description: string) {
    const address = 'http://localhost:5108/tasks';
    const request: IScrinTaskPost = { description: description };

    const config: AxiosRequestConfig = {
      method: 'post',
      url: address,
      data: request,
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      await axios(config);
    } catch (e) {
      if (!(e instanceof AxiosError)) {
        throw e;
      }

      const errorCode =
        e.response?.status == null ? null : Number(e.response.status);

      if (errorCode === ApiErrorCode.BadRequest) {
        throw new ApiError(ApiErrorCode.BadRequest);
      } else if (errorCode === ApiErrorCode.NotFound) {
        throw new ApiError(ApiErrorCode.NotFound);
      } else if (errorCode === ApiErrorCode.Conflict) {
        throw new ApiError(ApiErrorCode.Conflict);
      } else if (errorCode === ApiErrorCode.Unauthorized) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      } else if (errorCode === ApiErrorCode.Forbidden) {
        throw new ApiError(ApiErrorCode.Forbidden);
      } else {
        throw new ApiError(ApiErrorCode.Unexpected);
      }
    }
  }
}

export default ApiTasks;
