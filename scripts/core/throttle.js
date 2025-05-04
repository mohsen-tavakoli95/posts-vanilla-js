export async function throttlePromises(limit, tasks) {
  const results = [];
  const running = [];

  for (const task of tasks) {
    const promise = task();
    results.push(promise);

    const runningTask = promise.finally(() => {
      running.splice(running.indexOf(runningTask), 1);
    });

    running.push(runningTask);
    if (running.length >= limit) {
      await Promise.race(running);
    }
  }

  return Promise.allSettled(results);
}
