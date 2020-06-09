// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}

// get API baseURL
export const getBaseUrl = () => {
    console.log('here', process.env.NODE_ENV);
    let url = '';
    if(process.env.NODE_ENV === 'development') {
        url = 'http://localhost:4000/'
    } else if(process.env.NODE_ENV === 'production') {
        url = 'http://notificationportals/'
    }
    return url;
}