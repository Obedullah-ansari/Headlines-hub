import { createStore } from "redux";

// Define the state interface
interface State {
  update: boolean;
  review : boolean;
  auth: string | null;
  user: string | null;
}

// Define action types with payload using a union
interface UpdateProfileAction {
  type: "updateprofilephoto";
}
interface reviewupdate {
  type: "review";
}

interface AuthAction {
  type: "auth";
  payload: string | null;
}

interface UserAction {
  type: "user";
  payload: string | null;
}

interface LogoutAction {
  type: "logout";
}

type Action = UpdateProfileAction | AuthAction | UserAction | LogoutAction |reviewupdate;

// Initial state
const initialState: State = {
  update: false,
  auth: null,
  user: null,
  review :false
};

// Reducer function
const updateReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "updateprofilephoto":
      return { ...state, update: !state.update };

       case "review":
        return { ...state, update: !state.update };

    case "auth":
      return { ...state, auth: action.payload };

    case "user":
      return { ...state, user: action.payload };

    case "logout":
      return { ...state, auth: null, user: null , };

    default:
      return state;
  }
};

// Create the store
const store = createStore(updateReducer);

// Define RootState using the reducer
export type RootState = ReturnType<typeof updateReducer>;

export default store;
