import { createContext, useEffect, useReducer, useState } from 'react';
import { Auth, firebase } from './Firebase';
import { Socket, io } from 'socket.io-client';

export interface UserProps {
  id: string;
  avatar: string | null;
  email: string | null;
  emailVerified?: boolean;
  username?: string | null;
  phoneNumber?: string | null;
}

export interface InitialStateType {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: UserProps | null | undefined;
  socket?: Socket | null;
  platform?: string;
  signup: (username: string, email: string, password: string) => Promise<firebase.auth.UserCredential>;
  signin: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  onceGetUsers: () => Promise<firebase.database.DataSnapshot>;
  CreateUser: (uid: string, username: string, email: string) => Promise<void>;
  loginWithGoogle: () => Promise<firebase.auth.UserCredential>;
  loginWithFaceBook: () => Promise<firebase.auth.UserCredential>;
  loginWithTwitter: () => Promise<firebase.auth.UserCredential>;
}

const initialState: InitialStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  socket: io('https://capitai-llm-svc-ooioetwrbq-de.a.run.app', { autoConnect: false }),
  signup: () => Promise.resolve({} as firebase.auth.UserCredential),
  signin: () => Promise.resolve({} as firebase.auth.UserCredential),
  logout: () => Promise.resolve(),
  CreateUser: () => Promise.resolve(),
  onceGetUsers: () => Promise.resolve({} as firebase.database.DataSnapshot),
  loginWithGoogle: () => Promise.resolve({} as firebase.auth.UserCredential),
  loginWithFaceBook: () => Promise.resolve({} as firebase.auth.UserCredential),
  loginWithTwitter: () => Promise.resolve({} as firebase.auth.UserCredential),
};

const reducer = (state: InitialStateType, action: { type: string, payload: { isAuthenticated: boolean, user?: UserProps | null, socket?: Socket } }) => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }
  if (action.type === 'SOCKET_STATE_CHANGED') {
    const { socket } = action.payload;
    return {
      ...state,
      socket
    };
  }

  return state;
};

const AuthContext = createContext<InitialStateType>({
  ...initialState,
  platform: 'Firebase'
});

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.socket);
  useEffect(
    () => {
      state.socket?.io.on('reconnect', () => {
        console.log('reconnect!!');
      });
      state.socket?.io.on('reconnect_attempt', async () => {
        await firebase.auth().currentUser?.getIdToken().then((token) => {
          if (state.socket) {
            state.socket.io.opts.extraHeaders = {
              Authorization: `Bearer ${token}`,
            };
          }
        });
        console.log('reconnect_attempt!!');
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          // Here you should extract the complete user profile to make it available in your entire app.
          // The auth state only provides basic information.
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                avatar: user.photoURL,
                email: user.email,
                emailVerified: user.emailVerified,
                username: user.displayName,
                phoneNumber: user.phoneNumber,
              },
            },
          });
          user.getIdToken().then((token) => {
            if (state.socket) {
              state.socket.io.opts.extraHeaders = {
                Authorization: `Bearer ${token}`,
              };
              state.socket?.connect();
            }
          });
        } else {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          state.socket?.close();
        }
      })
    },
    [dispatch],
  );

  // Login with FB

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  // Login with FB
  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  // Sign Up
  const signup = (username: string, email: string, password: string) => {
    console.log('signup', username, email, password);
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.updateProfile({
          displayName: username,
        });
        return result;
      })
  }

  // Sign In  
  const signin = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // Sign out
  const logout = () => firebase.auth().signOut();
  const CreateUser = (uid: string, username: string, email: string) =>
    firebase.database().ref(`users/${uid}`).set({
      username,
      email,
    }).then(() => {
      console.log('User created');
    }).catch((error) => {
      console.error('Error creating user:', error);
    });
  const onceGetUsers = () => {
    return firebase.database().ref('users').once('value');
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Firebase',
        signup,
        signin,
        CreateUser,
        onceGetUsers,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
