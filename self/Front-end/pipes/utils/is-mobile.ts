export const isMobile = (): boolean => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  }
  return false;
}