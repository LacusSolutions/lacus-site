import { type ReactNode, useEffect, useState } from 'react';

import { type ToastActionElement, type ToastProps } from '~/components/ui';

type ToasterToast = {
  action?: ToastActionElement;
  description?: ReactNode;
  id: string;
  title?: ReactNode;
} & ToastProps;

type Action =
  | {
      toast: Partial<ToasterToast>;
      type: 'UPDATE_TOAST';
    }
  | {
      toast: ToasterToast;
      type: 'ADD_TOAST';
    }
  | {
      toastId?: ToasterToast['id'];
      type: 'DISMISS_TOAST';
    }
  | {
      toastId?: ToasterToast['id'];
      type: 'REMOVE_TOAST';
    };

interface State {
  toasts: ToasterToast[];
}

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
let count = 0;

function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;

  return count.toString();
}

function addToRemoveQueue(toastId: string): void {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }

    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };
  }
}

const listeners: ((state: State) => void)[] = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action): void {
  memoryState = reducer(memoryState, action);

  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

export function toast({ ...props }: Toast): {
  dismiss: () => void;
  id: string;
  update: (props: ToasterToast) => void;
} {
  const id = genId();

  function update(props: ToasterToast): void {
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  }

  function dismiss(): void {
    dispatch({ type: 'DISMISS_TOAST', toastId: id });
  }

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange(open) {
        if (!open) {
          dismiss();
        }
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

export function useToast(): {
  dismiss: (toastId?: string) => void;
  toast: typeof toast;
} & State {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return (): void => {
      const index = listeners.indexOf(setState);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss(toastId?: string): void {
      dispatch({
        type: 'DISMISS_TOAST',
        toastId,
      });
    },
  };
}
