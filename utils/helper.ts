export function calculateTimeRemaining(targetTime: any) {
  const currentTime: any = new Date();
  const timeDifference = targetTime - currentTime;

  if (timeDifference > 0) {
    const minutes = Math.floor(timeDifference / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);
    return { minutes, seconds };
  } else {
    return { minutes: 0, seconds: 0 };
  }
}