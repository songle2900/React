import { createContext, useContext } from 'react';

// client env: null
// server env: { done: false, promises: [] }
const PreloadContext = createContext(null);
export default PreloadContext;

// resolve is function type
export const Preloader = ({ resolve }) => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null; // return null if context value is not validate
    if (preloadContext.done) return null; // return null if preloadContext is done

    preloadContext.promises.push(Promise.resolve(resolve()));
    return null;
}