export const useAnalytics = () => {
  const trackEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };

  const trackButtonClick = (buttonName) => {
    trackEvent('button_click', { button_name: buttonName });
  };

  const trackPopupOpen = (popupName) => {
    trackEvent('popup_open', { popup_name: popupName });
  };

  const trackSectionView = (sectionName) => {
    trackEvent('section_view', { section_name: sectionName });
  };

  return {
    trackEvent,
    trackButtonClick,
    trackPopupOpen,
    trackSectionView
  };
}; 