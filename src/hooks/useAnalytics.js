export const useAnalytics = () => {
  const trackEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
      const enhancedParams = {
        ...eventParams,
        timestamp: new Date().toISOString(),
        page_location: window.location.href,
        page_title: document.title
      };
      window.gtag('event', eventName, enhancedParams);
    }
  };

  const trackButtonClick = (buttonName) => {
    trackEvent('button_click', {
      button_name: buttonName,
      event_category: 'engagement',
      event_label: buttonName,
      value: 1
    });
  };

  const trackPopupOpen = (popupName) => {
    trackEvent('popup_open', {
      popup_name: popupName,
      event_category: 'engagement',
      event_label: popupName,
      value: 1
    });
  };

  const trackSectionView = (sectionName) => {
    trackEvent('section_view', {
      section_name: sectionName,
      event_category: 'content',
      event_label: sectionName,
      value: 1
    });
  };

  const trackScroll = (scrollDepth) => {
    trackEvent('scroll_depth', {
      depth: scrollDepth,
      event_category: 'engagement',
      event_label: `Scrolled ${scrollDepth}%`,
      value: scrollDepth
    });
  };

  const trackLinkClick = (linkUrl, linkText) => {
    trackEvent('link_click', {
      link_url: linkUrl,
      link_text: linkText,
      event_category: 'engagement',
      event_label: linkText,
      value: 1
    });
  };

  const trackTimeOnPage = () => {
    const startTime = new Date();
    
    const recordTimeSpent = () => {
      const endTime = new Date();
      const timeSpent = Math.round((endTime - startTime) / 1000); // in seconds
      
      trackEvent('time_on_page', {
        time_seconds: timeSpent,
        event_category: 'engagement',
        event_label: 'Time spent on page',
        value: timeSpent
      });
    };

    // Record time when user leaves the page
    window.addEventListener('beforeunload', recordTimeSpent);
    
    // Clean up
    return () => window.removeEventListener('beforeunload', recordTimeSpent);
  };

  return {
    trackEvent,
    trackButtonClick,
    trackPopupOpen,
    trackSectionView,
    trackScroll,
    trackLinkClick,
    trackTimeOnPage
  };
}; 