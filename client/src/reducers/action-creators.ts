import { Action } from 'redux';

interface IActionCreatorBase {
  type: string;
}

interface ISimpleActionCreator extends IActionCreatorBase {
  (): Action;
}

interface IActionCreatorAction<TPayload> extends Action {
  payload: TPayload;
}

interface IActionCreator<TPayload> extends IActionCreatorBase {
  (payload: TPayload): IActionCreatorAction<TPayload>;
  unwrap(action: Action): TPayload;
}

export function createSimpleActionCreator(type: string): ISimpleActionCreator {
  const actionCreator = () => {
      return {
          type: type
      };
  };

  const typedActionCreator = <ISimpleActionCreator>actionCreator;

  typedActionCreator.type = type;

  return typedActionCreator;
}

/**
 * Creates a action creator for general purpose actions.
 *
 * @param type The unique ID of the actions to be created.
 */
export function createActionCreator<TPayload>(type: string): IActionCreator<TPayload> {
  const actionCreator = (payload: TPayload) => {
      return {
          type: type,
          payload: payload
      };
  };

  const typedActionCreator = <IActionCreator<TPayload>>actionCreator;

  typedActionCreator.type = type;
  typedActionCreator.unwrap = (action: Action) => {
      return (<IActionCreatorAction<TPayload>>action).payload;
  };

  return typedActionCreator;
}