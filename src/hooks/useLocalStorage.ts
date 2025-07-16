import { useState } from 'react';

type SetValue<T> = T | ((_val: T) => T);

function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: SetValue<T>) => void] {
    // 获取localStorage中的值，如果没有则使用初始值
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // 服务端渲染时window对象不存在
            if (typeof window === 'undefined') {
                return initialValue;
            }

            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // 设置localStorage中的值
    const setValue = (value: SetValue<T>) => {
        try {
            // 允许传入函数更新值
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            // 保存到localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage; 