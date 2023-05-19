import { useEffect, useState } from 'react';

const useGetTheme = () => {
  const [hasLightClass, setHasLightClass] = useState(false);

  useEffect(() => {
    const handleLightClassCheck = () => {
      const htmlElement = document.querySelector('html');
      if (htmlElement && htmlElement.classList.contains('light')) {
        setHasLightClass(true);
      } else {
        setHasLightClass(false);
      }
    };

    handleLightClassCheck();

    // Обработчик события будет вызываться при изменении классов у элемента <html>
    document.addEventListener('DOMSubtreeModified', handleLightClassCheck);

    return () => {
      // Очистка обработчика события при размонтировании компонента
      document.removeEventListener('DOMSubtreeModified', handleLightClassCheck);
    };
  }, []);

  return hasLightClass;
};

export default useGetTheme;
