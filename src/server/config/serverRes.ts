export const SERVER_ERROR = {
    UNAUTHORIZED: { MESSAGE: 'Username or password incorrect', CODE: 401},
    // FORBIDDEN: { MESSAGE: 'Forbidden', CODE: 403},
    NOT_FOUND: { MESSAGE: 'Not found', CODE: 404},
    INTERNAL: { MESSAGE: 'Internal server error', CODE: 500}
};

export const SERVER_SUCCESS = {
    OK: { MESSAGE: 'OK Successful', CODE: 200 },
    POST_OK: { MESSAGE: 'Post Successful', CODE: 201 },
    DELETE_OK: { MESSAGE: 'Delete Successful', CODE: 201 },
    UPDATE_OK: { MESSAGE: 'Update Successful', CODE: 201 }
}

export const PRISMA_ERROR = {
    UNIQUE_CONSTRAINT_VIOLATION: { 
        SERVER_MESSAGE: 'There is a unique constraint violation, a new user cannot be created with this email or username',
        CLIENT_MESSAGE_REGISTER: 'Username or email associated with existing account',
        CLIENT_MESSAGE_PROFILE: 'User already has a profile',
        CODE: 'P2002'
    }
}